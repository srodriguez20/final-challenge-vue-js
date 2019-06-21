<template>
  <form class="appointment-detail" v-on:submit.prevent="send">
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status :value="statusValue"/>
      <div class="users">
        <avatar :src="currentUserPhoto" alt="User avatar"/>
        <i class="material-icons">whatshot</i>
        <avatar :src="photo" alt="User avatar"/>
      </div>
      <div class="input-field spaced">
        <label for="firstname">First Name*</label>
        <autocomplete
          :items="users"
          field="first_name"
          v-model="firstName"
          id="firstname"
          placeholder="E.g. Jhon"
          @itemSelected="selectUser"
        />
      </div>
      <div class="input-field spaced">
        <label for="lastname">Last Name*</label>
        <input
          type="text"
          v-model="lastName"
          id="lastname"
          name="lastname"
          placeholder="E.g. Doe"
          required
        >
      </div>
      <div class="input-field spaced">
        <label for="phone">Phone</label>
        <input
          type="tel"
          v-model="phone"
          id="phone"
          name="phone"
          placeholder="E.g. (123) 456 - 7890"
        >
      </div>
      <div class="input-field spaced">
        <label for="email">Email*</label>
        <input
          type="email"
          v-model="email"
          id="email"
          name="email"
          placeholder="E.g. example@email.com"
          required
        >
      </div>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>
        <div class="input-field spaced">
          <label for="start-time">Start Time*</label>
          <input
            type="datetime-local"
            v-model="startTime"
            id="start-time"
            name="start-time"
            required
          >
        </div>
        <div class="input-field spaced">
          <label for="end-time">End Time*</label>
          <input type="datetime-local" v-model="endTime" id="end-time" name="end-time" required>
        </div>
      </div>
      <div class="location">
        <h3>Location</h3>
        <div class="input-field spaced">
          <label for="place">Place*</label>
          <input
            ref="autocompletegoogle"
            type="text"
            v-model="location.place"
            id="place"
            name="place"
            placeholder="E.g. Ridge Coffe"
            required
          >
        </div>
        <div class="input-field spaced">
          <label for="street">Street*</label>
          <input
            type="text"
            v-model="location.street"
            id="street"
            name="street"
            placeholder="E.g. St 123, Av"
            required
          >
        </div>
      </div>
      <div class="topics">
        <h3>Topics</h3>
        <div class="input-field">
          <label for="topics">Topics</label>
          <input
            type="text"
            v-model="newTopic"
            @keydown.enter.prevent="addTopic"
            name="topics"
            placeholder="E.g. Movies, Health..."
          >
          <div class="topics-list">
            <chip
              v-for="(obj,i) in topics"
              :key="obj.topic"
              :text="obj.topic"
              @clicked="removeTopic(i)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <p class="error" v-if="error">{{error}}</p>
      <Button class="action cancel" @clicked="cancel">Cancel</Button>
      <Button class="action confirm" submit>{{isNew==true? "Add":"Update"}}</Button>
    </div>
  </form>
</template>

<script>
import dateFns from "date-fns";
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
import Chip from "../components/Chip.vue";

import imagePlaceholder from "../assets/no-photo.png";
import Autocomplete from "../components/Autocomplete.vue";
import { appointmentMixin } from "../mixins/appointment";

export default {
  data() {
    return { autocomplete: null };
  },
  components: { Avatar, Status, Button, Autocomplete, Chip },
  mixins: [appointmentMixin],
  mounted() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.$refs.autocompletegoogle,
      { types: ["establishment"] }
    );
    this.autocomplete.addListener("place_changed", this.fillInAddress);
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    users() {
      return this.$store.getters.users;
    },
    statusValue() {
      return this.isNew ? "pending" : this.detail.status;
    },
    currentUserPhoto() {
      return this.currentUser !== null
        ? this.currentUser.avatar
        : imagePlaceholder;
    }
  },
  methods: {
    send() {
      if (this.startTime < this.endTime) {
        if (this.isNew) this.addAppointment();
        else this.editAppointment();
      } else {
        this.error = "End date should be after start date";
      }
    },
    cancel() {
      if (this.isNew) {
        this.$router.push(`/`);
        this.$store.commit("setDefaultDetail");
      } else this.$router.push(`/appointment/${this.detail.uid}`);
    },
    addAppointment() {
      let newEntre = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        gender: this.gender,
        status: "pending",
        start: dateFns.format(new Date(this.startTime), "YYYY-MM-DD HH:mm:ss"),
        end: dateFns.format(new Date(this.endTime), "YYYY-MM-DD HH:mm:ss"),
        location: [this.location],
        avatar: this.photo,
        phone: this.phone,
        topics: this.topics
      };
      this.$store.dispatch("addAppointment", newEntre).then(docRef => {
        const uid = docRef.id;
        this.$store.dispatch("fetchAppointments");
        this.$store.dispatch("fetchAppointmentById", uid);
        this.$router.push(`/appointment/${uid}`);
      });
    },

    editAppointment() {
      const edited = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        gender: this.gender,
        start: dateFns.format(new Date(this.startTime), "YYYY-MM-DD HH:mm:ss"),
        end: dateFns.format(new Date(this.endTime), "YYYY-MM-DD HH:mm:ss"),
        location: [this.location],
        avatar: this.photo,
        phone: this.phone,
        topics: this.topics
      };
      const { uid } = this.detail;

      this.$store
        .dispatch("updateAppointment", { id: uid, fields: edited })
        .then(() => {
          this.$store.dispatch("fetchAppointments");
          this.$store.dispatch("fetchAppointmentById", uid);
          this.$router.push(`/appointment/${uid}`);
        });
    },
    selectUser(obj) {
      this.firstName = obj.first_name;
      this.lastName = obj.last_name;
      this.phone = obj.phone;
      this.photo = obj.avatar;
      this.email = obj.email;
    },
    addTopic() {
      this.topics = [...this.topics, { topic: this.newTopic }];
      this.newTopic = "";
    },
    removeTopic(i) {
      this.topics.splice(i, 1);
    },
    fillInAddress() {
      let place = this.autocomplete.getPlace();
      let street = "";
      let route = "";
      for (var i = 0; i < place.address_components.length; i++) {
        let addressType = place.address_components[i].types[0];
        if (addressType === "route") {
          route = place.address_components[i].long_name;
        }
        if (addressType === "street_number") {
          street = place.address_components[i].long_name;
        }
      }
      this.location.street = route + " " + street;
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  padding: 0 6%;
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
  margin: 20px 3%;
  border-top: 1px solid #edf2f5;
  border-bottom: 1px solid #edf2f5;
  padding: 0 3%;
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
.error {
  color: #f36774;
  width: 100%;
}
.actions {
  margin: 0 30px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  .action {
    padding: 5px 10px;
    margin: 0 3px;
    border-width: 2px;

    &:hover {
      color: #54cc9c;
      border-color: #54cc9c;
    }
  }
  .cancel {
    &:hover {
      color: #f36774;
      border-color: #f36774;
    }
  }
}
.input-field {
  width: 100%;
  &.spaced {
    margin: 8px 0;
  }
  label,
  input {
    display: block;
  }
  label {
    font-weight: 600;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    border-radius: 5px;
    padding: 5px 5px;
    border: 1px solid #000034;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>