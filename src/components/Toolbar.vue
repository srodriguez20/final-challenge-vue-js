<template>
  <header class="navbar">
    <h1>My Klatschboard</h1>
    <div class="avatar">
      <img src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1" alt>
      <span v-if="breakpoint>=lg">Jhon Doe</span>
    </div>
  </header>
</template>

<script>
export default {};
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