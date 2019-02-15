# vue-music

```
// 运行
npm i
npm start
// 之后访问http://localhost:3000 即可
```

## 项目介绍
  - 使用vue框架模仿QQ音乐，所有数据均来自QQ音乐官网，仅供个人学习交流。

## 技术栈
  - 使用vue全家桶+es6进行项目开发；
  - 使用async/await异步方案
  - 使用jsonp，服务端代理等方式完成跨域请求（QQ音乐接口）；
  - 使用预渲染优化首屏加载速度；
  - 使用create-keyframe-animation库完成动态数据的动画效果；
  - 使用flex布局进行移动端适配，sass预处理语言提高css开发效率；

## 项目收获
  - 根据业务功能设计代码目录结构，提高了开发和维护效率；
  - 使用sass管理通用样式和封装常用样式；
  - 踩了ios无法自动播放音频的坑（给根元素绑定点击事件解决）；
  - 使用了vue mixin复用了多个组件都会用到的逻辑代码
  - 使用服务端代理修改referer和host，解决了qq音乐接口中验证请求来源的问题（因为浏览器的原因，前端请求无法实现）
  - 项目中使用better-scroll组件实现各种滑动效果，由于bscroll需要在页面渲染之后才能正确计算位置，因此踩了一些坑，也通过这个坑理解了vue的渲染机制和生命周期

### recommend组件

#### 注意点:

##### 获取歌单列表时, jsonp请求失败, 这是由于QQ音乐后台将数据接口的HOST和Referer设置为了QQ域名才可以访问, 从前端的角度我们是无法绕过这个限制的, 所以我们需要通过后端代理接口来解决这个问题.
#### 后台配置代理接口:
##### 使用axios访问同源接口'/getDiscList', 将需要发送给真实接口的信息传递过去; 在vue.config.js中配置devServer, 通过before函数监听拦截'/getDiscList'路由, 在这里访问真正的接口, 在nodejs环境中通过axios发送歌单接口请求, 可以在headers参数中写入host和referer伪装成QQ域名来获取接口信息;


### slider组件
#### mounted钩子中初始化better-scroll无法生效的问题?
##### slider组件中使用slot插槽来接收轮播图内容, 而recommend组件中的轮播图数据是异步获取的, 当slider组件mounted执行的时候, 轮播图数据很可能还没有拿到, 轮播图内容还没有开始渲染, better scroll无法计算内容的宽高, 所以无法滑动.   解决方法: 在recommend组件中, 使用v-if来控制渲染slider组件, 获取到数据之后再渲染slider组件即可

#### 注意点:
##### 当开启better scroll的snap.loop时, better scroll会自动clone第一张和最后一张图片来实现无缝轮播, 所以我们需要将容器的宽度增加, 来容纳这两张图片

##### 当页面大小变化时, 我们需要重新计算容器宽度, 执行refresh()刷新BScroll, 但是计算宽度的函数执行时会多增加两张图片的宽度以实现无缝轮播, 所以我们通过一个isResize变量也控制是否需要增加宽度

##### 在scrollEnd事件, 通过getCurrentPage()方法可以获取页面信息, 我们以此来获取当前的页面索引, 来实现指示器的高亮效果

##### 自动轮播是通过setInterval来执行BScroll的next()来实现的, 为了防止当我们滑动到上一张时, 定时器刚好到点执行, 导致立即又跳转到了下一张的不良体验, 我们在每次scrollEnd事件中都重新执行_play()方法, 清空之前的定时器, 重新注册定时器

##### 当组件内有定时器时, 在组件销毁时最好清除掉, 有利于内存的释放

### scroll组件

#### 由于better scroll组件会被多次使用, 所以我们将其抽象成一个组件来复用.

#### 注意点:

##### 在scroll组件中, 我们通过监听父组件传来的数据变化来refresh scroll组件的重新刷新, 这样我们使用scroll组件时就不需要再父组件中去手动的refresh scroll组件了.

##### 由于recommend中的轮播图组件数据是异步加载的, 为了避免scroll高度计算错误, 我们在轮播图组件的第一张图片加载完毕的load事件中在此调用refresh方法

### 其他注意点:

#### Q: Vue.use(VueLazyload)时, loading的图片地址不生效, 图片获取不到?

##### A: 通过require来加载图片:
```javascript
   Vue.use(VueLazyload, {
     loading: require('./common/image/default.png')
   })
```

#### 当better scroll 和 fastclick起冲突时, 可以给需要点击的元素加上'needsclick'的类名

#### IOS音频无法自动播放？由于IOS的安全机制问题，不允许audio和video的自动播放，需要用户手动点击之后才可以播放。
##### 解决方案：在顶级的组件上绑定点击事件，当用户点击之后调用audio.play()方法，这就相当于是用户自己手动点击了。通过事件冒泡原理，一旦用户和页面交互，就会触发此事件。我们只需要触发一次事件，ios就会判定为用户已经操作了，后续的音频都可以正常播放，所以我们使用once修饰符让事件只执行一次即可