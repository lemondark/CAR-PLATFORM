# PlatformWeb
XXXX业务平台前端

## 前提条件
- [Git 1.9+](http://git-scm.com/downloads)
- [nvm 1.1+](https://github.com/creationix/nvm)

### 前提条件 - 环境配置
执行以下命令,确认版本符合前提条件中指定的要求
```SHELL
git --version
nvm version
```

### 前提条件 - node
从 http://coreybutler.github.io/nodedistro/ 查询可供使用的node版本(建议使用node 7.2+)
执行以下命令配置node环境
```SHELL
nvm install 7.2.1
nvm use 7.2.1
nvm on
```

### 前提条件 - 依赖组件
执行以下命令安装依赖组件
```SHELL
npm install
```
提示: 在中国内地可以使用--registry参数来指定taobao的镜像来执行npm组件的安装
```SHELL
npm install --registry=http://registry.npm.taobao.org
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 技术栈
    vue2 + vuex + vue-router + axios + es6 + sass
## 目录结构
```
webpack
 |---build
 |---config
 |---src
     |---components  #组件
         |---alarmDetail      #报警详情组件
         |---common           #全局公共组件
         |---header           #头部组件
         |---monitorModal     #实时监控/实时定位组件
         |---sidebar          #侧边菜单栏组件
         |---switch           #switch组件
         |---thermometer      #温度计组件
     |---images      #图标文件
     |---js          #全局公共libs
         |---core       #全局公共libs
             |---directives    #全局指令配置   调用方法 略
             |---filters       #全局过滤配置   调用方法 略
             |---utils         #全局libs配置   调用方法 同常量
                 |---assist.js              #为newIcon提供方法
                 |---fixAMAP09.js           #高德地图轨迹纠偏
                 |---popper.js              #为newIcon提供方法
                 |---tool.js                #全局tool配置   调用方法 Vue(this)._hyTool[名称]
             |---index.js      #libs对外api
         |---libs       #库
             |---checkValue.js              #表单验证库
         |---mixins     #公共混合类
             |---special              #特殊混合类
                 |---org.js               #组织树形结构  当前仅供用户管理使用
             |---button.js            #按钮权限验证混合类
             |---date.js              #日期混合类
             |---dictionary.js        #常用方法字典混合类
             |---list.js              #列表混合类
     |---page        #主view
         |---404          #404页面
         |---login        #登录页面
         |---main         #主要模块页面
         |---print        #打印页面
     |---router      #路由文件
     |---service     #服务文件
     |---store       #vuex
     |---styles      #sass文件
         |---my-theme       #iview自定义文件
         |---theme          #elementUI主题文件
         |---common.scss    #公共文件
         |---mixins.scss    #scss混合文件
         |---vars.scss      #scss变量文件
     |---App.vue
     |---main.js
 |---static          #静态资源
     |---fonts
     |---images
     |---model           #导出模板
     |---style
......

  ```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
