import React from 'react';
import Proptypes from 'prop-types';
import mStyles from '../index.module.scss';
import createStyled from 'material-ui-render-props-styles/index';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const styles = (theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});
const Styled = createStyled(styles, { withTheme: true });
const Fragment = React.Fragment;

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
function DrawerModel(props) {
    let toggleDrawer = (state) => () => {
        props.handleToggleDrawer(state);
    };

    let { anchor, open, orClasses, variant, hasTopClose } = props;

    let C = props.isPhone ? SwipeableDrawer : Drawer;

    let P = Object.assign(
        props.isPhone ? { onOpen: toggleDrawer(true), disableDiscovery: true } : {},
        {
            onClose: toggleDrawer(false),
            classes: Object.assign({
                paper: mStyles['drawer-paper']
            }, orClasses),
            anchor,
            open,
            variant
        }
    );

    return (
        <Fragment>
            <C {...P}>
                {hasTopClose && (
                    <Fragment>
                        <Styled>
                            {({ classes, theme }) => (
                                <div className={classes.drawerHeader}>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                    </IconButton>
                                </div>
                            )}
                        </Styled>
                        <Divider />
                    </Fragment>
                )}

                {props.children}
            </C>
        </Fragment>
    )
}

DrawerModel.propTypes = {
    isPhone: Proptypes.bool.isRequired,
    anchor: Proptypes.string,
    open: Proptypes.bool.isRequired,
    orClasses: Proptypes.object,
    variant: Proptypes.string,
    handleToggleDrawer: Proptypes.func,
    hasTopClose: Proptypes.bool,
};
DrawerModel.defaultProps = {
    isPhone: true,
    anchor: 'left',
    open: false,
    orClasses: {},
    variant: 'temporary',
    children: (<ul><li>1</li><li>1</li><li>1</li></ul>),
    handleToggleDrawer: (state) => { },
    hasTopClose: true,
};

export default DrawerModel;