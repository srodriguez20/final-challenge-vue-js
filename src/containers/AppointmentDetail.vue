<template>
  <section class="appointment-detail">
    <div class="date">
      <Button icon :onClick="increase">
        <i class="material-icons" slot="icon">keyboard_arrow_left</i>
      </Button>
      <time>September 2018</time>
      <Button icon :onClick="decrease">
        <i class="material-icons" slot="icon">keyboard_arrow_right</i>
      </Button>
    </div>
    <div class="status">
      <div>
        <div class="icon confirmed">
          <i class="material-icons">done</i>
        </div>
        <span>
          <strong>5</strong> Confirmed
        </span>
      </div>
      <div>
        <div class="icon pending">
          <i class="material-icons">schedule</i>
        </div>
        <span>
          <strong>5</strong> Pending
        </span>
      </div>
      <div>
        <div class="icon cancelled">
          <i class="material-icons">close</i>
        </div>
        <span>
          <strong>5</strong> Cancelled
        </span>
      </div>
    </div>
    <div class="details">
      <h2>Klatsch Detail</h2>
      <status value="confirmed"/>
      <div class="users">
        <avatar
          src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
          alt="User Icon"
        />
        <i class="material-icons">whatshot</i>
        <avatar
          src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
          alt="User Icon"
        />
      </div>
      <h3 class="name">Meghan Smith</h3>
      <span class="phone">+1 (978) 711 - 0497</span>
    </div>
    <div class="more-details">
      <div class="time">
        <h3>Date&Time</h3>
        <time>3:30 PM - 4:00 PM</time>
      </div>
      <div class="location">
        <h3>Location</h3>
        <address>
          <span>Intrepid Cafe</span>
          <br>150 First St, Cambridge, MA 02141
        </address>
      </div>
      <div class="topics">
        <h3>Topics</h3>
        <span>Movies, Health, Food</span>
      </div>
    </div>
    <div class="actions">
      <h3>Status</h3>
      <a>Cancel Klatsch</a>
    </div>
  </section>
</template>

<script>
import Button from "../components/Button.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
export default {
  components: { Avatar, Status, Button },
  methods: {
    increase() {},
    decrease() {}
  }
};
</script>

<style lang="scss" scoped>
.date {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #edf2f5;
  padding: 20px 0;
}
.appointment-detail {
  background-color: #ffffff;
  width: 400px;
}
.status {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #edf2f5;
  font-size: 14px;
  .icon {
    width: 35px;
    height: 35px;
    display: flex;
    margin: auto;
    justify-content: center;
    border-radius: 50%;
    i {
      color: #ffffff;
      margin: auto;
      font-size: 15px;
      font-weight: 600;
    }
  }
  span {
    display: block;
    padding-top: 20px;
    color: #9e9e9e;
  }
  strong {
    color: #000000;
    font-size: 18px;
    font-weight: 700;
  }
  .confirmed {
    background-color: #4d8ee2;
  }
  .pending {
    background-color: #f8a720;
  }
  .cancelled {
    background-color: #f36774;
  }
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