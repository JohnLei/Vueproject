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
        <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="showEditrole(scope.row)"></el-button>
        <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
        <el-button size="mini" type="warning" plain icon="el-icon-check" @click="showRoleDialog(scope.row)"></el-button>
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
    <!-- 编辑角色信息 -->
    <el-dialog title="编辑角色信息" :visible.sync="editroleDialogFormVisible">
      <el-form :model="editroleForm" label-width="80px" :rules="rules" ref="editroleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editroleForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editroleForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editroleDialogFormVisible= false">取 消</el-button>
        <el-button type="primary" @click="EditroleSubmit('editroleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色授权窗口组件 -->
    <el-dialog title="角色授权" :visible.sync="RoleDialogFormVisible">
      <div class="container">
        <el-tree
        :data="RightsList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="selectRights"
        :props="defaultProps">
        </el-tree>
      </div>
       <div slot="footer" class="dialog-footer">
        <el-button @click="RoleDialogFormVisible= false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
           
<script>
import {getRoleList,AddRoles,deleteRolesRight,getRightList,getRolesById,Editrole} from '@/api'
export default{
  data () {
    return {
      RolesList: [],
      addroleDialogFormVisible:false, //添加角色对话框
      RoleDialogFormVisible:false,  // 角色授权
      editroleDialogFormVisible:false, //修改角色对话框
      addroleForm:{
        roleName:'',
      },
      // 修改角色
      editroleForm:{
        roleName:'',
        roleDesc:'',
        id:0
      },
      rules:{
        roleName: [{ 
              required: true, message: '请输入角色名', trigger: 'blur'
          }]
      },
      // 树状窗口
      RightsList: [],
      selectRights:[], //  权限选中项
      cuurentRole:{}, // 保存选中项
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
    // 修改(编辑)角色
    showEditrole (row) {
      this.editroleDialogFormVisible = true
      getRolesById (row.id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.editroleForm.id = res.data.roleId
          this.editroleForm.roleName = res.data.roleName
          this.editroleForm.roleDesc = res.data.roleDesc
        }
      })
    },
    // 修改角色信息
    EditroleSubmit (formName) {
      this.$refs[formName].validate(valid => {
        //发送编辑请求
        Editrole (this.editroleForm).then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '修改用户成功!'
            })
            this.editroleDialogFormVisible = false
            this.initRoleList()
          }
        })
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
      this.cuurentRole = row
      // 发送请求渲染权限列表
      getRightList ({type:'tree'}).then(res => {
        if (res.meta.status === 200) {
          this.RightsList = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      // 遍历之前清空数组
      this.selectRights.length = null
      // 取出当前所有的权限，然后遍历到第三个children，取出它里面的所有的项的id，存进selectedRights中
      this.cuurentRole.children.forEach(first => {
        if (first.children && first.children.length !==0) {
          first.children.forEach(second => {
            if (second.children && second.children.length !==0) {
              second.children.forEach(third => {
                this.selectRights.push(third.id)
              })
            }
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
    .container {
      height: 400px;
      overflow: auto
    }
  }
</style>
