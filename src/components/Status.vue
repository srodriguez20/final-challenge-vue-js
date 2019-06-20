<template>
  <span :class="value">
    <i class="material-icons">fiber_manual_record</i>
    {{Ucfirst}}
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  computed: {
    Ucfirst() {
      return this.value.charAt(0).toUpperCase() + this.value.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.confirmed {
  color: #4d8ee2;
}
.pending {
  color: #f8a720;
}
.cancelled {
  color: #f36774;
}
span {
  font-weight: 700;
}

i {
  margin-right: 3px;
  font-size: 12px;
}
</style>