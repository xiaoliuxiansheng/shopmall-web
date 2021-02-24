/**
 * @name: index.jsx
 * @author: LIULIU
 * @date: 2020-08-21 14:41
 * @description：index.jsx
 * @update: 2020-08-21 14:41
 */
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'mobx-react';
import stores from '../stores/index';
import Register from '../pages/Register/index.tsx'
import Home from '../pages/Home/index.tsx'
import Login from '../pages/Login/index.tsx'
import ModifyName from "../pages/Home/modify/modifyName";
import ModifyPassword from "../pages/Home/modify/modifyPassword"
const configRoutes = [
    {
        path: '/register',
        exact: true,
        main: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/home',
        exact: true,
        main: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/',
        exact: true,
        main: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/modifyName',
        exact: true,
        main: ModifyName,
        meta: {
            title: '修改名字'
        }
    },
    {
        path: '/modifyPassword',
        exact: true,
        main: ModifyPassword,
        meta: {
            title: '修改密码'
        }
    }
]
const Routes = () => (
    <Provider {...stores}>
        <BrowserRouter>
            <Switch>
                {
                    configRoutes.map((route, index) => {
                        return <Route key={index} exact={route.exact} path={route.path} onEnter={() => {
                            document.title = route.meta.title
                        }}  component={route.main} />
                    })
                }
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default Routes;
