<template>
    <div>
        图表
    </div>
</template>
           
<script>
import {Report} from '@/api'
export default{
    created() {
        Report ().then(res => {
            console.log(res)
        })
    },          
}
</script>
<style lang="scss" scoped>

</style>
