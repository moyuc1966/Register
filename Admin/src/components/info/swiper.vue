<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">轮播图管理</p>
            <el-button type="primary" @click="utw = true" plain style="position:absolute;right:56px;">新增
            </el-button>
        </div>
        <el-card class="card">
            <div class="list">
                <el-dropdown class="block" v-for="(item, index) in list" :key="index">
                    <el-image style="width: 100%; height: 100%" :src="apiUrl + item.imgUrl"
                        :preview-src-list="[apiUrl + list[index].imgUrl]">
                    </el-image>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <span @click="showMod(item.id, index)">修改</span>
                        </el-dropdown-item>
                        <el-dropdown-item><span @click="del(item.id, index)">删除</span></el-dropdown-item>
                        <el-dropdown-item>
                            <span @click="look(item.detId, item.cat)">查看文章</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-dialog title="新增轮播图" :visible.sync="utw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="选择跳转文章" style="display:flex;">
                        <el-select v-model="wz" filterable placeholder="请选择跳转文章">
                            <el-option v-for="item in userList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传轮播图" style="display:flex;">
                        <el-upload style="margin-left:16px;" class="centerImg" :action="' '" list-type="picture-card"
                            :auto-upload="false" :limit="1" :on-change="complete" ref="uploadicon">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="post">提交</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改轮播图" :visible.sync="modUtw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="选择跳转文章" style="display:flex;">
                        <el-select v-model="modwz" filterable placeholder="请选择跳转文章">
                            <el-option v-for="item in userList" :key="item.id" :label="item.title" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="mod">修改</el-button>
                </div>
            </el-dialog>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            addormod: true, //true为新增，false为修改
            utw: false,
            index: 0,
            wz: '',
            userList: [],
            photo: '',
            modUtw: false,
            modwz: '',
            id: 0

        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.get('api/swiper').then(res => {
                loading.close();
                if (res.data.code == 200) {
                    this.list = res.data.data;
                } else {
                    this.$message.error(res.data.msg);
                }
            })
            this.$http.get('api/article').then(res => {
                let arr = res.data.data;
                this.userList = arr;
            })
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
        look(id, cat) {
            this.$router.push({
                path: '/systemInfo/article/content',
                query: {
                    id: id,
                    cat: cat
                }
            })
        },
        showMod(id, index) {
            this.id = id;
            this.modUtw = true;
            this.index = index;
        },
        mod() {
            if (this.modwz == '') return this.$message.error('请选择跳转文章');
            this.$http.post('admin/swiperMod', {
                detId: this.modwz,
                id: this.id
            }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('修改成功');
                    this.modUtw = false;
                    this.list[this.index].detId = this.modwz;
                } else {
                    this.$message.error(res.data.msg);
                }
            })

        },
        post() {
            //新增
            if (this.wz == '' || this.photo == '') return this.$message.error('请输入完整');
            let config = {
                "Content-Type": "multipart/form-data"
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let data = new FormData();
            data.append('swiperImg', this.photo);
            data.append('detId', this.wz);
            this.$http.post('admin/swiperPut', data, config).then(res => {
                if (res.data.code == 200) {
                    this.$http.get('api/swiper').then(res => {
                        if (res.data.code == 200) {
                            loading.close();
                            this.$message.success('添加成功');
                            this.list = res.data.data;
                        } else {
                            loading.close();
                            this.$message.error(res.data.msg);
                        }
                    })
                } else {
                    loading.close();
                    this.$message.error(res.data.msg);
                }
            })
        },
        del(id, index) {
            this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //强制删除
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                console.log('id', id)
                this.$http.delete(`admin/swiperDel?id=${id}`).then(res => {
                    loading.close();
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.list.splice(index, 1);
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });
            });
        }
    },
}
</script>

<style lang="less" scoped>
.el-image /deep/ .el-image-viewer__wrapper {
    z-index: 1000000000 !important;
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

        .tag {
            height: 8px;
            width: 25px;
            border-radius: 4px;
            background-color: #1a7cff;
        }

        .tagTitle {
            font-size: 23px;
            color: #000;
            margin-left: 15px;
        }
    }

    .card {
        width: 100%;
        min-height: 300px;
        margin-top: 10px;
        background: #fff;
        height: calc(100% - 90px);

        .list {
            display: flex;
            flex-wrap: wrap;

            .block {
                min-width: 240px;
                box-shadow: 0px 0px 20px rgba(215, 215, 215, 1);
                max-width: 320px;
                height: 120px;
                position: relative;
                margin: 15px 20px;

                .el-switch {
                    position: absolute;
                    top: 14px;
                    right: 15px;
                }

                .minname {
                    display: block;
                    width: calc(100% - 80px);
                    font-size: 16px;
                    font-weight: bold;
                    text-align: left;
                    margin-left: 25px;
                    word-wrap: break-word;
                }

                .name {
                    font-size: 14px;
                    text-align: left;
                    margin-left: 25px;
                    display: block;
                    width: calc(100% - 70px);
                }

                .el-icon-arrow-down:before {
                    color: #1a7cff !important;
                }
            }
        }
    }
}
</style>