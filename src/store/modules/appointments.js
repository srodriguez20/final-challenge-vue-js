import firebase from "../../firebase";
import dateFns from "date-fns";

const db = firebase.firestore();

const store = {
  state: {
    appointments: [],
    detail: null,
    filters: {
      confirmed: false,
      pending: false,
      cancelled: false
    }
  },
  getters: {
    appointments(state) {
      return state.appointments;
    },
    detail(state) {
      return state.detail;
    },
    filters(state) {
      return state.filters;
    }
  },
  mutations: {
    setAppointments(state, list) {
      state.appointments = list;
    },
    setDetail(state, appointment) {
      state.detail = appointment;
    },
    setFilters(state, filters) {
      state.filters = filters;
    }
  },
  actions: {
    fetchAppointments({ commit }) {
      const today = dateFns.format(new Date(), "YYYY-MM-DD HH:mm:ss");
      const collection = db.collection("appointments");
      return new Promise((resolve, reject) => {
        collection
          .orderBy("start")
          .startAt(today)
          .limit(10)
          .get()
          .then(querySnapshot => {
            let list = [];
            querySnapshot.forEach(docSnapshot => {
              let appointment = docSnapshot.data();
              appointment.uid = docSnapshot.id;
              appointment.end = appointment.end.replace("UTC", "");
              list.push(appointment);
            });
            commit("setAppointments", list);
            commit("setDetail", list[0] ? list[0] : null);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
export default store;
