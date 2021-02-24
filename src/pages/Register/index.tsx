/**
 * @name: App
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：App
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
import { UserRegister } from '../../service/apis'
import './app.less'
const Index = (props: any) => {
    const [hasError, setError] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const onErrorClick = () => {
    }
    const onChange = (msg: any) => {
        setName(msg)
    }
    const onChangePhone = (msg: any) => {
        setPhone(msg)
    }
    const onChangePassword = (msg: any) => {
        setPassword(msg)
    }
    const handleRegister = async () => {
        let res = await UserRegister({
            name,
            phone,
            password
        })
        if (+res.errcode === 0) {
            props.history.push('/login')
        }
        console.log(res)
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
                        value={name}
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
                        placeholder="请输入密码"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePassword}
                        value={password}
                    >密码</InputItem>
                </List>
            </div>
            <div className='login-content-bottom'>
                <Button type="primary" className='login-content-btn' disabled={!(password&&phone&&name)} onClick={() => {
                    handleRegister()
                }}>注册</Button>
            </div>
        </div>
    )
}
export default Index;
