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
    <el-button type="success" plain @click="addDialogFormVisible=true">添加分类</el-button>
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
</div>
</template>
           
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
export default {
    data () {
        return {
            addDialogFormVisible:false,
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

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      }
    },
    components:{
        TreeGrid
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
