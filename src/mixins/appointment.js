import dateFns from "date-fns";
import imagePlaceholder from "../assets/no-photo.png";
const appointmentMixin = {
  data() {
    return {
      firstName: "",
      lastName: "",
      photo: imagePlaceholder,
      phone: "",
      email: "",
      gender: "",
      startTime: "",
      endTime: "",
      location: { place: "", street: "" },
      newTopic: "",
      topics: []
    };
  },
  created() {
    if (this.detail !== null) this.assignValues();
  },
  watch: {
    detail() {
      this.detail !== null ? this.assignValues() : this.resetValues();
    }
  },
  computed: {
    detail() {
      return this.$store.getters.detail;
    }
  },
  methods: {
    isNew() {
      return this.detail === null;
    },
    assignValues() {
      this.firstName = this.detail.first_name;
      this.lastName = this.detail.last_name;
      this.phone = this.detail.phone;
      this.photo = this.detail.avatar;
      this.email = this.detail.email;
      this.gender = this.detail.gender;

      this.date = this.detail.start;
      this.startTime = dateFns.format(
        new Date(this.detail.start),
        "YYYY-MM-DDTHH:mm"
      );
      this.endTime = dateFns.format(
        new Date(this.detail.end),
        "YYYY-MM-DDTHH:mm"
      );
      this.location = this.detail.location[0].street;
      this.topics = [...this.detail.topics];
    },
    resetValues() {
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.photo = imagePlaceholder;
      this.email = "";
      this.gender = "";

      this.date = "";
      this.startTime = "";
      this.endTime = "";
      this.location = "";
      this.newTopic = "";
      this.topics = [];
    }
  }
};

export { appointmentMixin };
