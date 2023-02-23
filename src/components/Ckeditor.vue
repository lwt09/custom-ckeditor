<template>
  <div
    id="ckedit-container"
    @mouseover="onMouseover"
    :style="{ width: editorWidth || '50%' }"
  >
    <textarea v-html="modelValue" ref="ckeditorRef"></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

defineProps<{
  modelValue?: string;
  editorWidth?: string;
}>();
const emit = defineEmits(["update:modelValue"]);

/*********************** 初始化ck **************************/
// 引入外部插件全局(未引入到实例)
const plugins = ["pastebase64", "image"];
const version = "0.4.164";
plugins.forEach((name) => {
  window.CKEDITOR.plugins.addExternal(
    name,
    `http://stable-static.hexinedu.com/static/ckeditor_plugins/${version}/${name}/plugin.js`
  );
});
const localPlugins = ["test_widget_box", "test_normal_style"];
localPlugins.forEach((name) => {
  window.CKEDITOR.plugins.addExternal(name, `/plugins/${name}/plugin.js`);
});

const ckeditorRef = ref(null);
let ckedit = ref();
onMounted(() => {
  ckedit.value = window.CKEDITOR.replace(ckeditorRef.value, {
    toolbarGroups: [
      { name: "clipboard", groups: ["clipboard", "undo"] },
      {
        name: "editing",
        groups: ["find", "selection", "spellchecker", "editing"],
      },
      { name: "links", groups: ["links"] },
      { name: "insert", groups: ["insert"] },
      { name: "forms", groups: ["forms"] },
      { name: "tools", groups: ["tools"] },
      { name: "document", groups: ["mode", "document", "doctools"] },
      { name: "others", groups: ["others"] },
      { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
      {
        name: "paragraph",
        groups: ["list", "indent", "blocks", "align", "bidi", "paragraph"],
      },
      { name: "styles", groups: ["styles"] },
      { name: "colors", groups: ["colors"] },
      { name: "about", groups: ["about"] },
      // 有 name 就会自动在 groups 里面加入 nameValue , 其他 groups 通过 ui.button 时候选定的group名来筛选，name 只单独做分组用
      { name: "test_widget_box", groups: ["test_widget_box"] },
      { name: "test_normal_style" },
    ],
    removeButtons:
      "Subscript,Superscript,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Scayt,Link,Unlink,Anchor,HorizontalRule,SpecialChar,Table,NumberedList,Blockquote,About",
    extraPlugins: "image2,test_widget_box,divarea,test_normal_style",

    // 允许什么样的内容进入编辑器 html (true 时为所有内容都可以)
    allowedContent: true,
    // disallowedContent: "iframe",

    resize_enabled: false,
  });
  ckedit.value.on("change", onChangeEditorData);
});
function onChangeEditorData() {
  let data = ckedit.value.getData();
  data = out(data);
  console.log(data);
  emit("update:modelValue", data);
}

function out(html: string) {
  // 去掉零宽字符 原本用来防止粘连
  return html.replace("\u200b", "");
}
function onMouseover() {}
</script>

<style lang="scss">
// ckeditor 内css样式匹配 不能开 scoped
.no-icon {
  .cke_button_icon {
    display: none;
  }

  .cke_button_label {
    display: inline;
    padding: 0 1.45px;

    + .cke_button_label {
      display: none;
    }
  }
}

// replace(iframe)模式下要开divarea才能匹配到
#ckedit-container {
  height: 100%;
  // .cke {
  //   height: 100%;
  //   .cke_inner {
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;

  //     .cke_contents {
  //       flex: 1;
  //       height: initial !important;
  //     }
  //   }
  // }
  .cke {
    .cke_top,
    .cke_bottom {
      padding: 3px 4px 1px;
    }

    .cke_toolgroup {
      margin: 1px 1px 2px 0;
    }
    .cke_contents {
      padding: 2px;
      line-height: 1.2;
    }
  }
  span[data-label="test_widget_box"] {
    color: red;
    background-color: pink;
  }

  span[data-label="test_normal_style"] {
    color: lightblue;
  }
}
// 展示末尾换行
#ckedit-container p {
  &:after {
    content: "¶";
    color: #ccc;
  }
  br {
    display: none;
  }
}
</style>
