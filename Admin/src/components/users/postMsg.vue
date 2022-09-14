<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">发送消息</p>
            <el-button type="primary" @click="back" plain style="position:absolute;right:20px;">返回</el-button>
        </div>
        <el-card class="cardTop" style="margin-top:20px;">
            <p class="cardTitle">填写消息内容</p>
            <div class="cardBox">

                <el-form label-width="60" style="width:96%;" label-position="right">
                    <el-form-item label="选择用户" style="display:flex;">
                        <el-select v-model="userLo" filterable placeholder="请选择用户" style="width:300px;">
                            <el-option v-for="item in userList" :key="item.name" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息标题" style="display:flex;">
                        <el-input v-model="title" autocomplete="off" placeholder="请输入消息标题，20字之内" size="20"
                            style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="消息来源" style="display:flex;">
                        <el-input v-model="source" autocomplete="off" placeholder="请输入消息发布者" size="20"
                            style="width:300px"></el-input>
                    </el-form-item>
                    <el-form-item label="消息类型" style="display:flex;">
                        <el-select v-model="type" placeholder="请选择类型" style="width:300px">
                            <el-option v-for="item in ['预约成功', '退款处理', '公告', '新消息']" :key="item" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消息内容" style="display:flex;">
                        <quill-editor ref="myGQuillEditor" v-model="content" :options="editorOption" class="editor"
                            style="height:300px;">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item style="margin-top:100px;display: flex;padding-left: 100px;;">
                        <el-button type="primary" @click="post">立即发送</el-button>
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
            userList: [],
            userLo: '',
            id: '',
            name: '',
            type: '',
            content: '',
            title: '',
            source: '管理员',
            editorOption: {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow',
                placeholder: '请输入正文'
                // Some Quill optiosn...
            }
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        post() {
            if (this.userLo === '' || this.title == '' || this.content == '' || this.type == '' || this.source == '') return this.$message.error('请填写完整信息');
            let data = {
                source: this.source,
                title: this.title,
                content: this.content,
                type: this.type,
                userId: this.id == '' || this.id == undefined ? this.userLo : this.id,
            }
            this.$http.post('message/send', data).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('发送成功');
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        cli() {
            this.userList = []
            this.userLo = ''
            this.id = ''
            this.type = ''
            this.content = ''
            this.title = ''
            this.source = '管理员'
        }
    },
    created() {
        this.$http.get('admin/users?ison=is').then(res => {
            let arr = res.data.data;
            arr.unshift({
                id: 0,
                name: '全部'
            })
            if (this.$route.query.id != undefined || this.$route.query.id != '') {
                this.userLo = this.$route.query.name;
                this.id = this.$route.query.id;
            }
            this.userList = arr;
        })
    },


}
</script>

<style lang="less" scoped>
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
</style>