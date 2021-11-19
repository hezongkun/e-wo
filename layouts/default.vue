<template>
  <div>
    <Nuxt class="main-container-page" />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    env() {
      return process.env.NODE_ENV
    },
  },
}
</script>

<style lang="scss" scoped>
html {
  font-family: 'PingFangSC-Regular, PingFang SC';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100vh;
}
.login-bg {
  background-color: #fac83f;
}
.main-container-page {
  min-height: 80vh;
}
</style>
