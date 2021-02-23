/**
 * @name: App
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：App
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
import './app.less'
const App = (props: any) => {
    const [hasError, setError] = useState(false)
    const [value, setValue] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const onErrorClick = () => {
    }
    const onChange = (msg: any) => {
        setValue(msg)
    }
    const onChangePhone = (msg: any) => {
        setPhone(msg)
    }
    const onChangePassword = (msg: any) => {
        setPassword(msg)
    }
    return (
        <div className="login-content">
            <div className="login-content-form">
                <List>
                    <InputItem
                        placeholder="请输入姓名"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChange}
                        value={value}
                    >姓名</InputItem>
                    <InputItem
                        type="phone"
                        placeholder="请输入手机号"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePhone}
                        value={phone}
                    >手机号</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入姓名"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePassword}
                        value={password}
                    >密码</InputItem>
                </List>
            </div>
            <div className='login-content-btn'>
                <Button type="primary" >注册</Button>
            </div>
        </div>
    )
}
export default App;
