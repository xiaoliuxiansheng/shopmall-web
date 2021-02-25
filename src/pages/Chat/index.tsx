/**
 * @name: Chat
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：Chat
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import {Drawer, List, NavBar, Icon, InputItem, Button} from 'antd-mobile';
import { createWebSocket, websocketSendMsg} from '../../service/websocket'
import './index.less'
const Chat = (props: any) => {
    const [msg, setMsg] = useState<any>('')
    // 系统返回的消息标识为 1 自己发送的消息标识为2
    const [msgData, setMsgData] = useState<any>([])
    useEffect(()=> {
        // @ts-ignore
        createWebSocket('','message',(data) => {
            if (data && data.message) {
                // let arr = JSON.parse(localStorage.getItem('chatMsg') )
                // setMsgData([..., {...data,type: 1}])
            }
        })
    },[])

    const onChange = (msg: any) => {
        setMsg(msg)
    }
    const handleSendMessage = () => {
        let data = {
            message: msg,
            time: new Date().getTime(),
            type: 2
        }
        setMsgData([...msgData,data])
        localStorage.setItem('chatMsg', JSON.stringify([...msgData,data]))
        websocketSendMsg(msg,'message')
        setMsg('')
    }
    return (
        <div className="chatroom">
            <div className="chatroom-title">
                <i className="iconfont icon-up" onClick={() => {
                    props.history.go(-1)
                }}/>
                <div>
                    客服机器人
                </div>
                <i className="iconfont icon-dianhua" />
                <i className="iconfont icon-yonghu" />
            </div>
            <div className='chatroom-content'>
                {
                    msgData.map((msg: any, msgIndex: number) => {
                        return (
                            <div className="chatroom-content-item" key={msgIndex}>
                                {
                                    msg.type === 1 ? <i className="iconfont icon-kefu2" /> : <i className="iconfont icon-ziji" />
                                }
                                <div className='chatroom-content-item-content'>
                                    <span>客服</span>
                                    <span>
                                        {msg.message}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='chatroom-msg'>
                <i className="iconfont icon-yuyin" />
                <InputItem
                    placeholder="请输入信息"
                    onChange={onChange}
                    value={msg}
                    className='chatroom-msg-input'
                />
                <i className="iconfont icon-biaoqing1" />
                <Button className='chatroom-msg-btn' type="primary" size="small" inline disabled={!msg} onClick={handleSendMessage}>
                    发送
                </Button>
            </div>
        </div>
    )
}
export default Chat;
