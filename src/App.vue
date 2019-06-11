<template>
  <div id="app">
    <toolbar/>
    <navigation/>
    <main class="content">
      <p>{{appointments[0]}}</p>
    </main>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Navigation from "./components/Navigation.vue";
export default {
  name: "app",
  components: { Toolbar, Navigation },
  created() {
    this.$store.dispatch("fetchAppointments");
  },
  updated() {
    console.log(this.appointments);
  },
  computed: {
    appointments() {
      return this.$store.getters.appointments;
    }
  }
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
