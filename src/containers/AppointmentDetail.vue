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
        <avatar v-if="!newEntry" :src="detail.avatar" alt="User Icon"/>
      </div>

      <h3 class="name" v-if="!newEntry">{{fullName}}</h3>
      <input type="text" v-else>

      <span class="phone" v-if="!newEntry">{{phone}}</span>
      <input type="text" v-else>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>
        <time v-if="!newEntry">{{hours}}</time>
        <input type="text" v-else>
      </div>
      <div class="location">
        <h3>Location</h3>
        <address v-if="!newEntry">
          <span>{{detail.location[0].place}}</span>
          <br>
          {{detail.location[0].street}}
        </address>
        <input type="text" v-else>
      </div>
      <div class="topics">
        <h3>Topics</h3>
        <span v-if="!newEntry">{{topics}}</span>
        <input type="text" v-else>
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
    newEntry() {
      return this.detail === null;
    },
    borderStyle() {
      return `card-content ${this.detail.status}`;
    },
    detail() {
      return this.$store.getters.detail;
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
      return this.newEntry ? "pending" : this.detail.status;
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
</style>