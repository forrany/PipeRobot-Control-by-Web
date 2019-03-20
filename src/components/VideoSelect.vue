<template>
    <el-form-item label="清晰度">
        <el-select v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script>
export default {
    data() {
        return {
            value:'2',
            options:[ 
                {value:"1",
                 label:"一般"
                },
                {value:"2",
                 label:"清晰（推荐）"
                },
                {value:"3",
                 label:"高清"
                }
            ]
        }
    },
    props:{
        position:String
    },
    created() {
        if(this.position === "ControlPannel") {
            this.$axios.get('/VideoStatus').then(response => {
                this.value = response.data.toString();
            })
        }
    },
    watch: {
        value : function(val) {
            this.$axios.post('/VideoSet',{
                'Video': val,
                }).then((data) => {
                    this.$emit('update'); //更新视图
                }).catch(err => {
                    console.log(err)
                });
        }
    }
}
</script>
