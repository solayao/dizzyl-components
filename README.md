##  How to use ?
```
    import xx from 'dizzyl-component/core/${path}/${name}';
```

## What include ?
- antd相关 (path = AntdComponents)
```

    /**
        * 走马灯
        * @url https://ant.design/components/carousel-cn/
        * @url https://react-slick.neostack.com/docs/api
        * @prop {Object} config 配置， 参考上url
        * @returns
    */
    class CarouselModel {}

    /**
        * 加载占位图
        * @url https://ant.design/components/skeleton-cn/#components-skeleton-demo-list
        * @prop {Boolean} loading 是否显示占位符
        * @prop {Object/Boolean} avatar 头像占位符配置
        * @prop {Object/Boolean} paragraph 段落占位符配置
        * @prop {Object/Boolean} title 标题占位符配置
        * @returns
    */
    class SkeletonModel() {}
```

- dizzy相关 (path = DizzyComponents)
    ```
        /**
            * 图片工具箱
            * @url https://github.com/frontend-collective/react-image-lightbox
            * @param {*} props
            * @prop {Index} currentIndex 默认显示的图片Src的index
            * @prop {Function} createActionFunc 触发显示工具箱的组件
            * @prop {Array} imageList 图片数组
            * @prop {String} srcFormat 渲染的图片需要补充的参数
            * @prop {Boolean} canPrevOrNext 是否能触发上一页或下一页
        */
        class ImageActionModel {}

        /**
            * Loading控件
            * @class LoadingComponent
            * @prop {String} moduleType ['ball-spin-fade-loader' | 'line-scale' | 'ball-beat' | 'ball-scale-multiple']
            * @prop {Number} nullDivNum
            * @extends {Component}
        */
        class LoadingComponent {}

        /**
            * 懒加载图片
            * @url https://github.com/ApoorvSaxena/lozad.js
            * @class LozadWrapper
            * @extends {React.Component}
            * @prop {String} src
            * @prop {String} srcset
            * @prop {String} alt
            * @prop {Array/String} classes
        */
        class LozadWrapper {}

        /**
            * React的Portal
        */
        class createPortal{}

        /**
            * @description 滚动模块
            * @url https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md
            * @prop {Function}  pullUpFunc 上拉触发事件
            * @prop {Function}  pullDownFunc 下拉触发事件
            * @prop {Function}  onRef 获取滚动主模块this
            * @prop {Number}    height 模块滚动区域高度
            * @prop {Boolean}   updateScrollToTop 获取新数据是否滚动到顶部
            * @class ScrollModel
            * @extends {React.Component}
        */
        class ScrollModel {}

        /**
            * 滚动的文字Span
            * @class ScrollMess
            * @prop {Number} speed 滚动速度|100
            * @extends {React.Component}
        */
        class ScrollMess {}
    ```

- graphql相关 (path = GraphqlComponents)
    ```
        /**
            * React-Apollo的Query模块封装
            * @param {*} props
            * @prop {Function} children (data) => Node
            * @prop {*} ...queryProps 其他Query的属性
            * @prop {String} loadingType Loading的类型 ['l'|'liner'|'c'|'circular'|'s'|'skeleton']
            * @prop {Object} loadingProps Loading模块属性
            * @prop {Node} loadingRender Loading等待时候需要展示的控件
            * @returns
        */
        class QueryModel {}
    ```

- materialUi相关 (path = MaterialComponents)
    ```
        /**
            * @description 对话框
            * @src https://material-ui.com/api/dialog/
            * @author Dizzy L
            * @param {*} props
            * @prop {Node} title 标题
            * @prop {Node} content 内容
            * @prop {String} contentText 文字内容
            * @prop {Node} actions 操作
            * @prop {Boolean} open 是否显示
            * @prop {Object} dialogProps Dialog的属性
            * @returns
        */
        class DialogModel {}

        /**
            * 抽屉模块
            * @class DrawerModel
            * @prop {Boolean} isPhone 是否是手机模式
            * @prop {String} anchor 展现的位置
            * @prop {Boolean} open 是否展示
            * @prop {Object} orClasses overrider的css
            * @prop {String} variant 展现的形态
            * @prop {Function} handleToggleDrawer 处理改变状态方法
            * @prop {Boolean} hasTopClose 是否包含头部的关闭模块
            * @extends {Component}
        */
        class DrawerModel {}

                    
        /**
            * Loading Circular 环状进度模块
            * @class LoadingLinear
            * @extends {React.Component}
            * @prop {Object} mUiProps material-Ui的属性 https://material-ui.com/api/circular-progress/
        */
        class LoadingCircular {}

        /**
            * Loading Line线条进度模块
            * @class LoadingLinear
            * @prop {Number} loadSecond 最大等待事件(s) = 120
            * @prop {Boolean} loading 是否在等待
            * @prop {String} style 类型 'fixed' | 'normal'
            * @prop {Object} mUiProps material-Ui的属性 https://material-ui.com/api/linear-progress/
            * @extends {React.Component}
        */
        class LoadingLinear {}

        /**
            * 单行画廊
            * @param {*} props
            * @prop {Array} tileList [{img, title}]
            * @prop {Number} cols 显示多少张图片
            * @prop {Function} itemClick 点击画廊中的某图片,返回对应的title, (title)=>{}
        */
        class RowGallery {}

        /**
            * @description 消息条
            * @src https://material-ui.com/api/snackbar/
            * @author Dizzy L
            * @param {*} props
            * @prop {Node} content 内容
            * @prop {Node} action 操作
            * @prop {Object} snackbarProps snackbar的属性
            * @returns
        */
        class SnackbarModel {}
    ```

- route相关 (path = Route)
```
/**
 * @description 创建异步控件
 * @author Dizzy L
 * @param {any} pathName 控件文件夹名称
 * @param {string} [path='containers'] 默认src/containers为主路径
 * @returns {ReactNode | null}
 */
function createAsyncComponent(pathName, path = 'containers') {}

/**
 * 路由组件封装
 * @export
 * @param {any, props, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 路由控件
 */
class AppliedRoute {}

/**
 * 认证路由组件封装
 * @export
 * @param {any, props = { noAuthTo, ...other }, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 认证路由控件 || 登录页
 */
class AuthenticatedRoute {}

/**
 * 非认证路由组件封装
 *
 * @export
 * @param {any, props, ...rest} 渲染的控件， 控件属性， 路由属性
 * @returns 非认证路由控件 || 重定向地址
 */
class UnauthenticatedRoute {}
```