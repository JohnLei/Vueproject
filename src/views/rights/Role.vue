<template>
  <div class="role">
    <el-row>
    <el-col :span="24">
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    </el-col>
    </el-row>
    <!-- 按钮 -->
    <el-button type="primary" plain>添加角色</el-button>
    <!-- 表格 -->
    <el-table
    :data="RolesList"
    style="width: 100%">
    <el-table-column type="expand">
     <template slot-scope="props">
    </template>
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
        <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
        <el-button size="mini" type="warning" plain icon="el-icon-check"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
           
<script>
import {getRoleList} from '@/api'
export default{
  data () {
    return {
      RolesList: []
    }
  },
  created() {
    getRoleList ().then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.RolesList = res.data
      }
    })
  },
}
</script>
<style lang="scss" scoped>

</style>
