{
    // https://baidu.github.io/amis/docs/sdk
    "type": "page",
    "title": "自定义组件示例",
    "body": {
        "type": "form",
        "controls": [
            {
                "type": "text",
                "label": "用户名",
                "name": "usename"
            },
            {
                "name": "a",
                "children": ({
                    value,
                    onChange
                }) => (
                    <div>
                        <p>这个是个自定义组件</p>
                        <p>当前值：{value}</p>
                        <a className="btn btn-default" onClick={() => onChange(Math.round(Math.random() * 10000))}>随机修改</a>
                    </div>
                )
            }
        ]
    }
}