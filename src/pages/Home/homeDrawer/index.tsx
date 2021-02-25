/**
 * @name: App
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：App
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
import './index.less'
const HomeDrawer = (props: any) => {
    const tabAry = [{
        name:'修改姓名',
        path:'/modifyName'
    },{
        name:'修改密码',
        path:'/modifyPassword'
    },{
        name: '退出登录',
        path: ''
    }]
    return (
        <div className="home-drawer">
            {
                tabAry.map((tab, tabIndex) => {
                    return (
                        <div className="home-drawer-item" key={tabIndex} onClick={() => {
                            if (tabIndex < 2) {
                                props.history.push(tab.path)
                            } else {
                                localStorage.clear()
                                window.location.href = '/'
                            }
                        }}>
                            {tab.name}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default HomeDrawer;
