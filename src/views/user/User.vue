<template>
<div class="user">
   <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
      </el-row>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="24">
        <el-input placeholder="请输入内容" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
        </el-col>
        </el-row>
          <el-table
        :data="userList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话">
        </el-table-column>
      </el-table>
      <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
     </el-pagination>
      </div>
    </div>
</template>
           
<script>
import {getUserList} from '@/api'
export default{
    data() {
      return {
        userList: []
      }
    },
    created () {
      this.initList()
    },
     methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //初始化数据
      initList () {
        getUserList({
          params:{
            query:'',
            pagenum:'1',
            pagesize:'3'
          }
        }).then(res => {
          console.log(res)
          this.userList = res.data.users
        })
      }
    },     
}
</script>
<style lang="scss" scoped>
.user {
  .el-table {
     margin: 20px 0;
  }
  .search-input{
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #999
  }
}
</style>
