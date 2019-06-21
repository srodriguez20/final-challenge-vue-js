<template>
  <section class="appointment-counter" aria-label="meetings counter by month">
    <div class="date">
      <Button icon @clicked="decrease" aria-label="prev month">
        <i class="material-icons">keyboard_arrow_left</i>
      </Button>
      <time>
        <span>{{getMonth}}</span>
        {{getYear}}
      </time>
      <Button icon @clicked="increase" aria-label="next month">
        <i class="material-icons">keyboard_arrow_right</i>
      </Button>
    </div>
    <div class="counter">
      <div>
        <div class="icon confirmed">
          <i class="material-icons">done</i>
        </div>
        <span>
          <strong>{{confirmed}}</strong> Confirmed
        </span>
      </div>
      <div>
        <div class="icon pending">
          <i class="material-icons">schedule</i>
        </div>
        <span>
          <strong>{{pending}}</strong> Pending
        </span>
      </div>
      <div>
        <div class="icon cancelled">
          <i class="material-icons">close</i>
        </div>
        <span>
          <strong>{{cancelled}}</strong> Cancelled
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../components/Button.vue";
import dateFns from "date-fns";
export default {
  data() {
    return {
      now: new Date(),
      pending: 0,
      confirmed: 0,
      cancelled: 0
    };
  },
  components: { Button },
  watch: {
    now() {
      this.fetchCount();
    }
  },
  computed: {
    getMonth() {
      return dateFns.format(this.now, "MMMM");
    },
    getYear() {
      return dateFns.format(this.now, "YYYY");
    }
  },
  methods: {
    increase() {
      this.now = dateFns.addMonths(this.now, 1);
    },
    decrease() {
      this.now = dateFns.subMonths(this.now, 1);
    },
    fetchCount() {
      const start = dateFns.format(this.now, "YYYY-MM");
      const end = dateFns.format(dateFns.addMonths(this.now, 1), "YYYY-MM");
      this.$store
        .dispatch("countAppointments", { start, end })
        .then(counter => {
          this.confirmed = counter.confirmed;
          this.pending = counter.pending;
          this.cancelled = counter.cancelled;
        });
    }
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
  span {
    font-weight: 700;
  }
}

.counter {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #edf2f5;
  font-size: 0.875em;
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
    font-size: 1.125em;
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
</style>