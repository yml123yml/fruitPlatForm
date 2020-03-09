<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 地标水果管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data: function(){
            return {}
        },
        mounted () {
            axios.post('/api/productList/allList1').then(res => {
                console.log('dddd',res.data)
            })
        }
    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
</style>