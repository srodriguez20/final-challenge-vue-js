<template>
  <article role="listitem" aria-label="meeting summary card">
    <div class="appoinment-card" tabindex="0" @click="setDetail">
      <div :class="borderStyle">
        <div class="hour">
          <time>{{hour}}</time>
          <time>{{dateDistance}}</time>
        </div>
        <div class="details">
          <avatar
            :src="appointment.avatar"
            alt="User avatar"
            :gray="appointment.status==='cancelled'"
          />
          <div class="detail-text">
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
        <div class="actions" v-if="breakpoint>=lg">
          <Button
            icon
            v-if="appointment.status==='pending'"
            @clicked="confirmModal=true"
            aria-label="confirm the meeting"
            title="Confirm"
          >
            <i class="material-icons">done</i>
          </Button>
          <Button
            icon
            link
            v-if="appointment.status==='confirmed'"
            @clicked="goToEdit"
            aria-label="go to edit"
            title="Edit"
          >
            <i class="material-icons">launch</i>
          </Button>
          <Button
            icon
            v-if="appointment.status!=='cancelled'"
            @clicked="deleteModal=true"
            aria-label="cancel the meeting"
            title="Cancel"
          >
            <i class="material-icons">clear</i>
          </Button>
        </div>
      </div>
    </div>
    <Modal
      message="Are you sure you want to confirm this meeting?"
      icon="done"
      success
      @confirmed="confirm"
      @cancelled="confirmModal=false"
      :open="confirmModal"
    />
    <Modal
      message="Are you sure you want to cancel this meeting?"
      icon="clear"
      @confirmed="deleteAppointment"
      @cancelled="deleteModal=false"
      :open="deleteModal"
    />
  </article>
</template>

<script>
import dateFns from "date-fns";
import Modal from "./Modal.vue";
import Button from "./Button.vue";
import Avatar from "./Avatar.vue";
import Status from "./Status.vue";

export default {
  components: { Avatar, Status, Button, Modal },
  data() {
    return {
      confirmModal: false,
      deleteModal: false
    };
  },
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
      return `card-content ${this.appointment.status}`;
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
  methods: {
    setDetail() {
      this.$router.push(`/appointment/${this.appointment.uid}`);
      this.$store.commit("setDetail", this.appointment);
    },
    goToEdit() {
      this.$router.push(`/appointment/${this.appointment.uid}#edit`);
      this.$store.commit("setDetail", this.appointment);
    },
    confirm() {
      const uid = this.appointment.uid;
      this.$store
        .dispatch("updateAppointment", {
          id: uid,
          fields: { status: "confirmed" }
        })
        .then(() => {
          this.$store.dispatch("fetchAppointments");
          this.$store.dispatch("fetchAppointmentById", uid);
          this.confirmModal = false;
        });
    },
    deleteAppointment() {
      const uid = this.appointment.uid;
      this.$store
        .dispatch("updateAppointment", {
          id: uid,
          fields: { status: "cancelled" }
        })
        .then(() => {
          this.$store.dispatch("fetchAppointments");
          this.$store.dispatch("fetchAppointmentById", uid);
          this.deleteModal = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.appoinment-card {
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  overflow: hidden;
  width: 100%;
  @media (min-width: 1240px) {
    width: 100%;
  }
  &:active {
    transform: scale(0.99);
  }
  &:hover {
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
  }
}
.card-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  color: #000034;
  background-color: #ffffff;
  @media (min-width: 960px) {
    padding: 0;
    min-height: 90px;
    flex-wrap: nowrap;
  }

  > div {
    display: flex;
    box-sizing: border-box;
  }
  time {
    display: block;
  }
  &.confirmed {
    border-left: 5px solid #4d8ee2;
  }
  &.pending {
    border-left: 5px solid #f8a720;
  }
  &.cancelled {
    border-left: 5px solid #f36774;
    background-color: #fbfbfb;
    color: #9e9e9e !important;
  }
}
.details {
  width: 100%;
  align-items: center;
  flex-direction: row;
  margin-bottom: 15px;
  padding: 0 20px;
  order: 1;
  h4 {
    margin: 0;
  }
  i {
    font-size: 15px;
    color: #000034;
  }
  address {
    font-style: normal;
    font-size: 0.875em;
    color: #9e9e9e;
  }
  .detail-text {
    margin-left: 20px;
  }
  @media (min-width: 960px) {
    margin: 0;
    order: 2;
    width: 30%;
  }
}

.hour {
  flex-direction: column;

  padding: 5px 30px;
  order: 2;
  width: 50%;
  border-right: 1px solid #edf2f5;
  time:first-child {
    font-weight: bold;
  }
  @media (min-width: 960px) {
    width: 20%;
    order: 1;
  }
}
.date-info {
  width: 50%;
  flex-direction: column;
  padding: 0 20px;
  order: 3;
  time {
    font-weight: bold;
  }
  i {
    margin-right: 3px;
    font-size: 12px;
  }
  @media (min-width: 960px) {
    width: 30%;
  }
}
.actions {
  justify-content: space-evenly;
  padding-right: 40px;
  order: 4;
  i {
    color: #9e9e9e;
    font-size: 15px;
  }
  width: 20%;
}
</style>