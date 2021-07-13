<template>
  <div class="page">
    <div class="editor-box"><Editor /></div>
    <div class="preview-box">
      <Preview />
    </div>
  </div>
</template>

<script>
import "vite-plugin-vue-docs/dist/template/style.css";
import Editor from "./components/Editor.vue";
import Preview from "./components/Preview.vue";

export default {
  components: { Editor, Preview },
};
</script>

<style>
*::-webkit-scrollbar {
  scrollbar-width: none;
  display: none;
}

.page {
  overflow: hidden;
  height: 100vh;
  width: 100%;
  display: flex;
}

.editor-box {
  width: 35%;
  flex-shrink: 0;
}

.editor-box .CodeMirror {
  font-size: 18px;
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
}

.preview-box {
  flex: 1;
  background-color: #fff;
}
</style>
