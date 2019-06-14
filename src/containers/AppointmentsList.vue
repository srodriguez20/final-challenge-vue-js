<template>
  <Section class="appointment-list">
    <h2 class="header">Today</h2>
    <div class="content">
      <div class="today">
        <appointment-card v-for="(obj,index) in list" v-bind:key="index"/>
      </div>
      <hr class="divider">
      <div class="upcoming">
        <h2>Upcoming</h2>
        <appointment-card v-for="(obj,index) in list" v-bind:key="index"/>
      </div>
    </div>
  </Section>
</template>

<script>
import AppointmentCard from "../components/AppointmentCard.vue";
export default {
  data() {
    return {
      list: [1, 2, 3]
    };
  },
  components: {
    AppointmentCard
  }
};
</script>

<style lang="scss" scoped>
.header {
  margin: 0;
  background-color: #000034;
  padding: 20px 20px 65px 20px;
  color: #ffffff;
  border-radius: 0 0 25px 25px;
}
.content {
  padding: 0 20px;
  margin-top: -65px;
}
.divider {
  border-top: 2px solid #edf2f5;
  border-width: 2px 0 0 0;
  margin: 35px 0;
}

@media (min-width: 380px) {
}
@media (min-width: 960px) {
}
@media (min-width: 1240px) {
}
</style>