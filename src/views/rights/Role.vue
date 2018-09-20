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
          <el-tag closable @close="deleteRight(props.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
          <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
        </el-col>
        <el-col :span="20">
          <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
            <el-col :span="4">
              <el-tag closable type="success" @close="deleteRight(props.row,secondChildren.id)">{{secondChildren.authName}}</el-tag>
              <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
            </el-col>
            <el-col :span="20">
                <el-tag @close="deleteRight(props.row,thirChildren.id)" closable type="warning" v-for="thirChildren in secondChildren.children" :key="thirChildren.id">{{thirChildren.authName}}</el-tag>
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
        <el-button size="mini" type="warning" plain icon="el-icon-check" @click="showRoleDialog"></el-button>
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
    <!-- 角色授权窗口组件 -->
    <el-dialog title="角色授权" :visible.sync="RoleDialogFormVisible">
      <el-tree
      :data="data2"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="[5]"
      :props="defaultProps">
      </el-tree>
       <div slot="footer" class="dialog-footer">
        <el-button @click="RoleDialogFormVisible= false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import {getRoleList,AddRoles,deleteRolesRight,getRightList} from '@/api'
export default{
  data () {
    return {
      RolesList: [],
      addroleDialogFormVisible:false,
      RoleDialogFormVisible:false,
      addroleForm:{
        roleName:'',
      },
      rules:{
        roleName: [{ 
              required: true, message: '请输入角色名', trigger: 'blur'
          }]
      },
      // 树状窗口
      data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'authName'
      }
    }
  },
  methods: {
    initRoleList () {
      getRoleList ().then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.RolesList = res.data
      }
    })
    },
    // 添加角色
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
    },
    // 删除角色指定权限
    deleteRight (row,rightId) {
      // console.log(row,rightId)
      deleteRolesRight ({roleId:row.id,rightId:rightId}).then(res => {
        console.log(res.data)
        if (res.meta.status === 200) {
          row.children = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    // 角色授权数据显示
    showRoleDialog (row) {
      this.RoleDialogFormVisible = true
      // 发送请求渲染权限列表
      getRightList ({type:'tree'}).then(res => {
        if (res.meta.status === 200) {
          this.data2 = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
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
