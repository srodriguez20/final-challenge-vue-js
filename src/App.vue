<template>
  <div id="app">
    <toolbar/>
    <navigation/>
    <main class="content"></main>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Navigation from "./components/Navigation.vue";
export default {
  name: "app",
  components: { Toolbar, Navigation }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.content {
  background-color: #fbfbfb;
}
</style>
