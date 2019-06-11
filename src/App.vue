<template>
  <div id="app">
    <navigation/>
    <main class="content">
      <toolbar/>
      <p>{{appointments[0]}}</p>
      <appointment-list/>
    </main>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";
import Navigation from "./components/Navigation.vue";
import AppointmentList from "./containers/AppointmentsList.vue";
export default {
  name: "app",
  components: { Toolbar, Navigation, AppointmentList },
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
  margin-left: 66px;
}
</style>
