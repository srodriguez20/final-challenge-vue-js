<template>
  <a v-if="link" @click="onClick" :class="classname">
    <slot name="icon"/>
    <slot name="text"/>
  </a>
  <button v-else @click="onClick" :class="classname">
    <slot name="icon"/>
    <slot name="text"/>
  </button>
</template>

<script>
export default {
  props: {
    link: Boolean,
    src: String,
    onClick: Function,
    icon: Boolean,
    active: Boolean
  },
  computed: {
    classname() {
      let rta = "";
      this.icon ? (rta += "icon ") : (rta += "text ");
      if (this.active) rta += "active ";
      return rta;
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
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
.text {
  background: transparent;
  border-radius: 20px;
  border: 1px solid #9e9e9e;
  color: #9e9e9e;
  font-size: 14px;
  width: 80%;
  padding: 5px 0;
  &.active {
    color: #ffffff;
    border: 1px solid #ffffff;
  }
}
</style>