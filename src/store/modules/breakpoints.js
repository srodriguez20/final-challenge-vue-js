const store = {
  state: { breakpoint: 1 },
  getters: {
    breakpoint(state) {
      return state.breakpoint;
    }
  },
  mutations: {
    setBreakpoint(state, device) {
      state.breakpoint = device;
    }
  }
};
export default store;
