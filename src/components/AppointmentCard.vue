<template>
  <div class="appoinment-card" tabindex="0">
    <div :class="borderStyle">
      <div>
        <time>{{hour}}</time>
        <time>{{dateDistance}}</time>
      </div>
    </div>
    <div class="details">
      <avatar :src="appointment.avatar" alt="User Icon"/>
      <div>
        <h4>{{fullName}}</h4>
        <address>
          <i class="material-icons">room</i>
          {{appointment.location[0].place}}
        </address>
      </div>
    </div>
    <div class="date-info">
      <time>{{day}}</time>
      <status :value="appointment.status"/>
    </div>
    <div class="actions">
      <Button icon link :onClick="goToEdit">
        <i class="material-icons" slot="icon">launch</i>
      </Button>
      <Button icon link :onClick="deleteAppointment">
        <i class="material-icons" slot="icon">clear</i>
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
import dateFns from "date-fns";
export default {
  components: { Avatar, Status, Button },
  props: {
    appointment: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullName() {
      return `${this.appointment.first_name} ${this.appointment.last_name}`;
    },
    borderStyle() {
      return "hour " + this.appointment.status;
    },
    day() {
      return dateFns.format(new Date(this.appointment.start), "MMMM Do");
    },
    hour() {
      return dateFns.format(new Date(this.appointment.start), "h:mm A");
    },
    dateDistance() {
      return dateFns.distanceInWordsStrict(
        new Date(this.appointment.start),
        new Date(this.appointment.end)
      );
    }
  },
  mounted() {
    console.log("TCL: mounted -> this.appointment;", this.appointment);
  },
  methods: {
    goToEdit() {},
    deleteAppointment() {}
  }
};
</script>

<style lang="scss" scoped>
.appoinment-card {
  min-height: 90px;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0;
  overflow: hidden;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  > div {
    display: flex;
    justify-content: center;
  }
  time {
    display: block;
  }
}
.hour {
  &.confirmed {
    border-left: 5px solid #4d8ee2;
  }
  &.pending {
    border-left: 5px solid #f8a720;
  }
  &.cancelled {
    border-left: 5px solid #f36774;
  }

  flex-direction: column;
  padding-left: 20px;
  div {
    padding: 5px 20px;
    border-right: 1px solid #edf2f5;
    time:first-child {
      font-weight: bold;
    }
  }
}
.details {
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
  > div {
    margin-left: 20px;
  }
  h4 {
    color: #000034;
    margin: 0;
  }
  i {
    color: #000034;
  }
  address {
    font-style: normal;
    font-size: 14px;
    color: #9e9e9e;
  }
}
.date-info {
  flex-direction: column;
  padding: 0 20px;
  time {
    font-weight: bold;
  }
  i {
    margin-right: 3px;
    font-size: 12px;
  }
}
.actions {
  align-items: center;
  padding: 0 40px;
  a {
    margin: 0 10px;
  }
  i {
    color: #9e9e9e;
    font-size: 15px;
  }
}
</style>