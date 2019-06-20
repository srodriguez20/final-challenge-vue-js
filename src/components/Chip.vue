<template>
  <div class="chip" aria-label="topic chip">
    <span>{{text}}</span>
    <Button icon @clicked="clicked" aria-label="remove">
      <i class="material-icons">clear</i>
    </Button>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  props: {
    text: String
  },
  components: {
    Button
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  }
};
</script>

<style lang="scss" scoped>
.chip {
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #edf2f5;
  padding: 0 5px;
}
</style>