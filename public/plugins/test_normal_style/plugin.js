// https://ckeditor.com/docs/ckeditor4/latest/guide/widget_sdk_tutorial_1.html

(function (CKEDITOR) {
  const pluginName = "test_normal_style";

  CKEDITOR.plugins.add(pluginName, {
    // 自动去找lang/zh-cn.js
    lang: "zh-cn",

    init: function (editor) {
      function insert(editor, html) {
        html = `<span data-label="${pluginName}">${html}</span>\u200b`;
        editor.insertHtml(html);
      }

      // 拿到要用的lang
      const lang = editor.lang[pluginName];

      var style = new CKEDITOR.style({
        element: "span",
        attributes: {
          "data-label": pluginName,
        },
      });

      //  定义 commond
      editor.addCommand(pluginName, {
        exec: function (editor) {
          var state = this.state;
          if (state === CKEDITOR.TRISTATE_OFF) {
            const html = editor.getSelectedHtml().getHtml() || "&nbsp; &nbsp; ";
            insert(editor, html);
          }
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

      editor.attachStyleStateChange(style, function (state) {
        !editor.readOnly && editor.getCommand(pluginName).setState(state);
      });
    },
  });
})(window.CKEDITOR);
