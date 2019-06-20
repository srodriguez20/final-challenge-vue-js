<template>
  <div class="loading">
    <img :src="path" alt>
  </div>
</template>

<script>
import loading from "../assets/loading.gif";

export default {
  data() {
    return {
      path: loading
    };
  }
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  width: 100%;
  height: 100%;
  img {
    margin: auto;
    max-width: 10%;
  }
}
</style>