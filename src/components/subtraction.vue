<template>
  <div>
    <h3>当前最新的counter值为:{{ count }}</h3>
    <!-- <button @click="sub(1)">减1</button> -->
    <button @click="sub(1)">减1</button>
    <button @click="handleadd">延时+1</button>
  </div>
</template>
<script>
//导入辅助函数
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    // 访问store的第二种方式，通过mapMutations辅助函数映射到methods
    // 完成后sub函数变成了组件自己的函数，可以通过this.*调用，html里页可以自己用sub访问
    ...mapMutations(["sub"]),
    ...mapActions(["asyncAdd"]),
    handleadd() {
      //调用的是store里mutation里的sub函数
      this.asyncAdd(1);
    }
  },
  // 访问store的第二种方式，通过导入mapstore辅助函数，映射到计算属性里
  computed: {
    ...mapState(["count"])
  }
};
</script>
<style lang="less" scoped></style>
