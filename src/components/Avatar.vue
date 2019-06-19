<template>
  <div>
    <img :src="src" :alt="alt" :class="gray?'gray':''">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    disable: Boolean,
    gray: Boolean,
    border: String
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 50px;
  border-radius: 50%;
  background-color: #f0f8ff;
  &.gray {
    filter: grayscale(1);
  }
}
</style>