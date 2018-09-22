<template>
<div class="category">
    <el-row>
        <el-col :span="24">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        </el-col>
    </el-row>
    <!-- 添加分类 -->
    <el-row>
        <el-col :span="24">
        <el-button type="success" plain @click="addCategory">添加分类</el-button>
        </el-col>
    </el-row>
    <!-- 树形组件 -->
    <tree-grid
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        @deleteCate="deleteCategory"
        @editCate="editCategory"
        >
    </tree-grid>
    <!-- 分页 -->
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
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" label-width="80px" :rules="rules" ref="addCateForm">
        <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
            <el-cascader
            :options="options"
            v-model="selectedOptions"
            :props="props"
            @change="handleChange">
            </el-cascader>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
           
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategory,addCategory} from '@/api'
export default {
    data () {
        return {
            addDialogFormVisible:false,
            pagesize:5,
            pagenum:1,
            addForm:{
              cat_name:'',
              cat_pid:0,
              cat_level:0  
            },
            rules : {
            cat_name: [{ 
                required: true, message: '请输入分类名', trigger: 'blur'
                }]
            },
            options:[], //级联选择器的数据源
            props: {    //表示配置级联选择器展示的数据
                value:'cat_id',
                label:'cat_name'
            },
            selectedOptions:[], //级联选择器选择后的数据
                columns: [
            {
                text: "分类名称",
                dataIndex: "cat_name",
                width: ""
            },
            {
                text: "是否有效",
                dataIndex: "cat_deleted",
                width: ""
            },
            {
                text: "排序",
                dataIndex: "cat_level",
                width: ""
            }
            ],
            dataSource: [],
            total:10
        }
    },
    methods: {
        deleteCategory (cid) {
            console.log(cid)
        },
        editCategory (cid) {
            console.log(cid)
        },
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize = val
        this.initcategory()

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagenum = val
        this.initcategory()
      },
      initcategory () {
          getCategory ({type:'3',pagenum:this.pagenum,pagesize:this.pagesize}).then(res => {
            //   console.log(res)
            if (res.meta.status === 200) {
                this.total = res.data.total
                this.dataSource = res.data.result
            }
          })
      },
      // 定义级联选择器handleChange事件
      handleChange (value) {
          console.log(value)
      },
      // 点击添加分类按钮时获取分类数据
      addCategory () {
          this.addDialogFormVisible = true
          // 发送分类列表请求
          getCategory ({type:'2'}).then(res => {
            //   console.log(res)
              if (res.meta.status === 200) {
                  this.options = res.data
              }
          })
      },
      // 点击添加时触发的事件
      addCateSubmit (forName) {
          this.$refs[forName].validate(valide => {
              if (valide) {
                  //添加一级分类
                  if (this.selectedOptions.length === 0) {
                      this.addForm.cat_pid = 0
                      this.addForm.cat_level = 0
                  } else if (this.selectedOptions.length === 1) {
                      this.addForm.cat_pid = this.selectedOptions[0]
                      this.addForm.cat_level = 1
                  } else {
                      this.addForm.cat_pid = this.selectedOptions[0]
                      this.addForm.cat_level = 2
                  }
                  //添加数据的发送请求
                  addCategory (this.addForm).then(res => {
                      console.log(res)
                      if (res.meta.status === 201) {
                          this.addDialogFormVisible = false
                          this.initcategory()
                          this.$message({
                          type: "success",
                          message: res.meta.msg
                       });
                      }
                  })
              }
          })
        }
    },
    components:{
        TreeGrid
    },
    created() {
        this.initcategory()
    }
}
</script>
<style lang="scss" scoped>
.category {
    .page {
        padding: 5px 0;
        background-color: #999
    }
}
</style>
