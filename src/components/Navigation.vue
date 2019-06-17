<template>
  <div>
    <nav class="menu">
      <span class="logo" v-if="breakpoint>=lg">K</span>
      <a :class="home?'active':''">
        <i class="material-icons-outlined active">home</i>
      </a>
      <a >
        <i class="material-icons-outlined">thumb_up_alt</i>
      </a>
      <a >
        <i class="material-icons-outlined">notifications</i>
      </a>
      <a >
        <i class="material-icons-outlined">history</i>
      </a>
    </nav>
  </div>
</template>

<script>
export default {data(){
  return {
    home:true,
  }
}};
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
    cursor: pointer;
    color: #9e9e9e;
    &.active {
      color: #000034;
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
  }
}
.logo{
  font-weight: 900;

}
@media (min-width: 1240px) {
}
</style>