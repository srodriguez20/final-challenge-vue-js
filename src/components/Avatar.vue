<template>
  <div>
    <img src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1" alt>
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
    border: String
  }
};
</script>

<style lang="scss" scoped>
img {
  border-radius: 50%;
  background-color: #f0f8ff;
}
</style>