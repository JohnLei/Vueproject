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
       <el-row v-for="firstChildren in props.row.children" :key="firstChildren.id">
        <el-col :span="4">
          <el-tag closable>{{firstChildren.authName}}</el-tag>
          <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
        </el-col>
        <el-col :span="20">
          
            <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
              <el-col :span="4">
                <el-tag closable type="success">{{secondChildren.authName}}</el-tag>
                <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
              </el-col>
              <el-col :span="20">
                  <el-tag closable type="warning" v-for="thirChildren in secondChildren.children" :key="thirChildren.id">{{thirChildren.authName}}</el-tag>
                </el-col>
              </el-row >
        </el-col>
       </el-row>
    </template>
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName" width="165px">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc" width="120px">
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
      console.log(res)
      if (res.meta.status === 200) {
        this.RolesList = res.data
      }
    })
  },
}
</script>
<style lang="scss" scoped>
  .role {
    .el-tag {
      margin: 5px 0 5px 5px;
    }
  }
</style>
