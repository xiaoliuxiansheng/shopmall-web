/**
 * @name: App
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：App
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
import { UserLogin } from '../../service/apis'
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
        let res = await UserLogin({
            phone,
            // @ts-ignore
            password : global.encryptPassword(password as string)
        })
        if (+res.errcode === 0 ) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            props.history.push('/home')
        }
    }
    return (
        <div className="login-content">
            <div className="login-content-form">
                <List>
                    <InputItem
                        placeholder="请输入电话"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePhone}
                        value={phone}
                    >电话</InputItem>
                    <InputItem
                        type="password"
                        placeholder="请输入密码"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePassword}
                        value={password}
                    >密码</InputItem>
                    <div className="login-content-form-register">
                        <span>忘记密码</span>
                        <span onClick={() => {
                            props.history.push('/register')
                        }}>注册</span>
                    </div>
                </List>
            </div>
            <div className='login-content-bottom'>
                <Button type="primary" className='login-content-btn' disabled={!(password&&phone)} onClick={() => {
                    handleRegister()
                }}>登录</Button>
            </div>
        </div>
    )
}
export default Index;
