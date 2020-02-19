<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:3300/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="uploadHandle"
            :limit="1"
            :file-list="fileList"
            :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name:'ProductUpLoad',
        data() {
            return {
                 fileList: []
            }
        },
         methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadHandle(response,file,fileList){
                console.log(response);  
                this.$emit('sendUpLoad',response)

            }
    }

    }
</script>

<style scoped>

</style>