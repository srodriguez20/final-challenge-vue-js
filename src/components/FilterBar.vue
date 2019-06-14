<template>
  <section class="filter-bar">
    <span>Show Only</span>
    <div class="filters">
      <Button active>
        <span slot="text">All</span>
      </Button>
      <Button>
        <span slot="text">Confirmed</span>
      </Button>
      <Button>
        <span slot="text">Pending</span>
      </Button>
      <Button>
        <span slot="text">Cancelled</span>
      </Button>
    </div>
  </section>
</template>

<script>
import Button from "../components/Button.vue";
export default {
  components: { Button }
};
</script>

<style lang="scss" scoped>
.filter-bar {
  display: flex;

  background-color: #111242;
}
.filters {
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>