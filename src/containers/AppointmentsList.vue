<template>
  <Section v-if="!loading" class="appointment-list">
    <div class="header">
      <h2>Today</h2>
      <span class="next-meeting">Meeting in {{nextMeeting}}</span>
    </div>
    <div class="content-list">
      <div class="today">
        <appointment-card v-for="(obj,index) in todayList" :appointment="obj" v-bind:key="index"/>
      </div>
      <hr class="divider">
      <div class="upcoming">
        <h2>Upcoming</h2>
        <appointment-card
          v-for="(obj,index) in upcomingList"
          :appointment="obj"
          v-bind:key="index"
        />
      </div>
    </div>
  </Section>
</template>

<script>
import AppointmentCard from "../components/AppointmentCard.vue";
import dateFns from "date-fns";
export default {
  data() {
    return {
      list: [1, 2, 3]
    };
  },
  computed: {
    todayList() {
      var now = new Date();
      return this.appointments.filter(
        appointment =>
          new Date(appointment.start) > now &&
          dateFns.isToday(new Date(appointment.start))
      );
    },
    upcomingList() {
      return this.appointments.filter(
        appointment => !dateFns.isToday(new Date(appointment.start))
      );
    },
    filters() {
      return this.$store.getters.filters;
    },
    appointments() {
      if (
        !this.filters.confirmed &&
        !this.filters.pending &&
        !this.filters.cancelled
      ) {
        return this.$store.getters.appointments;
      } else {
        return this.$store.getters.appointments.filter(
          appointment =>
            (this.filters.confirmed
              ? appointment.status === "confirmed"
              : false) ||
            (this.filters.pending ? appointment.status === "pending" : false) ||
            (this.filters.cancelled
              ? appointment.status === "cancelled"
              : false)
        );
      }
    },
    nextMeeting() {
      if (this.appointments[0])
        return dateFns.distanceInWordsToNow(
          new Date(this.appointments[0].start)
        );
      return "";
    },
    loading() {
      return this.appointments == [];
    }
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.next-meeting {
  font-style: italic;
}
.content-list {
  padding: 0 20px;
  margin-top: -65px;
}
.divider {
  border-top: 2px solid #edf2f5;
  border-width: 2px 0 0 0;
  margin: 35px 0;
}
</style>