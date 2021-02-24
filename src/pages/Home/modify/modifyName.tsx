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
import {modifyUserName} from "../../../service/apis";
const ModifyName = (props: any) => {
    const [hasError, setError] = useState<any>(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const onErrorClick = () => {
        setError(true)
    }
    const onChangeName = (msg: any) => {
        setName(msg)
    }
    const handleModifyName = () => {
        modifyUserName({name,id:JSON.parse(localStorage.getItem('userInfo') as string).id}).then((res) => {
            if (+res.errcode === 0) {
                Toast.success('修改成功', 1 , () => {
                    props.history.go(-1)
                })
            }
        })
    }
    return (
        <div className="modify">
            <div className="modify-form">
                <List>
                    <InputItem
                        placeholder="请输入姓名"
                        error={hasError}
                        onErrorClick={onErrorClick}
                        onChange={onChangeName}
                        value={name}
                    >姓名</InputItem>
                </List>
            </div>
            <div className="modify-bottom">
                <Button type="primary" size="small" inline onClick={handleModifyName} className='modify-bottom-btn' disabled={!name}>确认修改</Button>
            </div>
        </div>
    )
}
export default ModifyName;
