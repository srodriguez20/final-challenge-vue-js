<template>
  <div>
    <nav class="menu" role="navigation" aria-label="select the tab you want to go">
      <span class="logo" v-if="breakpoint>=lg">K</span>

      <router-link :class="home?'active':''" :aria-selected="home?'true':'false'" to="/">
        <i class="material-icons-outlined active">home</i>
      </router-link>
      <a aria-label="likes">
        <i class="material-icons-outlined">thumb_up_alt</i>
      </a>
      <a aria-label="notifications">
        <i class="material-icons-outlined">notifications</i>
      </a>
      <a aria-label="history">
        <i class="material-icons-outlined">history</i>
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: true
    };
  }
};
</script>

<style lang="scss" scoped>
.menu {
  z-index: 5;
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  position: fixed;
  justify-content: space-around;
  bottom: 0;
  width: 100%;
  height: 66px;
  color: #000034;
  a {
    text-align: center;
    cursor: pointer;
    color: #9e9e9e;
    width: 25%;
    &.active {
      color: #000034;
    }
    &:active{
      transform: scale(0.7);
    }
    &:hover{
      background-color: #f9f9f9;
    }
  }
  i,
  span {
    margin: 20px 0;
    font-size: 28px;
  }

  @media (min-width: 960px) {
    align-items: center;
    justify-content: initial;
    flex-direction: column;
    height: 100vh;
    width: 66px;
    a{
      text-align: center;
      width: 100%;
    }
  }
}
.logo {
  font-weight: 900;
}
@media (min-width: 1240px) {
}
</style>