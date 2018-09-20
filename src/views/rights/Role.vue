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
    <el-button type="primary" plain @click="addroleDialogFormVisible=true">添加角色</el-button>
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
  <!-- 添加角色 -->
  <el-dialog title="添加角色信息" :visible.sync="addroleDialogFormVisible">
        <el-form :model="addroleForm" label-width="80px" :rules="rules" ref="addroleForm">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addroleForm.roleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addroleForm.roleDesc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addroleDialogFormVisible= false">取 消</el-button>
          <el-button type="primary" @click="AddroleSubmit('addroleForm')">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
           
<script>
import {getRoleList,AddRoles} from '@/api'
export default{
  data () {
    return {
      RolesList: [],
      addroleDialogFormVisible:false,
      addroleForm:{
        roleName:'',
      },
      rules:{
        roleName: [{ 
              required: true, message: '请输入角色名', trigger: 'blur'
          }]
      }
    }
  },
  methods: {
    initRoleList () {
      getRoleList ().then(res => {
      console.log(res)
      if (res.meta.status === 200) {
        this.RolesList = res.data
      }
    })
    },
    AddroleSubmit (formName) {
     this.$refs[formName].validate(valid => {
       if (valid) {
         AddRoles(this.addroleForm).then(res => {
          //  console.log(res)
           if (res.meta.status === 201) {
             this.$message({
                type: 'success',
                message: '创建角色成功!'
             })
           }
           this.addroleDialogFormVisible = false
           this.initRoleList()
         })
       }
     })
    }
  },
  created() {
    this.initRoleList()
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
