<template>
    <div>
        <el-row>
            <el-col>
                <el-card shadow="hover">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>欢迎来到悠果后台管理系统</div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import bus from '../common/bus'
export default {
  name: 'index',
  data () {
    return {
      name: localStorage.getItem('ms_username')
    }
  }
}
</script>

<style scoped>

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
    padding: 40px 80px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
    margin-bottom: 10px;
}

</style>
