<template>
  <section class="appointment-detail" v-if="!editing">
    <Button class="back" icon v-if="breakpoint<=md" @clicked="goHome" link>
      <i class="material-icons">keyboard_backspace</i>
    </Button>
    <Button class="edit" icon @clicked="goEdit" link>
      <i class="material-icons">edit</i>
    </Button>
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status :value="statusValue"/>
      <div class="users">
        <avatar :src="currentUserPhoto" alt="User avatar"/>
        <i class="material-icons">whatshot</i>
        <avatar :src="detail.avatar" alt="User avatar"/>
      </div>
      <h3 class="name">{{fullName}}</h3>
      <span class="phone">{{phoneFormated}}</span>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>
        <time>{{hours}}</time>
      </div>
      <div class="location">
        <h3>Location</h3>
        <address>
          <span>{{detail.location[0].place}}</span>
          <br>
          {{detail.location[0].street}}
        </address>
      </div>
      <div class="topics">
        <h3>Topics</h3>
        <span>{{topicsFormated}}</span>
      </div>
    </div>
    <div class="actions">
      <h3>Status</h3>
      <div>
        <a class="confirm" v-if="statusValue==='pending' " @click="confirm">Confirm Klatsch</a>
        <a
          class="cancel"
          v-if="statusValue==='confirmed' || statusValue==='pending' "
          @click="cancelAppointment"
        >Cancel Klatsch</a>
      </div>
    </div>
  </section>
  <appointment-form v-else/>
</template>

<script>
import dateFns from "date-fns";
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";

import imagePlaceholder from "../assets/no-photo.png";
import AppointmentForm from "../containers/AppointmentForm.vue";
import { appointmentMixin } from "../mixins/appointment";

export default {
  data() {
    return {
      edit: false
    };
  },
  components: { Avatar, Status, Button, AppointmentForm },
  mixins: [appointmentMixin],
  created() {
    this.hash === "#edit" ? (this.edit = true) : (this.edit = false);
    const uid = this.$route.params.id;
    if (uid && uid !== "add") this.$store.dispatch("fetchAppointmentById", uid);
  },
  watch: {
    hash() {
      this.hash === "#edit" ? (this.edit = true) : (this.edit = false);
    }
  },

  computed: {
    hash() {
      return this.$route.hash;
    },
    editing() {
      return this.isNew || this.edit;
    },
    fullName() {
      return `${this.detail.first_name} ${this.detail.last_name}`;
    },
    phoneFormated() {
      let cleaned = ("" + this.detail.phone).replace(/\D/g, "");
      let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      return "+1 (" + match[1] + ") " + match[2] + "-" + match[3];
    },
    hours() {
      let initial = dateFns.format(new Date(this.detail.start), "h:mm A");
      let end = dateFns.format(new Date(this.detail.end), "h:mm A");
      return `${initial} - ${end}`;
    },
    topicsFormated() {
      let list = "";
      this.detail.topics.forEach(obj => {
        list += obj.topic + ", ";
      });
      return list;
    },
    statusValue() {
      return this.isNew ? "pending" : this.detail.status;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    },
    currentUserPhoto() {
      return this.currentUser !== null
        ? this.currentUser.avatar
        : imagePlaceholder;
    }
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    goEdit() {
      this.$router.push(`/appointment/${this.detail.uid}#edit`);
    },
    confirm() {
      const uid = this.detail.uid;
      this.$store
        .dispatch("updateAppointment", {
          id: uid,
          fields: { status: "confirmed" }
        })
        .then(() => {
          this.$store.dispatch("fetchAppointments");
          this.$store.dispatch("fetchAppointmentById", uid);
        });
    },
    cancelAppointment() {
      const uid = this.detail.uid;
      this.$store
        .dispatch("updateAppointment", {
          id: uid,
          fields: { status: "cancelled" }
        })
        .then(() => {
          this.$store.dispatch("fetchAppointments");
          this.$store.dispatch("fetchAppointmentById", uid);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.appointment-detail {
  background-color: #ffffff;
  width: 100%;
  position: relative;
  @media (min-width: 960px) {
    width: initial;
  }
}
.back {
  position: absolute;
  z-index: 2;
  top: 15px;
  left: 15px;
}
.edit {
  position: absolute;
  z-index: 2;
  top: 15px;
  right: 15px;
}
.details {
  padding: 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .users {
    margin: 15px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
      font-size: 35px;
      margin: 0 20px;
    }
  }
  .phone {
    color: #9e9e9e;
  }
  .name {
    margin: 8px 0;
  }
}
.more-details {
  margin: 20px 15px;
  border-top: 1px solid #edf2f5;
  border-bottom: 1px solid #edf2f5;
  padding: 0 15px;
  h3 {
    margin: 0 0 10px 0;
  }
  > div {
    margin: 25px 0;
  }
}
.time {
  time {
    color: #9e9e9e;
  }
}
.location {
  address {
    color: #9e9e9e;
    font-style: normal;
    span {
      font-weight: 700;
    }
  }
}
.topics {
  span {
    color: #9e9e9e;
  }
  .topics-list {
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
  }
}
.actions {
  margin: 0 30px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  h3 {
    margin: 0;
  }
  a {
    cursor: pointer;
    text-decoration: underline;
    display: block;
    margin-bottom: 5px;
    &.cancel:hover {
      color: #f36774;
    }
    &.confirm:hover {
      color: #4d8ee2;
    }
  }
}
</style>