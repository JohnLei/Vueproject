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
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList()">
          <el-button slot="append" icon="el-icon-search" @click="initList()"></el-button>
      </el-input>
      <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
        </el-col>
        </el-row>
          <el-table
          v-loading="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
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
        <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.mg_state" @change="changeUserState(scope.row)">
        </el-switch>
        </template>
      </el-table-column>
        <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain icon="el-icon-edit" @click="showEdit(scope.row)"></el-button>
          <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="showDel(scope.row)"></el-button>
          <el-button size="mini" type="warning" plain icon="el-icon-check" @click="showgrant(scope.row)"></el-button>
        </template>
    </el-table-column>
      </el-table>
      <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
     </el-pagination>
      </div>
      <!-- 添加用户对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" label-width="80px" :rules="rules" ref="addForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible= false">取 消</el-button>
          <el-button type="primary" @click="AdduserSubmit('addForm')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
     <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" label-width="80px" :rules="rules" ref="editForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogFormVisible= false">取 消</el-button>
          <el-button type="primary" @click="editUserSubmit('editForm')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 删除提示框 -->
    <!-- 权限修改 -->
      <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
          <el-form :model="grantForm" label-width="120px">
            <el-form-item label="当前的用户:" prop="username">
              <!-- <el-input v-model="grantForm.username" auto-complete="off" :disabled="true"></el-input> -->
              <el-tag type="info">{{grantForm.username}}</el-tag>
            </el-form-item>
        <el-form-item label="请选择角色:">
            <el-select v-model="roleId" placeholder="请选择角色">
              <el-option
              v-for="(role,index) in roleList" :key="index" 
               :label="role.roleName"
               :value="role.id">
               </el-option>
            </el-select>
        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="grantDialogFormVisible= false">取 消</el-button>
            <el-button type="primary" @click="grantRoleSubmit()">确 定</el-button>
          </div>
      </el-dialog>
    </div>
</template>
           
<script>
import {getUserList,changeUserState,addUser,getUserById,editUser,delUser,getRoleList,grantUserrole} from '@/api'
export default{
    data() {
      return {
        //图表加载
        loading2:true,
        userList: [],
        // value3:'',
        query:'',
        total:0,
        pagesize:10,
        pagenum:1,
        addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        editForm:{
          username:'',
          email:'',
          mobile:'',
          id:0
        },
        grantForm:{},
        //角色id
        roleId:'',
        //申明一个空数组获取权限的时候使用
        roleList:[],
        addDialogFormVisible:false,
        editDialogFormVisible:false,
        grantDialogFormVisible:false,
        //添加表单验证
        rules:{
          username: [{ 
              required: true, message: '请输入用户名', trigger: 'blur'
          }],
          password: [{ 
              required: true, message: '请输入密码', trigger: 'blur' 
          }],
          email: [{ 
              required: true, message: '请输入邮箱地址', trigger: 'blur' },{ 
              type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'
          }],
          mobile: [{ 
              required: true, message: '电话不能为空' 
          }]
        }
      }
    },
    created () {
      this.initList()
    },
     methods: {
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val
        this.initList()

      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum = val
        this.initList()
      },
      //初始化数据
      initList () {
        this.loading2 = true
        getUserList({
          params:{
            query:this.query,
            pagenum:this.pagenum,
            pagesize:this.pagesize
          }
        }).then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
             this.userList = res.data.users
             this.total = res.data.total
             this.loading2 = false
          }
        })
      },
      //监听开关按钮的状态
      changeUserState (row) {
        // console.log(row)
        //改变用户状态
        changeUserState({
            uId:row.id,
            type:row.mg_state
        }).then(res => {
          console.log(res)
          if (res.meta.status === 200) {
            this.$message({
              message:'修改用户状态成功',
              type:'success'
            })
          } else {
            this.$message({
              type:'warning',
              message:res.meta.msg
            })
          }
        })
      },
      AdduserSubmit (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            //发送请求
            addUser(this.addForm).then(res =>{
              // console.log(res)
              if (res.meta.status === 201) {
                this.$message({
                  type: 'success',
                  message: '创建用户成功!'
                })
              }
              this.addDialogFormVisible = false
              this.initList()
            })
          }
        })
      },
      showEdit (row) {
        this.editDialogFormVisible = true
        getUserById (row.id).then(res => {
          if (res.meta.status === 200) {
            this.editForm.username = res.data.username
            this.editForm.email = res.data.email
            this.editForm.mobile = res.data.mobile
            this.editForm.id = res.data.id
          }
        })
      },
      editUserSubmit (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            // 发送编辑请求
            editUser (this.editForm).then(res => {
              if (res.meta.status === 200) {
                  this.$message({
                  type: 'success',
                  message: '修改用户成功!'
                })
                this.editDialogFormVisible = false
                this.initList()
              }
            })
          }
        })
      },
      showDel (row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser (row.id).then(res => {
            if (res.meta.status === 200) {
              this.$message({
              type: 'success',
              message: '删除成功!'
              })
              this.initList()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
      },
      showgrant (row) {
        this.grantForm = row
        this.grantDialogFormVisible = true
        getRoleList ().then(res => {
          // console.log(res)
          if (res.meta.status === 200) {
            this.roleList = res.data
          }

        })
      },
      grantRoleSubmit () {
        if (!this.roleId) {
          this.$message({
            type:'warning',
            message:'请选择您需要的权限:'
          })
        } else {
            grantUserrole({
            id:this.grantForm.id,
            rid:this.roleId
          }).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message({
              type:'success',
              message: '设置角色成功'
            })
              this.grantDialogFormVisible = false
            } else {
              this.$message({
                type:'warning',
                message:res.meta.msg
              })
           }
        })
        }
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
