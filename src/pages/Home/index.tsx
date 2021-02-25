/**
 * @name: App
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：App
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { Drawer, List, NavBar, Icon } from 'antd-mobile';
import { createWebSocket, websocketSendMsg} from '../../service/websocket'
import { UserList } from '../../service/apis'
import './app.less'
import HomeDrawer from './homeDrawer/index'
const Index = (props: any) => {
    const [page, setPage] = useState(1)
    const [users, setUsers] = useState<any>([])
    const [open, setOpen] = useState<any>(false)
    // useEffect(() => {
    //     handleGetUser()
    //     const token = localStorage.getItem('token');
    //     let baseUrl = ``;
    //     createWebSocket(baseUrl,'message')
    // },[])
    const handleGetUser = () => {
        UserList(page,10).then(res => {
            if (+res.errcode === 0) {
                setUsers([...res.data.rows])
            }
        })
    }
    const onOpenChange = () => {
        setOpen(!open)
    }
    const sidebar = (<List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
            if (index === 0) {
                return (<List.Item key={index}
                                   thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                                   multipleLine
                >Category</List.Item>);
            }
            return (<List.Item key={index}
                               thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            >Category{index}</List.Item>);
        })}
    </List>);
    return (
        <div className="home">
            <div className="home-title">
                <div>
                    <i className="iconfont icon-iconfonthoudongfangiconfont01" style={{color:'#1296db'}} onClick={onOpenChange}/>
                </div>
                <div>用户列表</div>
                <div>
                    <i className="iconfont icon-liaotian" style={{color:'#1296db'}} onClick={ () => {
                        props.history.push('/chat')
                    }}/>
                </div>
            </div>
            <div className='home-list'>
                {
                    users.map((user: any, index: number) => {
                        return (
                            <div key={index} className="home-list-item">
                                <div className="home-list-item-name">
                                    <span>姓名：</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="home-list-item-name">
                                    <span>手机号：</span>
                                    <span>{user.phone}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Drawer
                className="my-drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                enableDragHandle
                contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                sidebar={<HomeDrawer {...props}/>}
                children={''}
                open={open}
                onOpenChange={onOpenChange}
            />
        </div>
    )
}
export default Index;
