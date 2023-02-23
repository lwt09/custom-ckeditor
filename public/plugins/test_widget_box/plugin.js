// https://ckeditor.com/docs/ckeditor4/latest/guide/widget_sdk_tutorial_1.html

(function (CKEDITOR) {
  const pluginName = "test_widget_box";

  CKEDITOR.plugins.add(pluginName, {
    requires: "widget",

    // 自动去找lang/zh-cn.js
    lang: "zh-cn",

    init: function (editor) {
      function insert(editor, html) {
        html = `<span data-label="${pluginName}">${html}</span>`;
        editor.insertHtml(html);
      }

      // 拿到要用的lang
      const lang = editor.lang[pluginName];

      // 让其变成(不可拆分)的小部件
      editor.widgets.add(pluginName, {
        // 优先 ui.button 和
        // button: "Create a test_widget_box box",

        draggable: false,

        // 判断这个是不是小部件
        upcast: function (element) {
          return (
            element.name == "span" &&
            element.attributes["data-label"] === pluginName
          );
        },
        insert: function () {
          const html = editor.getSelectedHtml().getHtml() || "&nbsp; &nbsp; ";
          insert(editor, html);
        },
      });

      //  定义按钮
      editor.ui.addButton(pluginName, {
        // 这个 label 本来是用来hover时候显示的。 开 no-icon 加样式 让其没有icon也显示
        label: lang[pluginName],
        className: "no-icon",
        toolbar: pluginName,
        command: pluginName,
      });
    },
  });
})(window.CKEDITOR);
