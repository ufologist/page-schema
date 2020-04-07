{
  // https://baidu.github.io/amis/docs/sdk
  "type": "page",
  "title": "自定义组件示例",
  "body": {
    "type": "form",
    "mode": "horizontal",
    "initApi": "https://houtai.baidu.com/api/mock2/page/initData",
    "controls": [{
      "type": "static",
      "label": "日期",
      "name": "date"
    }, {
      "name": "title",
      "children": function children(_ref) {
        var value = _ref.value,
            onChange = _ref.onChange;
        return /*#__PURE__*/React.createElement("div", {
          "class": "a-Form-item a-Form-item--horizontal"
        }, /*#__PURE__*/React.createElement("label", {
          "class": "a-Form-label a-Form-itemColumn--2"
        }, "\u5B57\u6BB5"), /*#__PURE__*/React.createElement("div", {
          "class": "a-Form-value"
        }, /*#__PURE__*/React.createElement("div", {
          "class": "form-control-static"
        }, /*#__PURE__*/React.createElement("div", {
          "class": "a-Form-control"
        }, /*#__PURE__*/React.createElement("span", {
          "class": "a-TplField"
        }, value), /*#__PURE__*/React.createElement("a", {
          className: "btn btn-link btn-xs",
          onClick: function onClick(event) {
            event.target.parentNode.removeChild(event.target);
            onChange(Math.round(Math.random() * 10000));
          }
        }, "\u67E5\u770B")))));
      }
    }]
  }
}