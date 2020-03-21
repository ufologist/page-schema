{
  // https://baidu.github.io/amis/docs/sdk
  "type": "page",
  "title": "自定义组件示例",
  "body": {
    "type": "form",
    "controls": [{
      "type": "text",
      "label": "用户名",
      "name": "usename"
    }, {
      "name": "a",
      "children": function children(_ref) {
        var value = _ref.value,
            onChange = _ref.onChange;
        return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "\u8FD9\u4E2A\u662F\u4E2A\u81EA\u5B9A\u4E49\u7EC4\u4EF6"), /*#__PURE__*/React.createElement("p", null, "\u5F53\u524D\u503C\uFF1A", value), /*#__PURE__*/React.createElement("a", {
          className: "btn btn-default",
          onClick: function onClick() {
            return onChange(Math.round(Math.random() * 10000));
          }
        }, "\u968F\u673A\u4FEE\u6539"));
      }
    }]
  }
}