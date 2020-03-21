{
  // https://fex-team.github.io/amis-admin/admin/form/basic
  // https://github.com/fex-team/amis-admin/blob/547307e391c383c5923cc378989493fcf49201a5/routes/admin/form/Basic.tsx
  type: 'page',
  title: '基础表单',
  subTitle: '展示一些常规的表单，包括验证、提示等等',
  body: [{
    type: 'form',
    mode: 'horizontal',
    title: '常规表单示例',
    affixFooter: true,
    api: '/api/form/save',
    actions: [{
      label: '保存',
      type: 'submit',
      level: 'success'
    }],
    controls: [{
      label: ' 标题',
      type: 'text',
      placeholder: '请输入标题',
      description: '请输入一个能吸引眼球的标题',
      name: 'title',
      size: 'md'
    }, {
      label: '编号',
      required: true,
      type: 'text',
      placeholder: '请输入编号',
      name: 'b',
      size: 'md',
      validations: {
        matchRegexp: '/^\\w{4}-\\w{4}-\\w{4}$/'
      },
      validationErrors: {
        matchRegexp: '您输入的内容格式不对，请按提示输入！'
      },
      hint: '输入范例：xxxx-xxxx-xxxx'
    }, {
      label: '置顶',
      type: 'switch',
      name: 'c',
      inline: true,
      labelRemark: '开启后将置顶这条数据！'
    }, {
      label: '活动时间',
      type: 'date-range',
      name: 'range',
      size: 'md',
      remark: '这是一个字段时间范围'
    }, {
      label: '日期范围',
      type: 'group',
      controls: [{
        type: 'date',
        size: 'md',
        name: 'start',
        mode: 'inline',
        maxDate: '${end}'
      }, {
        label: '到',
        type: 'date',
        size: 'md',
        name: 'end',
        inputClassName: 'm-l-sm',
        mode: 'inline',
        minDate: '${start}',
        remark: '这是两个字段的时间范围'
      }]
    }, {
      label: '浏览器',
      type: 'button-group',
      name: 'browser',
      value: 'chrome',
      options: [{
        label: 'Chrome',
        value: 'chrome'
      }, {
        label: '火狐',
        value: 'firefox'
      }, {
        label: 'IE',
        value: 'ie'
      }]
    }, {
      type: "list",
      name: "taocan",
      label: "套餐选择",
      options: [{
        value: 1,
        body: "<div class=\"m-l-sm m-r-sm m-b-sm m-t-xs\">\n                                <div class=\"text-md p-b-xs b-b m-b-xs\">\u5957\u9910\uFF1AC01</div>\n                                <div class=\"text-sm\">CPU\uFF1A22\u6838</div>\n                                <div class=\"text-sm\">\u5185\u5B58\uFF1A10GB</div>\n                                <div class=\"text-sm\">SSD\u76D8\uFF1A1024GB</div>\n                            </div>"
      }, {
        value: 2,
        body: "<div class=\"m-l-sm m-r-sm  m-b-sm m-t-xs\">\n                            <div class=\"text-md p-b-xs b-b m-b-xs\">\u5957\u9910\uFF1AC02</div>\n                            <div class=\"text-sm\">CPU\uFF1A23\u6838</div>\n                            <div class=\"text-sm\">\u5185\u5B58\uFF1A11GB</div>\n                            <div class=\"text-sm\">SSD\u76D8\uFF1A1025GB</div>\n                            </div>"
      }, {
        value: 3,
        disabled: true,
        body: "<div class=\"m-l-sm m-r-sm  m-b-sm m-t-xs\">\n                            <div class=\"text-md p-b-xs b-b m-b-xs\">\u5957\u9910\uFF1AC03</div>\n                            <div class=\"text-sm\">CPU\uFF1A24\u6838</div>\n                            <div class=\"text-sm\">\u5185\u5B58\uFF1A12GB</div>\n                            <div class=\"text-sm\">SSD\u76D8\uFF1A1026GB</div>\n                            </div>"
      }]
    }, {
      label: '最爱周几',
      type: 'select',
      name: 'select',
      size: 'md',
      clearable: true,
      options: [{
        label: '周一',
        value: '0'
      }, {
        label: '周二',
        value: '1'
      }, {
        label: '周三',
        value: '2'
      }, {
        label: '周四',
        value: '3'
      }, {
        label: '周五',
        value: '4'
      }, {
        label: '周六',
        value: '5'
      }, {
        label: '周日',
        value: '6'
      }]
    }, {
      label: '休息日',
      type: 'list',
      name: 'freeday',
      value: ['5', '6'],
      multiple: true,
      extractValue: true,
      options: [{
        label: '周一',
        value: '0'
      }, {
        label: '周二',
        value: '1'
      }, {
        label: '周三',
        value: '2'
      }, {
        label: '周四',
        value: '3'
      }, {
        label: '周五',
        value: '4'
      }, {
        label: '周六',
        value: '5'
      }, {
        label: '周日',
        value: '6'
      }]
    }, {
      label: '人数',
      type: 'number',
      name: 'num',
      size: 'md',
      value: 10
    }, {
      label: '比率',
      type: 'range',
      name: 'percent'
    }, {
      label: '简介',
      type: 'textarea',
      name: 'textarea'
    }]
  }]
}