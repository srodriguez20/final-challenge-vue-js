<template>
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
</template>

<script>
import Button from "../components/Button.vue";
import AppointmentList from "./AppointmentsList.vue";
import FilterBar from "../components/FilterBar.vue";
export default {
  components: {
    Button,
    AppointmentList,
    FilterBar
  },
  methods: {
    newEntry() {
      this.$router.push(`/appointment/add`);
      this.$store.commit("setDetail", null);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  @media (min-width: 1240px) {
    width: 70%;
  }
  header {
    padding: 10px 20px;
    background-color: #000034;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.add-button {
  i {
    padding-right: 5px;
  }
}
</style>