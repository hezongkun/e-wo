<template>
  <div class="page-404">404</div>
</template>

<script>
export default {
  layout: 'error',
  // eslint-disable-next-line vue/require-prop-types
  props: ['error'], // you can set a custom layout for the error page
}
</script>

<style lang="scss" scoped>
.page-404 {
  min-height: 580px;
}
</style>
