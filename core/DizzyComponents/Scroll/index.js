import React from 'react';
import BScroll from 'better-scroll';
import Proptypes from 'prop-types';
import './index.css';

/**
 * @description 滚动模块
 * @url https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md
 * @prop {Function}  pullUpFunc 上拉触发事件
 * @prop {Function}  pullDownFunc 下拉触发事件
 * @prop {Function}  onRef 获取滚动主模块this
 * @prop {Number}    height 模块滚动区域高度
 * @prop {Boolean}   updateScrollToTop 获取新数据是否滚动到顶部
 * @prop {Object}    scrollProps Better-Scroll的设置项
 * @class ScrollModel
 * @extends {React.Component}
 */
class ScrollModel extends React.Component {
    constructor (props) {
        super(props);
        this.scroll = null;
        this.wrapperRefs = React.createRef();
    }

    componentDidMount() {
        this.handleSetAutoHeight();
        this.initScroll();
        if (this.props.onRef) {
            this.props.onRef(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateScrollToTop) {
            this.scrollTo(0, 0);
        }
        if (nextProps.height !== this.props.height) {
            this.handleSetAutoHeight();
            this.scroll.refresh();
        }
    }

    componentWillUnmount() {
        this.scroll = this.wrapperRefs = null;
    }

    initScroll = () => {
        if (!this.scroll) {
            this.scroll= new BScroll(this.wrapperRefs.current, {
                pullDownRefresh: {
                    threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
                },
                pullUpLoad: {
                    threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
                },
                click: true,
                ...this.props.scrollProps,
            });
            this.pullUp();
            this.pullDown();
        } else {
            this.scroll.refresh();
        }
        this.scrollTo(0, 0);
    }

    pullUp = () => {
        this.scroll.on('pullingUp', () => {
            new Promise(async (resolve, reject) => {
                if (this.props.pullUpFunc) resolve( await this.props.pullUpFunc());
                resolve(null);
            })
            .then((newData) => {
                // 在刷新数据完成之后，调用 finishPullUp 方法
                this.scroll.finishPullUp();
                this.refresh();
            });
        });
    }

    pullDown = () => {
        this.scroll.on('pullingDown', () => {
            new Promise(async (resolve, reject) => {
                if (this.props.pullDownFunc) resolve( await this.props.pullDownFunc());
                resolve(null);
            })
            .then((newData) => {
                // console.log(newData)
                // 在刷新数据完成之后，调用 finishPullDown 方法
                this.scroll.finishPullDown();
                this.refresh();
            });
        });
    }

    refresh = () => {
        this.scroll.refresh();
    }

    scrollTo = (x, y) => {
        if (!this.scroll) {
            this.initScroll();
        }
        this.scroll.scrollTo(x, y, 1000);
        if(x === 0 && y === 0) {
            this.scroll.finishPullDown();
            this.refresh();
        }
    }

    scrollToElement = (el, time = 1000, offsetX = 0, offsetY = 10) => {
        if (!this.scroll) {
            this.initScroll();
        }
        this.scroll.scrollToElement(el, time, offsetX, offsetY);
    }

    handleSetAutoHeight = () => {
        if (this.props.height === 0) {
            let parent = this.wrapperRefs.current.parentNode;
            this.wrapperRefs.current.style = `height: ${parent.clientHeight}px`;
        } else {
            this.wrapperRefs.current.style = `height: ${this.props.height}px`;
        }
    }

    render() {
        const {children} = this.props;
        return (
            <div className="wrapper" ref={this.wrapperRefs}>
                {children}
            </div>
        )
    }
};

ScrollModel.propTypes = {
    pullUpFunc: Proptypes.func,
    pullDownFunc: Proptypes.func,
    onRef: Proptypes.func,
    height: Proptypes.number.isRequired,
    updateScrollToTop: Proptypes.bool,
    scrollProps: Proptypes.object,
};
ScrollModel.defaultProps = {
    height: 0,
    updateScrollToTop: false,
    scrollProps: {},
};

export default ScrollModel;