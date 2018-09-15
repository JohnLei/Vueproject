<template>
    <div>
        这是主页
    </div>
</template>
<script>
    //导入getUserList方法
    import {getUserList} from '@/api'
    export default {
        data () {
            return {
                
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
    }
}
</script>
<style lang="scss" scoped>

</style>
