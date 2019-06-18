const appointmentMixin = {
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
      topics: ""
    };
  },
  computed: {
    detail() {
      return this.$store.getters.detail;
    }
  },
  created() {
    if (this.detail !== null) assignValues();
  },
  methods: {
    assignValues() {
      this.firstName = this.detail.first_name;
      this.lastName = this.detail.last_name;
      this.phone = this.detail.phone;
      this.date = this.detail.start;
      this.startTime = this.detail.start;
      this.endTime = this.detail.end;
      this.location = this.detail.location[0].street;
      this.topics = this.detail.topics;
    }
  }
};

export { appointmentMixin };
