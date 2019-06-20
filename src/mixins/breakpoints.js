import { xs, md, lg, xl } from "../constants";
const breakpointsMixin = {
  data() {
    return { xs: xs, md: md, lg: lg, xl: xl };
  },
  computed: {
    breakpoint() {
      return this.$store.getters.breakpoint;
    }
  }
};

export { breakpointsMixin };
