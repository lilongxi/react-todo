### 大家好这是一个基于react和mobx构建的todolist
>简单的使用了react做SPA的组件化开发。mobx是一个数据流向管理框架，个人感觉比redux容易上手。页面美化ant-design，http请求使用axios做了二次封装，数据mock.js，工具包lodash，时间处理moment.js，css用sass编译。

![](http://okdlc4nlk.bkt.clouddn.com/mobx-todo/gif/mobx.gif)

#### 关于mobx
了解redux后，感觉学习曲线比较陡峭。于是转向mobx这个数据流向管理框架。<br/>
[mobx是什么:中文文档在此，英文文档百度吧！](http://cn.mobx.js.org/intro/concepts.html)<br/>
首先介绍一下mobx如何结合create-react-app一起使用。我是比较喜欢用create-react-app这个命令初始化react项目的，毕竟是渣渣的世界！<br/>
使用mobx必须去定义观察者（react组件）和被观察者（需要渲染，改变的数据），它提供了两种定义的方法es5和es7的修饰器（@）。<br/>
那么问题来了，react官方文档介绍，create-react-app还不支持es7的语法，因为还没有定稿，所以我介绍两种可以支持修饰器的方法。可以让我们使用mobx为所欲为！
##### 方法一
当我们使用create-react-app初始化好一个项目的时候，我们可以用npm run eject把项目的配置文件暴露出来，然后在终端对应文件目录下安装如下模块。<br/>
<code>babel-plugin-transform-decorators-legacy，babel-preset-es2015，babel-preset-react-app，babel-preset-stage-1</code><br />
然后在package.json中配置babel,然后重启项目这个时候修饰器就可以使用了。但是太麻烦了是不是，这可不是渣渣的世界，看方法二！<br />
<code>
"babel": {
    "presets": [
      "react-app",
      "es2015",
      "react",
      "stage-1"
    ],
    "plugins": [
      "transform-decorators-legacy"
    ]
  }
</code>
##### 方法二
提供另外一种初始化react项目的方式,可以理解成一个测试版的的react项目。<br />
<code>
create-react-app my-app --scripts-version custom-react-scripts
</code><br />
然后启动项目<code>REACT_APP_DECORATORS=true npm start</code>，完美的开启了修饰器！

#### 关于项目
没有后台，数据是mock出来的并用了localstorge存储！<br />
下载后<code>REACT_APP_DECORATORS=true npm start</code>就可以启动！

