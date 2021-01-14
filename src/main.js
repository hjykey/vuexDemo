import Vue from "vue";
import App from "./App.vue";
import store from "./store";
// import Axios from "axios";
// 按需导入ant-design-vue
import { Button, Input, message, Checkbox, List } from "ant-design-vue";
// 导入ant-design-vue样式
import "ant-design-vue/dist/antd.css";
// 配置请求的根路径
// Axios.defaults.baseURL = "http://127.0.0.1:8888/api/";
// 挂载到prototype原型上
// Vue.prototype.$http = Axios;
Vue.prototype.$message = message;
// vue中注册引入的组件
Vue.use(Button)
  .use(Input)
  .use(Checkbox)
  .use(List);
Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
