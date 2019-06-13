<template>
  <a v-if="link">
    <slot name="icon" @click="onClick"/>
  </a>
  <button v-else @click="onClick">
    <slot name="icon"/>
  </button>
</template>

<script>
export default {
  props: {
    link: Boolean,
    src: String,
    onClick: Function
  }
};
</script>

<style lang="scss" scoped>
button,
a {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  transition: transform 0.3s ease;
  &:active {
    transform: scale(0.7);
  }
  &:hover {
    background: #edf2f5;
  }
}
</style>