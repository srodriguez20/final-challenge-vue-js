<template>
  <div class="appoinment-card" tabindex="0">
    <div class="hour">
      <div>
        <time>3:30 PM</time>
        <time>30 minutes</time>
      </div>
    </div>
    <div class="details">
      <avatar
        src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1"
        alt="User Icon"
      />
      <div>
        <h4>Meghan Smith</h4>
        <address>
          <i class="material-icons">room</i>Intrepid Cafe
        </address>
      </div>
    </div>
    <div class="date-info">
      <time>September 10th</time>
      <status value="cancelled"/>
    </div>
    <div class="actions">
      <icon-button link>
        <i class="material-icons" slot="icon">launch</i>
      </icon-button>
      <icon-button link>
        <i class="material-icons" slot="icon">clear</i>
      </icon-button>
    </div>
  </div>
</template>

<script>
import IconButton from "../components/IconButton.vue";
import Avatar from "../components/Avatar.vue";
import Status from "../components/Status.vue";
export default {
  components: { Avatar, Status, IconButton },
  props: { reward: Object }
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
  border-left: 5px solid #4d8ee2;
  border-left: 5px solid #f8a720;
  border-left: 5px solid #f36774;
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