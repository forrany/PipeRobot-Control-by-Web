<template>
    <div class="wrapper">
            <div class="cover" v-show="edit">
                <h1>管道机器人控制系统</h1>
                <div class="editCard" v-show="edit" label-position="top">
                    <el-form ref="form" :model="formLabelAlign" label-width="80px">
                        <el-form-item label="协议">
                            <el-input v-model="formLabelAlign.http"></el-input>
                        </el-form-item>
                        <el-form-item label="IP地址">
                            <el-input v-model="formLabelAlign.IP"></el-input>
                        </el-form-item>
                        <el-form-item label="端口">
                            <el-input v-model="formLabelAlign.PORT"></el-input>
                        </el-form-item>
                        <v-videoSelect ref="videoSelect"/>
                    </el-form>
                    <el-row>
                        <el-button @click="turnToTarget" type="primary">开始使用</el-button>
                        <el-button @click="closeCard">恢复</el-button>
                    </el-row>
                </div>
            </div>
    </div>
</template>
<script>
import videoSelect from './VideoSelect.vue'

export default {
    data() {
        return {
            address: '',
            edit: true,
            formLabelAlign: {
                http:'http',
                IP:'192.168.123.251',
                PORT:'8082'
            },
            reg: /^\d+\.\d+\.\d+.\d+$/
        }
    },
    components:{
        'v-videoSelect':videoSelect,
    },
    mounted() {
        if(localStorage.hasOwnProperty("formLabelAlign")) {
            var current = localStorage.getItem("formLabelAlign");
            this.formLabelAlign = JSON.parse(current);
        } else {
            this.formLabelAlign.http = 'http';
            this.formLabelAlign.IP = '192.168.123.251';
            this.formLabelAlign.PORT = '8080';
        }
        this.address =  `${this.formLabelAlign.http}://${this.formLabelAlign.IP}:${this.formLabelAlign.PORT}/?action=stream`;
    },
    methods: {
        closeCard() {
            this.formLabelAlign = {
                http:'http',
                IP:'192.168.123.251',
                PORT:'8080'
            }
        },
        changeCard() {
            if(/^(http|https)$/.test(this.formLabelAlign.http) && this.formLabelAlign.PORT.length === 4 && this.reg.test(this.formLabelAlign.IP) ) {
                this.add = `${this.formLabelAlign.http}://${this.formLabelAlign.IP}:${this.formLabelAlign.PORT}/?action=stream`;
                localStorage.setItem('formLabelAlign',JSON.stringify(this.formLabelAlign))
                this.address =  `${this.formLabelAlign.http}://${this.formLabelAlign.IP}:${this.formLabelAlign.PORT}/?action=stream`;
                
                /* 发送视频清晰度选择信息 */
                this.$axios.post('/VideoSet',{
                'Video':this.$refs.videoSelect.value,
                }).then((data) => {
                    console.log(data.data)
                }).catch(err => {
                    console.log(err)
                })
                /* 路由跳转 */
                let address = this.address;
                this.$router.push({
                    name:"content",
                    params: { address }
                });
            } else {
                this.$message.error('请检查修改是否合法');
            }
        },
        turnToTarget() {
            if(this.$refs.videoSelect.value !== '') {
                this.changeCard()
            } else {
                this.$alert('请选择视频清晰度', '请确认', {
                confirmButtonText: '确定',
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .cover {
        position: fixed;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        background-color:rgba(0,0,0,0.99);
        h1 {
            color:white;
        }
    }
    .editCard {
        position: fixed;
        width: 21.375rem;
        height: 21.375rem;
        z-index: 2;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
        border-radius: 8px;
        background-color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-form {
            align-self: flex-start;
        }
    }
    .connect {
            margin-top: 20px;
        }
</style>


