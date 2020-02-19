<template>
    <div class="params_BOX">
        <el-button type="primary"  @click="dialogAddParamsHandler">添加规格参数</el-button>
            <!-- 表格 -->
       <el-table
      :data="paramsData"
      style="width:100%">
           <el-table-column :show-overflow-tooltip="true" width='80px' prop="id" label="ID"></el-table-column>
           <el-table-column :show-overflow-tooltip="true" width='80px' prop="itemCatId" label="类目id"></el-table-column>
           <el-table-column :show-overflow-tooltip="true" width='500px' prop="paramData" label="规格参数"></el-table-column>
           <el-table-column :show-overflow-tooltip="true"  prop="created" label="创建时间"></el-table-column>
           <el-table-column :show-overflow-tooltip="true"  prop="updated" label="更新时间"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
          </el-table-column>
       </el-table>

       <!-- 添加大弹出框 -->
         <el-dialog width="50%" title="商品类目选择" :visible.sync="paramsVisible">
                  <!-- 类目tree -->
                <el-tree
                    :load="loadTreeNodes"
                    :props="defaultProps"
                    lazy
                    highlight-current
                    @node-click="handleNodeClick"
                ></el-tree>
               <el-dialog width="50%" title="添加分组" :visible.sync="addGroupVisible"  append-to-body>
               
                   <ParamsAdd @onParamsAdd='getParamsAdd'/>
               </el-dialog>
            <span slot="footer" class="dialog-footer">
            <el-button @click="paramsVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGroupHandler">添加并分组</el-button>
            </span>
         </el-dialog>
    </div>
</template>

<script>
import  ParamsAdd from '../ParamsAdd/index'
    export default {
        name:'ParamsList',
        data(){
            return{
                paramsData:[],
                paramsVisible:false,
                defaultProps:{
                     children: "children",
                     label: "name"
                },
                addGroupVisible:false,
                paramsId:0

            }
        },
        components: {
            ParamsAdd,
        },
        mounted () {
           this.http()
        },
        methods: {
            http(){
                // 查询规格参数接口
                 this.$api.getselectItemParamAll()
               .then(res=>{
                console.log(res.data);
                if(res.data.status==200){
                    // console.log(res.data.data.result);
                    this.paramsData=res.data.data.result        
                }        
            });

            },
            // 删除
            handleDelete(index,row){
                // console.log(row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                              //删除接口
                     this.$api.getdeleteItemParamById({
                                id:row.id
                            }).then(res=>{
                                console.log(res.data);
                                if(res.data.status==200){
                                        console.log(res.data); 
                                        this.http();  
                                        this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                    }else{
                                         this.$message({
                                            type: 'error',
                                            message: '删除失败!'
                                        });
                                    }  
                                
                            })
                            .catch((err) => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
    
                        })     

            },
            // 添加规格参数
            dialogAddParamsHandler() {
                this.paramsVisible=true
            },
             loadTreeNodes(node,resolve){
                //  console.log(node.data);     
                //  console.log(this.currentCategory.cid);     
                // 判断是否是第一次
                if (node.level === 0) {
                    this.$api.getProductCategory().then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            alert("请求失败");
                        }
                    });
                }
                if (node.level >= 1) {
                    this.$api.getProductCategory({
                        id:node.data.cid
                    }).then(res => {
                        if (res.status === 200) {
                            return resolve(res.data.data);
                        } else {
                            alert("请求失败");
                        }
                    }).catch(error =>{
                        resolve([])
                    })
                }
                
            },
            addGroupHandler(){
              this.addGroupVisible=true
            },
             // tree点击事件--->获取cid
            handleNodeClick(data) {
                console.log(data);
                this.paramsId=data.cid

            },
            // 表单提交按钮时触发 
            getParamsAdd(value){
                console.log(value);
                this.paramsVisible=false;
                this.addGroupVisible=false;
                // 添加规格的参数
                this.$api.getinsertItemParam({
                    itemCatId:this.paramsId,
                    paramData:value
                }).then(res=>{
                    console.log(res.data);
                    if(res.data.status===200){
                         this.http()
                    }else{
                         this.$message({
                             type:'error',
                             message:res.data.msg
                         })
                    }
                    
                }).catch(err=>{
                    console.log(err);
                     this.$message({
                             type:'error',
                             message:'添加失败'
                         })
                    
                })
                
                
            }
        },
    }
</script>

<style scoped>
.params_BOX{
    width: 1200px;
    margin:20px auto;
}
</style>