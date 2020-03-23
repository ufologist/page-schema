# 基于 AMis 配置化的页面

[![Build Status][ci-status-image]][ci-status-url] [![Known Vulnerabilities][vulnerabilities-status-image]][vulnerabilities-status-url] [![changelog][changelog-image]][changelog-url] [![license][license-image]][license-url]

[vulnerabilities-status-image]: https://snyk.io/test/npm/page-schema/badge.svg
[vulnerabilities-status-url]: https://snyk.io/test/npm/page-schema
[ci-status-image]: https://travis-ci.com/ufologist/page-schema.svg?branch=master
[ci-status-url]: https://travis-ci.com/ufologist/page-schema
[license-image]: https://img.shields.io/github/license/ufologist/page-schema.svg
[license-url]: https://github.com/ufologist/page-schema/blob/master/LICENSE
[changelog-image]: https://img.shields.io/badge/CHANGE-LOG-blue.svg?style=flat-square
[changelog-url]: https://github.com/ufologist/page-schema/blob/master/CHANGELOG.md

本仓库用于存放基于 [AMis](https://github.com/baidu/amis) 配置出来的页面的配置文件, 例如 [advanced.js](./src/_demo/advanced.js), 主要是为了服务于[配页坊项目: page-schema-player](https://github.com/ufologist/page-schema-player)

## Playground

[Playground](https://ufologist.github.io/page-schema/_demo/index.html)

![page-schema-playground](https://user-images.githubusercontent.com/167221/77224470-ef2f1100-6ba0-11ea-8506-358c6c30e357.gif)

## 快速开始

* clone `page-schema` 项目以存放要配置的页面的配置文件

  ```
  git clone https://github.com/ufologist/page-schema.git
  ```
* 启动 `page-schema` 项目

  ```
  npm install
  npm start
  ```

  例如: `http://localhost:8000`
* 打开位于 `src` 目录下某个页面的配置文件的 URL

  例如: `http://localhost:8000/_demo/crud-load-once.json`
* 将这个页面配置文件的 URL 作为 `page-schema-player` 页面 URL 的 `_schema` 参数的值

  例如
  ```
  https://localhost:8080/index.html?_schema=http://localhost:8000/_demo/crud-load-once.json
  ---------------------------------         -----------------------------------------------
                  ↓                                                ↓
    page-schema-player 页面的 URL                            页面配置文件的 URL
  ```

  了解更多关于 [page-schema-player](https://github.com/ufologist/page-schema-player)

## 如何配置出一个页面

* 在 `src` 目录下新建一个页面的配置文件(1 个页面对应 1 个配置文件)
  * 建议 `src` 下面的目录按照项目来划分文件夹
  * 例如 `src/abc-admin` 即 abc 后台的页面都放在这一个文件夹下面, 并编写 `README.md` 说明一下
* 配置文件可以是 `.json` 或者 `.js` 后缀, 具体如何配置请参考 [AMis 实用手册](https://github.com/ufologist/page-schema-player/blob/master/amis-cookbook.md)
* 在开发阶段, 配置文件会由开发服务器 [svrx](https://github.com/svrxjs/svrx) 实时地做 `babel` 的转义, 主要是为了可以[无需注册就能够灵活地自定义组件](https://baidu.github.io/amis/docs/sdk#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6), `即：通过 children 实现一个自定义渲染方法，返回 React.ReactNode 节点`, 具体可以参考 [children.js](./src/_demo/children.js)

## 环境配置

在企业开发中, 为了隔离线上和线下, 开发过程中会涉及到多套服务器环境, 例如 dev/test/stage/production 这么几套环境

为了能够在页面的配置文件中清晰的定义和使用多套环境, 我们通过 `definitions.env` 来集中定义环境模式和相应的环境配置, 具体配置请参考 [_demo/definitions-env.json](https://ufologist.github.io/page-schema-player/index.html?_schema=https://ufologist.github.io/page-schema/_demo/definitions-env.json)

`page-schema-player` 会根据 [get-default-mode.ts](https://github.com/ufologist/page-schema-player/blob/master/src/ext/get-default-mode.ts) 自动识别使用哪一个环境模式, 但可以通过在 URL 参数 `_mode` 来指定一个环境模式, 例如指定使用 `stage` 环境模式: [https://ufologist.github.io/page-schema-player/index.html?_schema=https://ufologist.github.io/page-schema/_demo/definitions-env.json&_mode=stage](https://ufologist.github.io/page-schema-player/index.html?_schema=https://ufologist.github.io/page-schema/_demo/definitions-env.json&_mode=stage)

## 构建部署

```
npm run build
```

基于 [gulp](https://gulpjs.com/) 构建, 主要是将所有的页面配置文件做了一次 `babel` 转义, 这样在 `page-schema-player` 中就无需通过 [`@babel/standalone`](https://babeljs.io/docs/en/babel-standalone) 在浏览器环境下做 `babel` 转义了(`@babel/standalone@7.9.1` min 文件都有 1.5M)

最终你只需要将 `dist` 目录下的所有文件部署到服务器上就可以了, 例如做为静态资源上传到阿里云 OSS.

## 注意事项

* Playground 即 [src/_demo/index.html](./src/_demo/index.html) 默认嵌入的是相对路径下的 `/page-schema-player/index.html`, 需要你根据自己的项目情况做出调整, 由于是通过 [Blob URL](https://developer.mozilla.org/en-US/docs/Web/API/Blob#JavaScript) 实现的实时预览功能, 因此 `page-schema` 和 `page-schema-player` 不能出现跨域