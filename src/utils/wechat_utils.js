/ * eslint - disable * /
import Vue from 'vue'
import axios from 'axios';

function split_url() {
    let url = /[\w\S]+(?=#)/.exec(window.location.href).toString()
        //let state = /(?=#\/)[\w\S]+/g.exec(window.location.href).toString();
    let state = window.location.href.replace(url, '');
    state = state.replace('#/', '');

    return { url, state };
}
export default {
    init_wechat() {
        let nonce = new Date().getTime();
        let timestamp = Math.round(nonce / 1000);
        let url = split_url().url;
        axios.get(`/api/open/JsSdkSignature?noncestr=${nonce}&timestamp=${timestamp}&url=${url}`).then(res => {
            console.log(res);
            Vue.wechat.config({
                // beta: true,
                // debug: true,
                appId: "wx69e3e015be8feebd",
                timestamp: timestamp,
                nonceStr: nonce,
                signature: res.data,
                jsApiList: ['getLocation', 'chooseImage', 'uploadImage']
            })
            Vue.wechat.ready(function() {
                console.log("ready");
            })
            Vue.wechat.error(function(res) {
                console.log(res);
            })
        });
    },
    init_interceptor() {
        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response) {
                return Promise.reject(error.response);
            }
        })
    },
    check_login() {
        axios.head('./api/open/userinfo').then(res => {
            console.log(res);

        }).catch(e => {
            console.log(e);
            if (e.status == 401) {
                var splited_url = split_url();
                window.location = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx69e3e015be8feebd&redirect_uri=${splited_url.url}&response_type=code&scope=snsapi_base&state=${splited_url.state}#wechat_redirect`
            }
        });
    }
}