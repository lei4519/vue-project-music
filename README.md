# vue-music

## recommend组件

### 注意点:

#### 获取歌单列表时, jsonp请求失败, 这是由于QQ音乐后台将数据接口的HOST和Referer设置为了QQ域名才可以访问, 从前端的角度我们是无法绕过这个限制的, 所以我们需要通过后端代理接口来解决这个问题.
#### 后台配置代理接口:

##### 使用axios访问同源接口'/getDiscList', 将需要发送给真实接口的信息传递过去; 在vue.config.js中配置devServer, 通过before函数监听拦截'/getDiscList'路由, 在这里访问真正的接口, 在nodejs环境中通过axios发送歌单接口请求, 可以在headers参数中写入host和referer伪装成QQ域名来获取接口信息;


## slider组件

### mounted钩子中初始化better-scroll无法生效的问题?

#### slider组件中使用slot插槽来接收轮播图内容, 而recommend组件中的轮播图数据是异步获取的, 当slider组件mounted执行的时候, 轮播图数据很可能还没有拿到, 轮播图内容还没有开始渲染, better scroll无法计算内容的宽高, 所以无法滑动.   解决方法: 在recommend组件中, 使用v-if来控制渲染slider组件, 获取到数据之后再渲染slider组件即可

### 注意点:

#### 当开启better scroll的snap.loop时, better scroll会自动clone第一张和最后一张图片来实现无缝轮播, 所以我们需要将容器的宽度增加, 来容纳这两张图片

#### 当页面大小变化时, 我们需要重新计算容器宽度, 执行refresh()刷新BScroll, 但是计算宽度的函数执行时会多增加两张图片的宽度以实现无缝轮播, 所以我们通过一个isResize变量也控制是否需要增加宽度

#### 在scrollEnd事件, 通过getCurrentPage()方法可以获取页面信息, 我们以此来获取当前的页面索引, 来实现指示器的高亮效果

#### 自动轮播是通过setInterval来执行BScroll的next()来实现的, 为了防止当我们滑动到上一张时, 定时器刚好到点执行, 导致立即又跳转到了下一张的不良体验, 我们在每次scrollEnd事件中都重新执行_play()方法, 清空之前的定时器, 重新注册定时器

#### 当组件内有定时器时, 在组件销毁时最好清除掉, 有利于内存的释放

## scroll组件

### 由于better scroll组件会被多次使用, 所以我们将其抽象成一个组件来复用.

### 注意点:

#### 在scroll组件中, 我们通过监听父组件传来的数据变化来refresh scroll组件的重新刷新, 这样我们使用scroll组件时就不需要再父组件中去手动的refresh scroll组件了.

#### 由于recommend中的轮播图组件数据是异步加载的, 为了避免scroll高度计算错误, 我们在轮播图组件的第一张图片加载完毕的load事件中在此调用refresh方法

## 其他注意点:

### Vue.use(VueLazyload)时, loading的图片地址不生效, 图片获取不到?

#### 通过require来加载图片:
```javascript
   Vue.use(VueLazyload, {
     loading: require('./common/image/default.png')
   })
```

### 当better scroll 和 fastclick起冲突时, 可以给需要点击的元素加上'needsclick'的类名v
