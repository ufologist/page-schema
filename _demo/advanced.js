{
  // https://fex-team.github.io/amis-admin/admin/form/basic/advanced
  // https://github.com/fex-team/amis-admin/blob/547307e391c383c5923cc378989493fcf49201a5/routes/admin/form/Advanced.tsx
  type: 'page',
  title: '复杂表单',
  subTitle: '展示表格编辑、联动等等',
  body: [{
    type: 'form',
    mode: 'horizontal',
    title: '',
    affixFooter: true,
    api: '/api/form/save',
    actions: [{
      label: '保存',
      type: 'submit',
      level: 'success'
    }],
    controls: [{
      type: 'fieldSet',
      title: '基本配置',
      controls: [{
        type: 'text',
        label: '任务名称',
        name: 'title',
        size: 'md',
        required: true
      }, {
        type: 'textarea',
        label: '任务描述',
        name: 'description',
        size: 'md'
      }, {
        label: '任务频率',
        type: 'radios',
        name: 'repeat',
        inline: true,
        value: 'none',
        required: true,
        options: [{
          label: '不重复',
          value: 'none'
        }, {
          label: '每天',
          value: 'day'
        }, {
          label: '每周',
          value: 'week'
        }, {
          label: '每月',
          value: 'month'
        }]
      }, {
        label: '每天几点',
        type: 'select',
        name: 'time',
        multiple: true,
        required: true,
        extractValue: true,
        visibleOn: 'this.repeat == "day"',
        inline: true,
        options: Array.from({
          length: 24
        }, function (v, index) {
          return {
            value: index,
            label: "".concat(index, ":00")
          };
        })
      }, {
        label: '每周几执行',
        type: 'button-group',
        name: 'weekdays',
        size: 'md',
        visibleOn: 'this.repeat == "week"',
        clearable: true,
        multiple: true,
        required: true,
        extractValue: true,
        maxLength: 7,
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
        label: '每月几号执行',
        type: 'list',
        name: 'monthday',
        size: 'md',
        visibleOn: 'this.repeat == "month"',
        required: true,
        maxLength: 31,
        clearable: true,
        multiple: true,
        extractValue: true,
        options: Array.from({
          length: 31
        }, function (v, index) {
          return {
            value: index,
            label: "".concat(((index + 1) / 100).toFixed(2)).substr(-2)
          };
        })
      }]
    }, {
      type: 'fieldSet',
      title: '其他信息',
      collapsable: true,
      controls: [{
        label: '新增一行',
        type: 'button',
        actionType: 'add',
        target: 'thetable',
        level: 'info'
      }, {
        name: 'thetable',
        type: 'table',
        label: '任务参数',
        editable: true,
        addable: true,
        removable: true,
        columns: [{
          label: '参数名',
          name: 'key',
          quickEdit: true
        }, {
          label: '参数值',
          name: 'value',
          quickEdit: true
        }]
      }]
    }]
  }]
}