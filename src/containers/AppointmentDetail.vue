<template>
  <section class="appointment-detail">
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status :value="statusValue"/>
      <div class="users">
        <avatar
          src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
          alt="User Icon"
        />
        <i class="material-icons">whatshot</i>
        <avatar v-if="!editing" :src="detail.avatar" alt="User Icon"/>
      </div>

      <h3 class="name" v-if="!editing">{{fullName}}</h3>

      <template v-else>
        <div class="input-field spaced">
          <label for="firstname">First Name</label>
          <input type="text" name="firstname" placeholder="Jhon">
        </div>
        <div class="input-field spaced">
          <label for="lastname">Last Name</label>
          <input type="text" name="lastname" placeholder="Doe">
        </div>
      </template>

      <span class="phone" v-if="!editing">{{phone}}</span>

      <template v-else>
        <div class="input-field spaced">
          <label for="phone">Phone</label>
          <input type="tel" name="phone" placeholder="(123) 456 - 7890">
        </div>
      </template>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>

        <time v-if="!editing">{{hours}}</time>

        <template v-else>
          <div class="input-field spaced">
            <label for="date">Date</label>
            <input type="date" name="date">
          </div>
          <div class="input-field">
            <label for="start-time">Start Time</label>
            <input type="time" name="start-time">
          </div>
          <div class="input-field">
            <label for="end-time">End Time</label>
            <input type="time" name="end-time">
          </div>
        </template>
      </div>
      <div class="location">
        <h3>Location</h3>

        <address v-if="!editing">
          <span>{{detail.location[0].place}}</span>
          <br>
          {{detail.location[0].street}}
        </address>

        <template v-else>
          <div class="input-field">
            <label for="location">Location</label>
            <input type="text" name="location" placeholder="St 123, Av">
          </div>
        </template>
      </div>
      <div class="topics">
        <h3>Topics</h3>
        <span v-if="!editing">{{topics}}</span>
        <template v-else>
          <div class="input-field">
            <label for="topics">Topics</label>
            <input type="text" name="topics" placeholder="Movies, Health...">
          </div>
        </template>
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
</template>

<script>
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
import dateFns from "date-fns";
export default {
  components: { Avatar, Status, Button },
  props: {},
  computed: {
    editing() {
      return this.detail === null;
    },
    borderStyle() {
      return `card-content ${this.detail.status}`;
    },
    fullName() {
      console.log(this.detail);
      return `${this.detail.first_name} ${this.detail.last_name}`;
    },
    phone() {
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

    topics() {
      let list = "";
      this.detail.topics.forEach(obj => {
        list += obj.topic + ", ";
      });
      return list;
    },
    statusValue() {
      return this.editing ? "pending" : this.detail.status;
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