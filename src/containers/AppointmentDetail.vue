<template>
  <section class="appointment-detail">
    <div class="date">
      <button>
        <i class="material-icons">keyboard_arrow_left</i>
      </button>
      <time>September 2018</time>
      <button>
        <i class="material-icons">keyboard_arrow_right</i>
      </button>
    </div>
    <div class="status">
      <div>
        <div class="icon">
          <i class="material-icons">done</i>
        </div>
        <span>Confirmed</span>
      </div>
      <div>
        <div class="icon">
          <i class="material-icons">schedule</i>
        </div>
        <span>Pending</span>
      </div>
      <div>
        <div class="icon">
          <i class="material-icons">close</i>
        </div>
        <span>Cancelled</span>
      </div>
    </div>
    <div class="details">
      <h2>Klatsch Detail</h2>
      <span>
        <i class="material-icons">fiber_manual_record</i>Confirmed
      </span>
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
      <h3>Meghan Smith</h3>
      <span>+1 (978) 711 - 0497</span>
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
import Avatar from "../components/Avatar.vue";
export default {
  components: { Avatar }
};
</script>

<style lang="scss" scoped>
.date {
  display: flex;
  flex-direction: row;
  justify-content: center;
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
    background-color: blanchedalmond;
    justify-content: center;
    border-radius: 50%;
    i {
      font-size: 15px;
      font-weight: 600;
    }
  }
  i,
  span {
    display: block;
    margin: auto;
  }
}
.details {
  display: flex;
  flex-direction: column;
  align-items: center;
  .users {
    display: flex;
    flex-direction: row;
    align-items: center;
    i {
      font-size: 35px;
      margin: 0 20px;
    }
  }
}
.more-details {
  margin: 20px 15px;
  border-top: 1px solid #edf2f5;
  border-bottom: 1px solid #edf2f5;
  padding: 15px;
}
</style>