<template>
    <div class="product-list">
        <el-button type="primary" icon="el-icon-search" @click="dialogAddProductVisibleHandler">添加商品</el-button>
        
        <el-dialog title="商品类目选择" :visible.sync="AddProductVisible" width='60%'>
               
              <el-dialog
                width="30%"
                title="类目选择"
                :visible.sync="ProductCategoryVisible"
                append-to-body>
                    <!-- 树形图懒加载 -->
                   <!-- 类目tree -->
                <el-tree
                    :load="loadTreeNodes"
                    :props="defaultProps"
                    lazy
                    highlight-current
                    @node-click="handleNodeClick"
                ></el-tree>
                  <el-button type="primary" icon="el-icon-search" @click="ProductCategoryVisible=false">确定</el-button>
                   
                </el-dialog>
                <el-dialog
                    width="30%"
                    title="上传图片"
                    :visible.sync="ProductUpLoadVisible"
                    append-to-body>
                <ProductUpLoad @sendUpLoad='getUpLoad'/>
                      
                <div slot="footer" class="dialog-footer">
                    <el-button @click="ProductUpLoadVisible = false" type='primary'>确定</el-button>
                    <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
                </div>
                </el-dialog>
              <el-form ref="form" :model="product" label-width="80px">
                 <el-form-item label="商品类目" >
                    <el-button style='float:left' type='primary'  @click="dialogAddProductCategoryHandler">选择类目</el-button>
                     <span style="float:left;margin-left:10px" v-if='currentCategory'>{{ currentCategory.name }}</span>
                </el-form-item>
                <el-form-item label="商品标题" prop='title'>
                    <el-input   v-model="product.title"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点">
                    <el-input v-model="product.sellPoint"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="product.price"></el-input>
                </el-form-item>
                <el-form-item label="库存数量">
                    <el-input v-model="product.num"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-button style="float:left" type="primary" @click="ProductUpLoadVisible=true">上传图片</el-button>
                 <span style="float:left">{{uploadObj.name}}</span> 
                </el-form-item>
                 <el-form-item label="商品描述">
                     富文本编辑框
                     <ProductUEditor @sendUeditorData='getUeditorData' :UeditorData='UeditorData'/>
                    <!-- <ProductUEditor @onProductDesc="getProductDesc" /> -->
                </el-form-item>
              </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="AddProductVisible = false" >取 消</el-button>
                <el-button @click="AddProductVisibleHandler" type='primary'>确定</el-button>
                <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
            </div>
        </el-dialog>
        <!-- 表格 -->
       <el-table
      :data="tableData"
      style="width:100%">
           <el-table-column :show-overflow-tooltip="true" prop="title" label="商品标题"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="image" label="商品图片"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="sellPoint" label="商品卖点"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="price" label="商品价格"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="cid" label="商品类目"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="num" label="商品库存"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="barcode" label="条形码"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="status" label="状态"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="created" label="创建日期"></el-table-column>
            <el-table-column :show-overflow-tooltip="true" prop="updated" label="更新日期"></el-table-column>
             <el-table-column :show-overflow-tooltip="true"  label="操作">
                  <template slot-scope="scope">
                    <el-button
                    size="mini"
                    icon='el-icon-edit'
                    circle
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                     icon='el-icon-delete'
                    circle
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
             </el-table-column>
       </el-table>
        <ProductPagination @onsend='getTableData'/>
       <el-table
      :data="toutiao"
      style="width:100%">
           <el-table-column :show-overflow-tooltip="true" prop="title" label="商品标题"></el-table-column>
           <el-table-column :show-overflow-tooltip="true" prop="title" label="商品标题"></el-table-column>
            
             <el-table-column :show-overflow-tooltip="true"  label="操作">
                  <template slot-scope="scope">
                    <el-button
                    size="mini"
                    icon='el-icon-edit'
                    circle
                    @click="handleEdit(scope.$index, scope.row)"></el-button>
                    <el-button
                    size="mini"
                    type="danger"
                     icon='el-icon-delete'
                    circle
                    @click="handleDelete(scope.$index, scope.row)"></el-button>
                </template>
             </el-table-column>
       </el-table>
       
    </div>
</template>

