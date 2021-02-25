let websocket = [], lockReconnect = false;
let createWebSocket = (url, wsKey, cb = () => { }) => {
    websocket[wsKey] = new WebSocket(`${global.G_WS_HOST}${url}`);
    websocket[wsKey].onopen = function () {
        heartCheck.reset(wsKey).start(wsKey);
    }
    websocket[wsKey].onerror = function (e) {
        reconnect(url, wsKey, cb);
        console.log(`websocket[${wsKey}] 断开111: ` + e.code + ' ' + e.reason + ' ' + e.wasClean)
    };
    websocket[wsKey].onclose = function (e) {
        console.log(`websocket[${wsKey}] 断开: ` + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    websocket[wsKey].onmessage = function (event) {
        lockReconnect = true;
        //event 为服务端传输的消息，在这里可以处理
        const data = JSON.parse(event.data)
        cb(data)
        heartCheck.reset(wsKey).start(wsKey);
    }
}
let websocketSendMsg = (msg,wsKey) => {
    websocket[wsKey].send(msg)
    console.log('发送信息...')
}
let reconnect = (url, wsKey, cb) => {
    if (lockReconnect) return;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(url, wsKey, cb);
        lockReconnect = false;
    }, 4000);
}
let heartCheck = {
    timeout: 60000, //60秒
    timeoutObj: [],
    reset: function (wsKey) {
        clearInterval(this.timeoutObj[wsKey]);
        return this;
    },
    start: function (wsKey) {
        this.timeoutObj[wsKey] = setInterval(function () {
            try {
                console.log('websocket====>send', websocket, wsKey)
                //onmessage拿到返回的心跳就说明连接正常
                websocket[wsKey].send('');
            } catch (error) {
                console.log('websocket====>err', error)
            }
        }, this.timeout)
    }
}
//关闭连接
let closeWebSocket = (wsKey) => {
    if (websocket[wsKey]) {
        websocket[wsKey].close();
        delete websocket[wsKey];
    }
}
export {
    websocket,
    createWebSocket,
    closeWebSocket,
    websocketSendMsg
};
