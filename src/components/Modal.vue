<template>
  <div class="background" role="presentation" v-if="open" @click.stop="cancel">
    <div class="modal" @click.stop>
      <div :class="success?'icon success':'icon'">
        <i class="material-icons">{{icon}}</i>
      </div>

      <p>{{message}}</p>
      <div class="actions">
        <Button class="action cancel" @clicked="cancel">Cancel</Button>
        <Button class="action confirm" @clicked="confirm">Confirm</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  props: { message: String, icon: String, open: Boolean, success: Boolean },
  components: { Button },
  methods: {
    confirm() {
      this.$emit("confirmed");
    },
    cancel() {
      this.$emit("cancelled");
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  z-index: 2;
}
.icon {
  width: 40px;
  height: 40px;
  display: flex;
  margin: auto;
  justify-content: center;
  border-radius: 50%;
  background-color: #f36774;
  &.success {
    background-color: #54cc9c;
  }
  i {
    color: #ffffff;
    margin: auto;
    font-size: 25px;
    font-weight: 600;
  }
}
.modal {
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  margin: auto;
}
.actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  .action {
    padding: 5px 10px;
    margin: 0 3px;
    border-width: 2px;

    &:hover {
      color: #4d8ee2;
      border-color: #4d8ee2;
    }
  }
  .cancel {
    &:hover {
      color: #f36774;
      border-color: #f36774;
    }
  }
}
</style>