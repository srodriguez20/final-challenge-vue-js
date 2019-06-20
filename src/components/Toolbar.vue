<template>
  <header class="navbar">
    <h1>My Klatschboard</h1>
    <div class="avatar">
      <img :src="photo" alt>
      <span v-if="breakpoint>=lg">{{fullName}}</span>
    </div>
  </header>
</template>

<script>
import imagePlaceholder from "../assets/no-photo.png";
export default {
  computed: {
    user() {
      return this.$store.getters.currentUser;
    },
    fullName() {
      if (this.user !== null)
        return `${this.user.first_name} ${this.user.last_name}`;
      return "Guess";
    },
    photo() {
      return this.user !== null ? this.user.avatar : imagePlaceholder;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #000034;
  h1 {
    color: #ffffff;
    margin: 20px 0;
  }
}
.avatar {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    background-color: #ffffff;
    border-radius: 50%;
    border: 2px solid #4d8ee2;
    width: 50px;
    height: auto;
  }
  span {
    margin: 0 20px;
    color: #ffffff;
    font-weight: lighter;
  }
}
</style>