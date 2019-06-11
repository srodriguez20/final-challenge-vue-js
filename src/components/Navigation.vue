<template>
  <div>
    <nav class="menu">
      <a href>
        <span>K</span>
      </a>
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
  flex-direction: column;
  align-items: center;
  height: 100vh;
  position: fixed;
  width: 66px;
  a {
    margin: 20px 0;
    i {
      font-size: 28px;
    }
    span {
      font-size: 28px;
      font-weight: 800;
    }
  }
}
</style>