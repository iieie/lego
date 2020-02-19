<template>
  <div class="CONTENT_BOX">
    <el-button v-show="addBtnFlag" @click="addContentHandler" type="primary">添加{{nodePid.name}}</el-button>
    <el-dialog
      title="添加商品内容"
      :visible.sync="addContentVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="110px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品url地址">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="商品图片地址">
          <el-input v-model="form.image"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addContentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addContentSureHandler">确 定</el-button>
      </span>
    </el-dialog>

    <el-table :data="contentData" style="width:100%">
      <el-table-column show-overflow-tooltip prop="id" label="ID"></el-table-column>
      <el-table-column show-overflow-tooltip prop="name" label="标题"></el-table-column>
      <el-table-column show-overflow-tooltip prop="url" label="URL地址"></el-table-column>
      <el-table-column show-overflow-tooltip prop="image" label="图片地址"></el-table-column>
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Content",
  data() {
    return {
      contentData: [],
      addBtnFlag: false,
      addContentVisible: false,
      form: {}
    };
  },
  inject: ["reload"],
  props: {
    nodePid: {
      type: Object,
      required: true
    }
  },
  /**监听的是响应的数据，对应属性值发生变化时，触发*/
  watch: {
    nodePid(value, oldValue) {
      console.log(value);
      this.addBtnFlag = true;
      /**内容查询结果*/
     this.http()
    }
  },
  methods: {
    // 添加商品分类
    addContentHandler() {
      console.log("添加");
      this.addContentVisible = true;
      this.form={}
    },
    handleClose() {
      this.addContentVisible = false;
    },
    // 删除
    handleDelete(index,row){
      console.log(row);
      this.$api.getdeleteContentByIds({
          id:row.id
      }).then(res=>{
          console.log(res.data);
          if(res.data.status===200){
              this.$message({
                  type:'success',
                  message:'删除成功'
              })
              this.http()

          }else{
               this.$message({
                  type:'error',
                  message:'删除失败'
              })

          }
      })
    },
    // 确定
    addContentSureHandler() {
      this.$api
        .getinsertTbContent({
          pid: this.nodePid.pid,
          name: this.form.name,
          url: this.form.url,
          image: this.form.image
        })
        .then(res => {
          console.log(res.data);
          if (res.data.status === 200) {
            this.addContentVisible = false;
            // 强刷
            // this.reload()  
            this.http()
            this.$message({
                type:'success',
                info:'添加成功'
            })
          }
        });
    },
    http(){
         /**内容查询结果*/
            this.$api
              .getselectTbContentAllByCategoryId({
                id: this.nodePid.pid
              })
              .then(res => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.contentData = res.data.data;
                } else {
                  this.contentData = [];
                }
              });
    }
  }
};
</script>

<style scoped>
.CONTENT_BOX {
  /* text-align: center; */

  margin-left: 20px;
}
</style>