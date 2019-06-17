<template>
  <div id="app">
    <navigation/>
    <div class="aplication">
      <toolbar/>
      <main class="content">
        <section class="list">
          <header>
            <filter-bar/>
            <Button class="add-button" @clicked="newEntry" primary>
              <i class="material-icons">whatshot</i>
              <span>Add Klastch</span>
            </Button>
          </header>

          <appointment-list/>
        </section>
        <section v-if="breakpoint>=lg" class="detail">
          <div class="detail-content">
            <counter/>
            <appointment-detail/>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import Counter from "./containers/Counter.vue";
import Button from "./components/Button.vue";
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
    FilterBar,
    Button,
    Counter
  },

  data() {
    return {};
  },

  methods: {
    onResize() {
      const { innerWidth } = window;
      if (innerWidth >= 1240) {
        this.$store.commit("setBreakpoint", this.xl);
      } else if (innerWidth <= 380) {
        this.$store.commit("setBreakpoint", this.xs);
      } else {
        if (innerWidth <= 960) {
          this.$store.commit("setBreakpoint", this.md);
        } else {
          this.$store.commit("setBreakpoint", this.lg);
        }
      }
      console.log(this.breakpoint);
    },
    newEntry() {
      this.$store.commit("setDetail", null);
    }
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize);

    this.$store.dispatch("fetchAppointments");
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style  lang="scss">
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  font-size: 12px;
  @media (min-width: 380px) {
    font-size: 13px;
  }
  @media (min-width: 960px) {
    font-size: 14px;
  }
  @media (min-width: 1240px) {
    font-size: 16px;
  }
}
.aplication {
  padding: 0 0 66px 0;
  @media (min-width: 960px) {
    padding: 0 0 0 66px;
  }
}
.content {
  display: flex;
  flex-direction: row;
  background-color: #fbfbfb;
}
.list {
  width: 100%;
  header {
    padding: 10px 20px;
    background-color: #000034;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.detail {
  background-color: #000034;
  &-content {
    background-color: #ffffff;
    min-width: 400px;
    max-width: 500px;
    border-radius: 25px 0 0 0;
    height: 100%;
  }
}
.add-button {
  i {
    padding-right: 5px;
  }
}
</style>
