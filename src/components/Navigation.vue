<template>
  <div>
    <nav class="menu">
      <span class="logo" v-if="breakpoint>=lg">K</span>
      <a href>
        <i class="material-icons unfilled">home</i>
      </a>
      <a href>
        <i class="material-icons">thumb_up_alt</i>
      </a>
      <a href>
        <i class="material-icons">notifications</i>
      </a>
      <a href>
        <i class="material-icons">history</i>
      </a>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.menu {
  background-color: #ffffff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: row;
  position: fixed;
  justify-content: space-around;
  bottom: 0;
  width: 100%;
  height: 66px;
  color: #000034;
  a {
    color: #9e9e9e;
    &.active {
      color: #000034;
    }
  }
  i,
  span {
    margin: 20px 0;
    font-size: 28px;
    font-weight: 800;
  }

  @media (min-width: 960px) {
    align-items: center;
    justify-content: initial;
    flex-direction: column;
    height: 100vh;
    width: 66px;
  }
}

@media (min-width: 1240px) {
}
</style>