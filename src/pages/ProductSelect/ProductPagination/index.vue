<template>
    <div>
       <el-pagination
        background
        layout="prev, pager, next"
        :current-page='currentPage'
        @current-change='ChangePagination'
        :total="1000">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name:'ProductPagination',
        data(){
            return{
                currentPage:1,
                tableData:[]
            }
        },
        methods:{
            //currentPage 改变时会触发
            ChangePagination(value){
                console.log(value);
                this.$api.getselectTbItemAllByPage({
                page:value
            }).then(res=>{
                console.log(res.data);
                if(res.data.status===200){
                    this.tableData=res.data.data.result
                    this.$emit('onsend',res.data.data.result)
                }else{
                    alert(res.data.msg);
                    this.currentPage=1
                }
            }).catch(err=>{
                console.log(err);
                
            })
            }
        }

    }
</script>

<style scoped>

</style>