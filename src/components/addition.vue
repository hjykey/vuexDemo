<template>
  <div>
    <h3>{{ $store.getters.shownum }}</h3>
    <button @click="add">加1</button>
    <button @click="sub">延时减1</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    add() {
      // 访问store公共数据的第一种方式，但是是不安全的，推荐的是mutation
      // 用mutation操作store的数据虽然繁琐，但可以集中监控所有数据的变化
      // this.$store.state.count++;
      //commit(params1,params2),params1一般为mutation里的方法名
      this.$store.commit("add", 1);
    },
    // dispatch和上面的commit对应，用于发起异步执行，对应store里的actions
    sub() {
      this.$store.dispatch("asyncSub", 1);
    }
  }
};
</script>
<style lang="less" scoped></style>
