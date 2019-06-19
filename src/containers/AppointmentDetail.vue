<template>
  <section class="appointment-detail" v-if="!editing">
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status :value="statusValue"/>
      <div class="users">
        <avatar
          src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
          alt="User Icon"
        />
        <i class="material-icons">whatshot</i>
        <avatar :src="detail.avatar" alt="User Icon"/>
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
        <a v-if="statusValue==='pending' ">Confirm Klatsch</a>
        <a v-if="statusValue==='confirmed' || statusValue==='pending' ">Cancel Klatsch</a>
      </div>
    </div>
  </section>
  <form class="appointment-detail" v-on:submit.prevent v-else>
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status :value="statusValue"/>
      <div class="users">
        <avatar
          src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
          alt="User Icon"
        />
        <i class="material-icons">whatshot</i>
        <avatar :src="photo" alt="User Icon"/>
      </div>
      <div class="input-field spaced">
        <label for="firstname">First Name</label>
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
        <label for="lastname">Last Name</label>
        <input type="text" v-model="lastName" id="lastname" name="lastname" placeholder="E.g. Doe">
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
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          id="email"
          name="email"
          placeholder="E.g. example@email.com"
        >
      </div>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>
        <div class="input-field spaced">
          <label for="start-time">Start Time</label>
          <input type="datetime-local" v-model="startTime" id="start-time" name="start-time">
        </div>
        <div class="input-field spaced">
          <label for="end-time">End Time</label>
          <input type="datetime-local" v-model="endTime" id="end-time" name="end-time">
        </div>
      </div>
      <div class="location">
        <h3>Location</h3>
        <div class="input-field">
          <label for="location">Location</label>
          <input
            type="text"
            v-model="location.street"
            id="location"
            name="location"
            placeholder="E.g. St 123, Av"
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
      <Button primary @clicked="()=>isNew==true?addAppointment():editAppointment()">
        <i class="material-icons" v-if="isNew==true">add</i>
        {{isNew==true? "Add":"Update"}}
      </Button>
    </div>
  </form>
</template>

<script>
import dateFns from "date-fns";
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
import Chip from "../components/Chip.vue";
import Autocomplete from "../components/Autocomplete.vue";
import { appointmentMixin } from "../mixins/appointment";

export default {
  data() {
    return {
      edit: false
    };
  },
  components: { Avatar, Status, Button, Autocomplete, Chip },
  mixins: [appointmentMixin],
  created() {
    this.hash === "#edit" ? (this.edit = true) : (this.edit = false);
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
    users() {
      return this.$store.getters.users;
    },
    editing() {
      return this.isNew() || this.edit;
    },
    borderStyle() {
      return `card-content ${this.detail.status}`;
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
    day() {
      return dateFns.format(new Date(this.detail.start), "MMMM Do");
    },
    topicsFormated() {
      let list = "";
      this.detail.topics.forEach(obj => {
        list += obj.topic + ", ";
      });
      return list;
    },
    statusValue() {
      return this.isNew() ? "pending" : this.detail.status;
    }
  },
  methods: {
    addAppointment() {
      let newEntre = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        gender: this.gender,
        status: "pending",
        start: this.startTime,
        location: this.location,
        avatar: this.photo,
        phone: this.phone,
        topics: this.topics
      };
      console.log("TCL: addAppointment -> newEntre", newEntre);
      console.log("add");
    },
    editAppointment() {
      let edited = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        gender: this.gender,
        status: "pending",
        start: this.startTime,
        location: this.location,
        avatar: this.photo,
        phone: this.phone,
        topics: this.topics
      };
      console.log("TCL: addAppointment -> newEntre", edited);
      console.log("edit");
    },
    selectUser(obj) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.appointment-detail {
}
.details {
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
    display: flex;
    flex-wrap: wrap;
  }
}
.actions {
  margin: 0 30px;
}
.input-field {
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
    border-radius: 5px;
    padding: 5px 5px;
    border: 1px solid #000034;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>