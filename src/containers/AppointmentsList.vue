<template>
  <Section class="appointment-list">
    <div class="today">
      <h2>Today</h2>
      <appointment-card v-for="(obj,index) in list" v-bind:key="index"/>
    </div>
    <hr class="divider">
    <div class="upcoming">
      <h2>Upcoming</h2>
      <appointment-card v-for="(obj,index) in list" v-bind:key="index"/>
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
.appointment-list {
  padding: 20px;
  .today {
    h2 {
      color: #ffffff;
    }
  }
}
.divider {
  border-top: 2px solid #edf2f5;
  border-width: 2px 0 0 0;
  margin: 40px 0;
}

@media (min-width: 380px) {
}
@media (min-width: 960px) {
}
@media (min-width: 1240px) {
}
</style>