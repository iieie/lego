<template>
  <div class="content_box">
    <div class="content_left">
      <el-tree
        :load="loadTreeNodes"
        :props="defaultProps"
        lazy
        highlight-current
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <el-dialog width="30%" title="添加内容" :visible.sync="contentVisible">
      <el-input v-model="goodsName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="contentVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureHandler">确定</el-button>
      </span>
    </el-dialog>
    <!-- 修改卡片 -->
     <el-dialog width="30%" title="修改内容" :visible.sync="updateContentVisible">
      <el-input v-model="updateName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateContentVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSureHandler">确定</el-button>
      </span>
    </el-dialog>
    <div class="content_right">
        <Content :nodePid="nodePid"/>
        </div>
  </div>
</template>

<script>
import Content from '../Content'
export default {
  name: "Category",
  inject: ["reload"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      contentVisible: false,
      updateContentVisible:false,
      goodsName: "",
      updateName:'',
      appendInfo: {},
      updateInfo: {},
      nodePid:{}

    };
  },
  components: {
      Content,
  },
  methods: {
    //  懒加载事件
    loadTreeNodes(node, resolve) {
      if (node.level === 0) {
        this.$api
          .getselectContentCategoryByParentId()
          .then(res => {
            resolve(res.data.data);
          })
          .catch(err => {
            resolve([]);
          });
      }
      if (node.level >= 1) {
        this.$api
          .getselectContentCategoryByParentId({
            id: node.data.pid
          })
          .then(res => {
            resolve(res.data.data);
          })
          .catch(err => {
            resolve([]);
          });
      }
    },
    handleNodeClick(node) {
        console.log(node);
        this.nodePid=node
    },
    sureHandler() {
      //  console.log('确定添加');
      this.$api
        .getinsertContentCategory({
          pid: this.appendInfo.pid,
          name: this.goodsName
        })
        .then(res => {
          this.contentVisible = false;
          this.$message({
            type: "success",
            message: "添加成功！"
          });

          /**
           * 因为添加这里需要重新刷新  这里用熬provide inject
           *  */

          this.reload();
          //  console.log(res.data);
        });
    },
    append(data) {
      this.goodsName = "";
      console.log(data);
      this.appendInfo = data;
      this.contentVisible = true;
    },
    /**
     * 删除
     */
    remove(node, data) {
        console.log(data);
        
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
            this.$api.getdeleteContentCategoryById({
                id:data.pid
            }).then(res=>{
                console.log(res.data);
                if(res.data.status===200){
                    /**强制刷新*/
                    this.reload();
                    this.$message({
                    type: "success",
                    message: "删除成功!"
                });
                }
            })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
     /**
     * 修改
     */
    update(node, data) {
        console.log(data);
        this.updateContentVisible=true;
        this.updateInfo=data;
       
    },
    //  确定修改接口
    updateSureHandler(){
        this.updateContentVisible=false;

         this.$api.getupdateContentCategory({
            id:this.updateInfo.pid,
            name:this.updateName
        }).then(res=>{
            this.reload();
            this.$message({
                type:'success',
                message:'修改成功！'
            })
            console.log(res.data);
            
        })

    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
            <el-button
              style="font-size: 12px;"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修改
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>

<style scoped>
.content_box {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
}
.content_box > div {
  float: left;
}
.content_left {
  width: 20%;
}
.content_right{
    width: 60%;
}
</style>