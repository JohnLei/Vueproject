<template>
  <div class="right">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item> -->
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
      </el-row>
      <!-- 列表 -->
        <el-table
          v-loading="loading2"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="RoleList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column label="层级">
        <template slot-scope="scope">
        <span>{{scope.row.level|fromlevel}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
           
<script>
import {getRightList} from '@/api'
export default{
  data () {
    return {
      RoleList:[],
      loading2:true
    }
  },
  filters: {
    fromlevel (level) {
      if (level == '0') {
        return '一级'
      } else if (level == '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  },
  created() {
    this.loading2 = true
    getRightList({type:'list'}).then(res => {
      // console.log(res)
      if (res.meta.status === 200) {
        this.RoleList = res.data
        this.loading2 = false
      }
    })
  },

             
}
</script>
<style lang="scss" scoped>

</style>