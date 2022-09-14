<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">发布文章</p>
        </div>
        <el-card class="cardTop" style="margin-top:20px;">
            <p class="cardTitle">填写文章内容<i class="el-icon-question" style="color:#409EFF;margin-left:15px;"
                    @click="tw"></i></p>
            <div class="cardBox">
                <el-form label-width="60" style="width:96%;" label-position="right">
                    <el-form-item label="文章分类" style="display:flex;">
                        <el-select v-model="form.cat" filterable placeholder="请选择文章分类" style="width:300px;">
                            <el-option v-for="item in ['公告', '分享', '健康百科']" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文章标题" style="display:flex;">
                        <el-input v-model="form.title" autocomplete="off" placeholder="请输入文章标题，20字之内" size="20"
                            style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="文章作者" style="display:flex;">
                        <el-input v-model="form.author" autocomplete="off" placeholder="请输入文章发布者或作者" size="20"
                            style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="文章内容" style="display:flex;">
                        <quill-editor ref="myGQuillEditor" v-model="form.content" :options="editorOption" class="editor"
                            style="height:300px;">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="上传封面图" style="display:flex;" class="upimg">
                        <el-upload :file-list="fileList" style="margin-left:16px;" class="centerImg" :action="' '"
                            list-type="picture-card" :auto-upload="false" :limit="1" :on-change="complete"
                            ref="uploadicon">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item style="margin-top:100px;display: flex;padding-left: 100px;;">
                        <el-button type="primary" @click="updateimg">立即提交</el-button>
                        <el-button @click="cli">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <div style="height:60px;"></div>
    </div>
</template>


<script>
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
]
export default {
    name: 'GlobalQuillEditor',
    data() {
        return {
            id: '',
            content: {},
            source: '管理员',
            editorOption: {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
                placeholder: '请输入正文'
            },
            cat: '',
            form: {
                cat: '',
                author: '',
                title: '',
                content: '',
            },
            img: '',
            imgUrl: '',
            fileList: []

        }
    },
    methods: {
        //返回
        back() {
            this.$router.go(-1);
        },
        // 图片上传
        complete(file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            const isLt2M = file.raw.size / 1024 / 1024 < 5
            this.hideUploadIcon = fileList.length >= 1;
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB!')
                return false
            } else if (isLt2M && (isPNG || isJPG)) {
                this.img = file.raw;//图片的url
                let arr = {
                    name: 'def',
                    url: file.url
                }
                this.fileList = [arr];
            }
        },
        //提交修改
        updateimg() {
            if (this.form.title === '' || this.form.author == '' || this.form.content == '' || this.form.cat == '') return this.$message.error('请填写完整信息');
            const loading = this.$loading({
                lock: true,
                text: '发布中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let config = {
                "Content-Type": "multipart/form-data"
            }
            let data = new FormData();
            data.append('imgUrl', this.img);
            data.append('title', this.form.title);
            data.append('author', this.form.author);
            data.append('content', this.form.content);
            data.append('cat', this.form.cat);
            this.$http.post('admin/articlePut', data, config).then(res => {
                if (res.data.code == 200) {
                    loading.close();
                    this.$message.success('发布成功');
                } else {
                    loading.close();
                    this.$message.error(res.data.msg);
                }
            })
        },
        // 重置
        cli() {
            this.form.cat = ''
            this.form.author = ''
            this.form.title = ''
            this.form.content = ''
            this.fileList = []
        },
        //弹出说明
        tw() {
            this.$alert('文章内容支持HTML，可以在线编写直接粘贴，<a href="https://www.jsrun.net/new" target="_Blank">点击进入</a>', '提示', {
                dangerouslyUseHTMLString: true
            });
        }
    },
    created() {

    },


}
</script>

<style lang="less" scoped>
/deep/ .el-upload-list__item.is-ready {
    display: none;
}

.upimg {
    position: absolute;
    left: 480px;
    top: 70px;
}

.main {
    width: 100%;
    height: 100%;
    line-height: auto;

    .head {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;

        .tag {
            height: 8px;
            width: 25px;
            border-radius: 4px;
            background-color: #1a7cff;
        }

        .tagTitle {
            font-size: 23px;
            color: #000;
            margin-left: 20px;
        }

    }


    .el-card {
        position: relative;
        box-shadow: 0px 0px 20px rgba(215, 215, 215, 1);
        overflow: auto;
        padding: 0;

        /deep/.el-card__body {
            padding: 0;
        }

        .cardTitle {
            display: block;
            color: #1a7cff;
            background: #f2f2f2;
            width: 100%;
            height: 55px;
            line-height: 55px;
            padding-left: 20px;
            text-align: left;
            box-sizing: border-box;
            margin: 0;
        }

        .cardBox {
            display: flex;
            justify-content: flex-start;
            padding: 15px 20px;
            flex-wrap: wrap;

            .cardBoxOne {
                min-width: 170px;

            }

            .countBox {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 55px;
                font-size: 14px;
                min-width: 200px;
                width: 60%;
                margin: 0 auto;

                .cardBoxOneTitle {
                    color: rgb(170, 170, 170);
                    margin-right: 15px;
                }

                .cardBoxOneContent {
                    color: #000;
                }
            }

            /deep/.avatar {
                width: 65px !important;
                height: 65px !important;
                border: 1px solid #ccc;
                border-radius: 100%;
                margin: 22px 0 0 15px;
            }

            .countG {
                margin-top: 30px;
            }
        }
    }
}

.contentBox {
    width: 475px;
    max-height: 800px;
    overflow: auto;
    box-shadow: 0px 0px 20px #d7d7d7;
    margin: 10px auto;
    border-radius: 5px;

    .el-image {
        width: 475px;
        height: 200px;
        z-index: 10;
        position: relative;
    }

    .title {
        display: block;
        width: 455px;
        padding: 10px;
        padding-top: 12px;
        text-align: center;
        font-weight: bold;
        border-radius: 15px 15px 0 0;
        position: relative;
        top: -39px;
        background: #fff;
        color: #000;
        font-size: 16px;
        z-index: 100;
    }

    .time {
        color: rgb(121, 121, 121);
        font-size: 14px;
        margin: 10px auto;
        display: block;
        width: 100%;
        text-align: center;
        margin-top: -49px;
    }

    .cont {
        width: 95%;
        margin: 0 auto;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 20px;
        text-align: left;
    }
}
</style>