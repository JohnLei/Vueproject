<template>
<div class="home">
    <el-container>
        <!-- 侧边栏布局 -->
        <el-aside width="auto">
            <div class="logo"></div>
            <el-menu
            :unique-opened="true"
            :router="true"
            :collapse="isCollapse"
            class="el-menu-admin"
            @open="handleOpen"
            @close="handleClose"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
            <el-submenu :index="items.path" v-for="items in menuData" :key="items.id">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{items.authName}}</span>
                </template>
                 <el-menu-item :index="target.path" v-for="target in items.children" :key="target.id">
                <i class="el-icon-menu"></i>
                <span slot="title">{{target.authName}}</span>
            </el-menu-item>
            </el-submenu>
            <!-- 权限管理 -->
            <!-- <el-submenu index="2">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
                </template>
                 <el-menu-item index="/role">
                <i class="el-icon-menu"></i>
                <span slot="title">角色列表</span>
            </el-menu-item>
             <el-menu-item index="/rights">
                <i class="el-icon-menu"></i>
                <span slot="title">权限列表</span>
            </el-menu-item>
            </el-submenu> -->
            </el-menu>
        </el-aside>
    <el-container>
        <el-header>
            <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
            <div class="system-title">电商后台管理系统</div>
            <span class="welcome">您好,{{$store.state.username}}</span>
            <el-button type="text" @click="layout">退出</el-button>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container> 
    </div>
</template>
<script>
    //导入getUserList方法
    import {getUserList,getMenus} from '@/api'
    export default {
        data () {
            return {
                isCollapse:false,
                menuData:[]
            }
        },
            methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            toggleCollapse () {
                this.isCollapse = !this.isCollapse
            },
            //退出功能
            layout () {
                localStorage.removeItem('keytoken')
                this.$router.push({name:'login'})
            }
        },
        created () {
            getUserList({
            params: {
                query:'',
                pagenum:'1',
                pagesize:'1'
            }
        }).then(res => {
            // console.log(res)
        })
        //动态获取侧边栏数据
        getMenus ().then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
                this.menuData = res.data
            }
        })
    }
}
</script>
<style lang="scss" scoped>
  .home {
      height: 100%;
      .el-menu-admin:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
  }
    .el-container {
        height: 100%;
    }
    .el-aside {
        background-color: #545c64;
    }
    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #545c64;
    }
    .logo {
        height:60px;
        background: url(../assets/logo.png);
        background-size: cover;
        background-color: #989898;
    }
    .toggle-btn {
        font-size: 36px;
        color: #989898;
        cursor: pointer;
        line-height: 60px;
    }
    .system-title {
        font-size: 28px;
        color: white;
    }
    .logout-btn {
        color: orange;
    }
    .welcome {
        color: #fff;
    }
  }
</style>
