<template>
  <textarea ref="editor"></textarea>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";
import { debounce } from "throttle-debounce";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/vue/vue";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/monokai.css";

import templateCode from "../template";

export default {
  name: "Editor",
  data() {
    return {
      mirror: "",
    };
  },

  mounted() {
    this.mirror = CodeMirror.fromTextArea(this.$refs.editor, {
      value: "",
      mode: "vue",
      theme: "monokai",
      tabSize: 4,
      lineNumbers: true,
      styleActiveLine: true,
      autofocus: true,
      matchBrackets: true,
      lineWrapping: true,
    });

    this.mirror.setValue(templateCode);

    this.mirror.on("change", (code) => {
      debounceFunc(code.getValue());
    });

    const debounceFunc = debounce(300, (code) => {
      const a = transformMain(code, [], "");
      console.log(a);
    });
  },
};
</script>
