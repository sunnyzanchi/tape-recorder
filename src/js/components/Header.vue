<style scoped>
  h1 {
    margin: 0;
  }
  .header {
    background: #1976d2;
    color: #fff;
    margin: 0;
    padding: 18px;
  }
</style>
<template functional>
  <div class="header">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: 'Header Default',
      type: String,
    },
  },
};
</script>

