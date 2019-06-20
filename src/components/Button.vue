<template>
  <a v-if="link" @click.stop="clicked" :class="classname">
    <slot/>
  </a>
  <button v-else-if="submit" @click.stop="clicked" type="submit" :class="classname">
    <slot/>
  </button>
  <button v-else @click.stop.prevent="clicked" type="button" :class="classname">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    link: Boolean,
    src: String,
    icon: Boolean,
    active: Boolean,
    primary: Boolean,
    submit: Boolean
  },
  computed: {
    classname() {
      let rta = "";
      this.icon ? (rta += "icon ") : (rta += "text ");
      if (this.active) rta += "active ";
      if (this.primary) rta += "primary ";
      return rta;
    }
  },
  methods: {
    clicked() {
      this.$emit("clicked");
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
  background: transparent;
  transition: transform 0.3s ease;
  &:active {
    transform: scale(0.7);
  }
  &:hover {
    cursor: pointer;
    background: #edf2f5;
  }
}
.text {
  background: transparent;
  border-radius: 20px;
  border: 1px solid #9e9e9e;
  color: #9e9e9e;
  font-size: 0.875em;
  padding: 6px 0;

  &:active {
    transform: scale(0.9);
  }
  &.active {
    color: #ffffff;
    border: 1px solid #ffffff;
  }

  &:hover {
    cursor: pointer;
    border-color: #ffffff;
  }
}
.primary {
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px 30px;
  border-radius: 30px;
  background-color: #54cc9c;
  border: 5px solid #203957;
}
</style>