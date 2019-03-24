/ * eslint - disable * /
import axios from 'axios';
import { stringify } from 'querystring';

function split_url() {
    let url = /[\w\S]+(?=[#])/.exec(window.location.href).toString()
        // let url = /[\w\S]+(?=[?])/.exec(/[\w\S]+(?=[#])/.exec(window.location.href))
    let state = /(?=#\/)[\w\S]+/g.exec(window.location.href).toString();
    // let state = window.location.href.replace(url, '');
    state = state.replace('#/', '');

    return { url, state };
}
export default {
    init_wechat(vue) {
        let splited_url = split_url();
        let url = splited_url.url;
        let state = splited_url.state;
        // window.location.href = `${url}#/${state||''}`;
        let nonce = new Date().getTime();
        let timestamp = nonce / 1000;
        let encodedUri = encodeURIComponent(url);
        var signatureUrl = `/api/open/JsSdkSignature?noncestr=${nonce}&timestamp=${timestamp}&url=${encodedUri}`;
        axios.get(signatureUrl).then(res => {
            // alert(res.data);
            console.log(res);
            vue.wechat.config({
                // debug: true,
                appId: "wx69e3e015be8feebd",
                timestamp: timestamp,
                nonceStr: nonce.toString(),
                signature: res.data,
                jsApiList: ['getLocation']
            })
            vue.wechat.ready(function() {
                try {
                    vue.wechat.getLocation({
                        type: "wgs84",
                        success: function(res) {
                            console.log(res);
                            var latitude = res.latitude;
                            var longitude = res.longitude;
                            var center = { lat: latitude, lng: longitude };
                            window.localStorage['center'] = JSON.stringify(center);
                        },
                        fail: function(res) {
                            alert(JSON.stringify(res));
                        }
                    });
                } catch (e) {
                    alert('无法获取您的地理位置');
                }
            })
            vue.wechat.error(function(res) {
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