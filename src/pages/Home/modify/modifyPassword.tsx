/**
 * @name: ModifyName
 * @author: LIULIU
 * @date: 2020-08-21 13:51
 * @description：ModifyName
 * @update: 2020-08-21 13:51
 */
import React, { useEffect, useState, useRef } from "react";
import { List, InputItem, Toast, Button } from 'antd-mobile';
import './index.less'
import {modifyUserPwd} from "../../../service/apis";
const ModifyPassword = (props: any) => {
    const [hasError, setError] = useState<any>(false)
    const [password, setPassword] = useState<any>('')
    const [newPassword, setNewPassword] = useState<any>('')
    const onErrorClick = () => {
        setError(!hasError)
    }
    const handleModifyPwd = () => {
        modifyUserPwd({oldpwd: password,newpwd:newPassword,id:JSON.parse(localStorage.getItem('userInfo') as string).id}).then((res) => {
            if (+res.errcode === 0) {
                Toast.success('修改成功', 1 , () => {
                    localStorage.clear()
                    window.location.href = '/'
                })
            }
        })
    }
    const onChangePwd = (msg: any) => {
        setPassword(msg)
    }
    const onChangeNewPwd = (msg: any) => {
        setNewPassword(msg)
    }
    return (
        <div className="home-drawer">
            <div className="modify-form">
                <List>
                    <InputItem
                        type='password'
                        placeholder="请输入原密码"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangePwd}
                        value={password}
                    >原始密码：</InputItem>
                    <InputItem
                        type='password'
                        placeholder="请输入新密码"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangeNewPwd}
                        value={newPassword}
                    >新密码：</InputItem>
                </List>
            </div>
            <div className="modify-bottom">
                <Button type="primary" size="small" inline onClick={handleModifyPwd} className='modify-bottom-btn' disabled={!(password&&newPassword)}>确认修改</Button>
            </div>
        </div>
    )
}
export default ModifyPassword;
