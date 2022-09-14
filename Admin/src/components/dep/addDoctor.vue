<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">新增医生</p>
            <el-button type="primary" @click="back" plain style="position:absolute;right:20px;">返回</el-button>
        </div>
        <el-card class="cardTop" style="margin-top:20px;">
            <p class="cardTitle">填写医生信息</p>
            <div class="cardBox">

                <el-form label-width="60" style="width:500px;" label-position="right">
                    <el-form-item label="医生照片" style="display:flex;">
                        <el-upload class="centerImg" :action="' '" list-type="picture-card" :auto-upload="false"
                            :limit="1" :on-change="complete" ref="uploadicon" :file-list="filelist">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="选择科室">
                        <el-cascader :props="props" :options="options" v-model="dep" style="width:calc(100% - 70px)">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="医生姓名">
                        <el-input v-model="info.name" autocomplete="off" placeholder="请输入医生姓名"
                            style="width:calc(100% - 70px)"></el-input>
                    </el-form-item>
                    <el-form-item label="医生职称">
                        <el-select v-model="info.position" placeholder="请选择职称" style="width:calc(100% - 70px)">
                            <el-option v-for="item in ['主治医师', '主任医师', '副主任医师']" :key="item" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问诊费用">
                        <el-input v-model="info.reg" type="number" autocomplete="off" placeholder="请输入问诊费金额"
                            style="width:calc(100% - 70px)"></el-input>
                    </el-form-item>
                    <el-form-item label="诊查费用">
                        <el-input v-model="info.dia" type="number" autocomplete="off" placeholder="除挂号费以外的诊查费"
                            style="width:calc(100% - 70px)">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="医生简介">
                        <el-input v-model="info.brief" type="textarea" autocomplete="off" placeholder="医生的简介"
                            style="width:calc(100% - 70px)">
                        </el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:30px;">
                        <el-button type="primary" @click="post">立即添加</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <div style="height:60px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            dep: [],
            info: {
                name: '',
                position: '',
                reg: '',
                dia: '',
                brief: '',
            },
            photo: '',
            filelist: []
        }
    },
    methods: {
        lazyLoad(node, resolve) {
            const { level } = node;
            if (level == 1) {
                this.$http.get(`simple/getDepOne?hosId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 2
                        })
                    })
                    resolve(arr2);
                })
            }
            else if (level == 2) {
                this.$http.get(`simple/getDepTwo?depId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 2
                        })
                    })
                    resolve(arr2);
                })
            }
        },
        back() {
            this.$router.go(-1);
        },
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
                this.photo = file.raw;//图片的url
            }
        },
        post() {
            let config = {
                "Content-Type": "multipart/form-data"
            }
            let data = new FormData();
            data.append('photo', this.photo);
            data.append('depTwoId', this.dep[2]);
            data.append('depId', this.dep[1]);
            data.append('hosId', this.dep[0]);
            data.append('name', this.info.name);
            data.append('position', this.info.position);
            data.append('reg', this.info.reg);
            data.append('dia', this.info.dia);
            data.append('brief', this.info.brief);
            this.$http.post('admin/dep/addDoctor', data, config).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('添加成功');
                } else {
                    this.$message.error(res.data.msg);
                }
            })

        }
    },
    created() {
        this.$http.get('simple/getHospital').then(res => {
            let arr = res.data.data;
            let arr2 = []
            arr.forEach(item => {
                arr2.push({
                    value: item.id,
                    label: item.name,
                    children: []
                })
            })
            this.options = arr2;
        })
    }

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