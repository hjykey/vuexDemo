import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
// 全局公共数据源
export default new Vuex.Store({
  // 数据，状态
  state: {
    count: 0,
    list: [],
    inputValue: "aaa",
    nextId: 5,
    viewKey: "all"
  },
  // 相当于vue里的计算属性， 接受 state 作为其第一个参数
  getters: {
    shownum(state) {
      return "当前最新的counter值为：【" + state.count + "】";
    },
    unDoneItemLength(state) {
      return state.list.filter(item => {
        return !item.done;
      }).length;
    },
    viewList(state) {
      let list = [];
      switch (state.viewKey) {
        case "unDone":
          list = state.list.filter(item => !item.done);
          break;
        case "done":
          list = state.list.filter(item => item.done);
          break;
        default:
          list = state.list;
          break;
      }
      return list;
    }
  },
  // 同步更新数据或状态的方法，第一个形参永远是state
  // 在mutation里进行异步操作，html上显示的与store里state下的值将不同步
  mutations: {
    add(state, n) {
      // setTimeout(() => {
      state.count += n;
      // }, 1000);
    },
    sub(state, n) {
      state.count -= n;
    },
    initList(state, list) {
      state.list = list;
    },
    addList(state) {
      let obj = {
        done: false,
        id: state.nextId,
        info: state.inputValue.trim()
      };
      state.list.push(obj);
      state.nextId++;
      state.inputValue = "";
      // console.log(state.list);
    },
    removeItemFromList(state, id) {
      // state.list.forEach((item, index) => {
      //   if (item.id === id) state.list.splice(index, 1);
      // });
      const i = state.list.findIndex(x => x.id === id);
      if (i >= 0) state.list.splice(i, 1);
    },
    updateList(state, payload) {
      const i = state.list.findIndex(x => x.id === payload.id);
      if (i >= 0) state.list[i].done = payload.status;
    },
    handleInputChange(state, $event) {
      state.inputValue = $event.target.value;
      // console.log($event);
    },
    changeViewKey(state, val) {
      state.viewKey = val;
    },
    clearDone(state) {
      state.list = state.list.filter(x => !x.done);
    }
  },
  // 异步执行,触发一个mutations的函数变更状态,参数context是一个与 store 实例具有相同方法和属性的对象
  // context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
  // 当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身
  //下例可参考ES6的参数解构简化为
  //   asyncAdd ({ commit }) {
  // setTimeout(n => {
  //   commit("add", n);
  // }, 1000);}
  actions: {
    asyncAdd(context, n) {
      setTimeout(() => {
        context.commit("add", n);
      }, 1000);
    },
    asyncSub(context, n) {
      setTimeout(() => {
        context.commit("sub", n);
      }, 1000);
    },
    getList(context) {
      Axios.get("/list.json").then(({ data: res }) => {
        context.commit("initList", res);
      });
    }
  },
  //模块，里面可以包含自己的state，mutation等等
  modules: {}
});
