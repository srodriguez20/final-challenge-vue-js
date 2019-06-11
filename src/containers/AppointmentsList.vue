<template>
  <div class="appointment-list">
    <appointment-card/>
  </div>
</template>

<script>
import AppointmentCard from "../components/AppointmentCard.vue";
export default {
  components: {
    AppointmentCard
  }
};
</script>

<style lang="scss" scoped>
.appointment-list {
  padding: 20px;
}
</style>