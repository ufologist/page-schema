{
    // https://baidu.github.io/amis/docs/sdk
    "type": "page",
    "title": "自定义组件示例",
    "body": {
        "type": "form",
        "mode": "horizontal",
        "initApi": "https://houtai.baidu.com/api/mock2/page/initData",
        "controls": [
            {
                "type": "static",
                "label": "日期",
                "name": "date"
            },
            {
                "name": "title",
                "children": ({
                    value,
                    onChange
                }) => (
                    <div class="a-Form-item a-Form-item--horizontal">
                        <label class="a-Form-label a-Form-itemColumn--2">字段</label>
                        <div class="a-Form-value">
                            <div class="form-control-static">
                                <div class="a-Form-control">
                                    <span class="a-TplField">{value}</span>
                                    <a className="btn btn-link btn-xs" onClick={(event) => {
                                        event.target.parentNode.removeChild(event.target);
                                        onChange(Math.round(Math.random() * 10000));
                                    }}>查看</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        ]
    }
}