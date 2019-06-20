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
      topics: [],
      error: ""
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
    },
    isNew() {
      return this.detail === null;
    }
  },
  methods: {
    assignValues() {
      this.firstName = this.detail.first_name;
      this.lastName = this.detail.last_name;
      this.phone = this.detail.phone;
      this.photo = this.detail.avatar;
      this.email = this.detail.email;
      this.gender = this.detail.gender;

      this.startTime = dateFns.format(
        new Date(this.detail.start),
        "YYYY-MM-DDTHH:mm"
      );
      this.endTime = dateFns.format(
        new Date(this.detail.end),
        "YYYY-MM-DDTHH:mm"
      );
      this.location = {
        place: this.detail.location[0].place,
        street: this.detail.location[0].street
      };
      this.topics = [...this.detail.topics];
    },
    resetValues() {
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.photo = imagePlaceholder;
      this.email = "";
      this.gender = "";

      this.startTime = "";
      this.endTime = "";
      this.location = { place: "", street: "" };
      this.newTopic = "";
      this.topics = [];
      this.error = "";
    }
  }
};

export { appointmentMixin };
