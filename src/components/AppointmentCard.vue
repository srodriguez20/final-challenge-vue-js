<template>
  <div class="appoinment-card">
    <div class="hour">
      <div>
        <time>3:30 PM</time>
        <time>30 minutes</time>
      </div>
    </div>
    <div class="details">
      <img src="https://robohash.org/debitispossimusmaiores.jpg?size=50x50&set=set1" alt>
      <div>
        <h4>Meghan Smith</h4>
        <address>
          <i class="material-icons">room</i>Intrepid Cafe
        </address>
      </div>
    </div>
    <div class="date-info">
      <time>September 10th</time>
      <span>
        <i>•</i>Confirmed
      </span>
    </div>
    <div class="actions">
      <a href>
        <i class="material-icons">launch</i>
      </a>
      <a href>
        <i class="material-icons">clear</i>
      </a>
    </div>
  </div>
</template>

<script>
export default { props: { reward: Object } };
</script>

<style lang="scss" scoped>
.appoinment-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 15px;
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
    border-right: 1px solid;
    time:first-child {
      font-weight: bold;
    }
  }
}
.details {
  flex-direction: row;
  padding: 0 20px;
  align-items: center;
  img {
    border-radius: 50%;
  }
}
.date-info {
  flex-direction: column;
  padding: 0 20px;
  time {
    font-weight: bold;
  }
}
.actions {
  align-items: center;
  padding: 0 40px;
  i {
    font-size: 14px;
    padding: 0 15px;
  }
}
</style>