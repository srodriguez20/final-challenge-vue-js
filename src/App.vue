<template>
  <div id="app">
    <navigation/>
    <div class="aplication">
      <toolbar/>
      <main v-if="!loading" class="content">
        <template v-if="breakpoint>=lg">
          <home/>
          <section v-if="breakpoint>=lg" class="detail">
            <div class="detail-content">
              <counter/>
              <AppointmentDetail/>
            </div>
          </section>
        </template>
        <template v-else>
          <router-view/>
        </template>
      </main>
      <loading v-else/>
    </div>
  </div>
</template>

<script>
import Home from "./containers/Home.vue";
import Counter from "./containers/Counter.vue";
import Toolbar from "./components/Toolbar.vue";
import Loading from "./components/Loading.vue";
import Navigation from "./components/Navigation.vue";
import AppointmentDetail from "./containers/AppointmentDetail.vue";
export default {
  name: "app",
  components: {
    Toolbar,
    Navigation,
    AppointmentDetail,
    Counter,
    Home,
    Loading
  },

  data() {
    return { loading: true };
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
    }
  },

  created() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.$store.dispatch("fetchUsers");
    this.$store
      .dispatch("fetchAppointments")
      .then(() => (this.loading = false));
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
  font-size: 13px;
  @media (min-width: 380px) {
    font-size: 14px;
  }
  @media (min-width: 960px) {
    font-size: 15px;
  }
  @media (min-width: 1240px) {
    font-size: 16px;
  }
}
.aplication {
  padding: 0 0 80px 0;
  @media (min-width: 960px) {
    padding: 0 0 0 66px;
  }
}
.content {
  display: flex;
  flex-direction: row;
  background-color: #fbfbfb;
}

.detail {
  background-color: #000034;
  min-width: 300px;
  max-width: 500px;
  @media (min-width: 1240px) {
    width: 30%;
  }
  &-content {
    background-color: #ffffff;

    border-radius: 40px 0 0 0;
    height: 100%;
  }
}
</style>
