<template>
  <section class="filter-bar" aria-label="filter the meetings">
    <span class="filter-label" v-if="breakpoint>lg || !mobileOpen">Show Only</span>
    <Button
      class="mobile-icon"
      v-if="breakpoint<=lg"
      icon
      @clicked="mobileOpen=!mobileOpen"
      aria-label="open filter list"
    >
      <i class="material-icons">{{mobileOpen?"keyboard_arrow_up":"keyboard_arrow_down"}}</i>
    </Button>
    <div class="filter-list" v-if="breakpoint>lg || mobileOpen">
      <Button :active="all" @clicked="toggleAll" :aria-selected="all?'true':'false'">
        <span>All</span>
      </Button>
      <Button
        class="confirmed"
        @clicked="confirmed = !confirmed"
        :active="confirmed"
        :aria-selected="confirmed?'true':'false'"
      >
        <span>
          Confirmed
          <i class="material-icons confirmed">done</i>
        </span>
      </Button>
      <Button
        class="pending"
        @clicked="pending = !pending"
        :active="pending"
        :aria-selected="pending?'true':'false'"
      >
        <span>
          Pending
          <i class="material-icons pending">schedule</i>
        </span>
      </Button>
      <Button
        class="cancelled"
        @clicked="cancelled = !cancelled"
        :active="cancelled"
        :aria-selected="cancelled?'true':'false'"
      >
        <span>
          Cancelled
          <i class="material-icons cancelled">close</i>
        </span>
      </Button>
    </div>
  </section>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  data() {
    return {
      mobileOpen: false,
      confirmed: false,
      pending: false,
      cancelled: false
    };
  },
  computed: {
    all() {
      return !this.confirmed && !this.pending && !this.cancelled;
    }
  },
  components: { Button },
  beforeUpdate: function() {
    this.$store.commit("setFilters", {
      confirmed: this.confirmed,
      pending: this.pending,
      cancelled: this.cancelled
    });
  },
  methods: {
    toggleAll() {
      this.confirmed = false;
      this.pending = false;
      this.cancelled = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-bar {
  background-color: #111242;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
  border-radius: 20px;
  position: relative;
  font-size: 0.875em;
}
.filter-label {
  margin-left: 15px;
  color: #9e9e9e;
}
.mobile-icon {
  margin: 0 3px;
  color: #9e9e9e;
}
.filter-list {
  z-index: 2;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #111242;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  @media (min-width: 960px) {
    border-radius: 0;
    position: initial;
    width: 80%;
    flex-direction: row;
    padding: 0;
    background-color: transparent;
    justify-content: space-evenly;
    box-shadow: initial;
  }
  i {
    font-size: 1em;
  }
  button {
    margin: 5px 5px;
    width: 120px;

    @media (min-width: 960px) {
      margin: 0 3px;
    }
  }
  .confirmed {
    span i {
      color: #4d8ee2;
    }
    &:hover {
      border-color: #4d8ee2;
    }
  }
  .pending {
    span i {
      color: #f8a720;
    }
    &:hover {
      border-color: #f8a720;
    }
  }
  .cancelled {
    span i {
      color: #f36774;
    }
    &:hover {
      border-color: #f36774;
    }
  }
}
</style>