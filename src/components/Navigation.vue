<template>
  <div>
    <nav class="menu">
      <a href>
        <span>K</span>
      </a>
      <a href>
        <i class="material-icons">home</i>
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
  display: flex;
  flex-direction: column;
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