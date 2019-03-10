/* eslint-disable */
import Vue from 'vue'
import axios from 'axios';
export default {
    init_wechat() {
        let nonce = new Date().getTime();
        let timestamp = Math.round(nonce / 1000);
        let url = /[\w\S]+(?=#)/.exec(window.location.href).toString()
        axios.get(`/api/open/JsSdkSignature?noncestr=${nonce}&timestamp=${timestamp}&url=${url}`).then(res => {
            console.log(res);
            Vue.wechat.config({
                // beta: true,
                // debug: true,
                appId: "wx69e3e015be8feebd",
                timestamp: timestamp,
                nonceStr: nonce,
                signature: res.data,
                jsApiList: ['getLocation']
            })
            Vue.wechat.ready(function() {
                console.log("ready");
            })
            Vue.wechat.error(function(res) {
                console.log(res);
            })
        });
    }
}