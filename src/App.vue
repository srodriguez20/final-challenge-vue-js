<template>
  <div id="app">
    <navigation/>
    <div class="aplication">
      <toolbar/>
      <main class="content">
        <section class="list">
          <filter-bar/>
          <appointment-list/>
        </section>
        <section class="detail">
          <appointment-detail/>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import FilterBar from "./components/FilterBar.vue";
import Toolbar from "./components/Toolbar.vue";
import Navigation from "./components/Navigation.vue";
import AppointmentList from "./containers/AppointmentsList.vue";
import AppointmentDetail from "./containers/AppointmentDetail.vue";
export default {
  name: "app",
  components: {
    Toolbar,
    Navigation,
    AppointmentList,
    AppointmentDetail,
    FilterBar
  },
  created() {
    this.$store.dispatch("fetchAppointments");
  },
  updated() {
    console.log(this.appointments);
  }
};
</script>

<style  lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
.aplication {
  margin-left: 66px;
}
.content {
  display: flex;
  flex-direction: row;
  background-color: #fbfbfb;
}
.detail {
  background-color: #000034;
}
</style>