<script>
import ProductPagination from '../ProductPagination'
import ProductUEditor from '../ProductUEditor'
import  ProductUpLoad from '../ProductUpLoad/index'
    export default {
        name:'ProductList',
        data(){
            return{
                tableData:[],
                toutiao:[],
                AddProductVisible:false,//外层
                ProductCategoryVisible:false,//内层
                ProductUpLoadVisible:false,
                product:{},
                defaultProps:{
                     children: "children",
                     label: "name"
                },
                currentCategory:{},
                uploadObj:{},
                UeditorData:'',
                goodsId:0,
                rules:{
                    title:[
                            { required: true, message: '请输入活动名称', trigger: 'blur' },
                            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                        ],
                }
            }
        },
        components:{
            ProductPagination,
            ProductUEditor,
            ProductUpLoad
        },
        mounted () {
            this.http()
        },
        methods: {
            // 首页查询商品列表
            http(){
               this.$api.getselectTbItemAllByPage({
                page:1
            }).then(res=>{
                console.log(res.data);
                if(res.data.status===200){
                    this.tableData=res.data.data.result
                }
            }).catch(err=>{
                console.log(err);
                
            })
            },
            getTableData(value) {
                console.log(value);
                this.tableData=value
                
            },
            // 点击添加商品
            dialogAddProductVisibleHandler(){
                    this.AddProductVisible=true;
            },
            dialogAddProductCategoryHandler(){
                   this.ProductCategoryVisible=true
            },
            // 编辑 
            handleEdit(index,row){
                    this.AddProductVisible = true
                // 预更新
                this.$api.getpreUpdateItem({
                    itemId:row.id
                }).then(res=>{
                    console.log(res.data);
                    this.product=res.data.data
                    // this.product.title=res.data.data.title;
                    // this.product.sellPoint=res.data.data.sellPoint;
                    // this.product.price=res.data.data.price;
                    // this.product.num=res.data.data.num;
                    this.currentCategory.cid=res.data.data.cid;
                    this.UeditorData=res.data.data.desc;
                    // this.UeditorData='<p>9999</p>';
                    this.uploadObj.name=res.data.data.image
                    this.goodsId=res.data.data.id

                })

            },
            // 添加商品大框确定
            AddProductVisibleHandler(){
                    this.AddProductVisible = false
                     if(this.goodsId){  
                        // 预更新修改接口
                        this.$api.getupdateTbItem({
                            id:this.goodsId,
                            title:this.product.title,
                            sellPoint:this.product.sellPoint,
                            price:this.product.price,
                            num:this.product.num,
                            cid: this.currentCategory.cid,//类目id
                            desc:this.UeditorData,//富文本
                            image: this.uploadObj.name  //上传图片
                             
                        }).then(res=>{
                            console.log(res.data);
                            if(res.data.status===200){
                                this.http()
                            }
                        })

                     }else{
                          this.$api.getInsertTbItem({
                        title:this.product.title,
                        sellPoint:this.product.sellPoint,
                        price:this.product.price,
                        num:this.product.num,
                        cid: this.currentCategory.cid,//类目id
                        desc:this.UeditorData,//富文本
                        image: this.uploadObj.name  //上传图片
                    }).then(res=>{
                        console.log(111);    
                        console.log(res); 
                        if(res.data.status===200){
                            // 刷新首页添加后列表
                            this.http()
                        }else{
                            alert(res.data.msg)
                        }    
                    })

                     }
                   
            },
            getUeditorData(value){
                console.log(value);
                this.UeditorData=value
                    
            },
            loadTreeNodes(node,resolve){
                 this.currentCategory = node.data
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
             // tree点击事件
        handleNodeClick(data) {
            // console.log(data);
        },
        getUpLoad(data){
        //     console.log(1);  
        //   console.log(data);
          this.uploadObj=data
        },
        // 删除
        handleDelete(index,row){
            console.log(row);
             this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                        }).then(() => {
                             this.$api.getdeleteItemById({
                                    itemId:row.id
                                }).then(res=>{
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
                        
                        }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                        });
    
           
        
        }
        },



    }
</script>

<style scoped>
.product-list {
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
}
.upload-img {
    width: 200px;
    float: left;
    margin-left: 10px;
}
</style>