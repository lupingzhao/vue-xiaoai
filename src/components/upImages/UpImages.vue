<template>
  <div class="box">
    <div class="head">支持拖拽</div>
    <div class="title">Element自带的上传组件</div>
    <div class="about--image">
      <el-upload
        class="upload-demo"
        drag
        action="/api/upload"
        multiple
        list-type="picture"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <div class="head1">支持剪裁</div>
    <div class="title1">vue- image-crop-upload</div>
    <div class="btn">
      <el-button type="primary" @click="toggleShow">上传</el-button>
      <div>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          field="file"
          :noRotate="false"
          url="/api/upload"
        ></my-upload>
        <div class="m-t-10">
          <img :src="imgDataUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "babel-polyfill";
import myUpload from "vue-image-crop-upload/upload-2.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      // noRotate控制是否能旋转
      imgDataUrl: "", //接收剪切后的图片
      avatar: "", //用于存储剪切完图片的base64Data和显示回调图片
      show: false, //剪切框显示和隐藏的flag
      size: 2.1,
    };
  },
  components: { "my-upload": myUpload },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      this.imgDataUrl = imgDataUrl;
      console.log("-------- crop success --------", imgDataUrl, field);
    },
    //上传成功回调
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");

      console.log(jsonData);
      console.log("field: " + field);
    },
    //上传失败回调
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log("上传失败状态" + status);
      console.log("field: " + field);
    },
  },

  mounted() {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
.box {
  background-color: white;
  padding: 20px;
  .head {
    font-size: 20px;
    margin-bottom: 10px;
  }
  .title {
    padding: 10px;
    background-color: rgb(238, 238, 238);
    margin-bottom: 10px;
  }
  .head1 {
    font-size: 20px;
    margin: 15px 0;
  }
  .title1 {
    padding: 10px;
    background-color: rgb(238, 238, 238);
    margin-bottom: 10px;
  }
  .btn {
    margin-top: 15px;
  }
}
</style>