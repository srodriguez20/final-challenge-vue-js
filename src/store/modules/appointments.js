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
    setDefaultDetail(state) {
      state.detail = state.appointments[0];
    },
    setFilters(state, filters) {
      state.filters = filters;
    }
  },
  actions: {
    fetchAppointments({ state, commit }) {
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
            if (state.detail === null)
              commit("setDetail", list[0] ? list[0] : null);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAppointmentById({ commit }, id) {
      console.log("TCL: fetchAppointmentById -> id", id);

      return new Promise((resolve, reject) => {
        db.collection("appointments")
          .doc(id)
          .get()
          .then(doc => {
            if (doc.exists) {
              let appointment = doc.data();
              appointment.uid = id;
              appointment.end = appointment.end.replace("UTC", "");
              commit("setDetail", appointment);
            } else {
              console.log("No such document!");
            }
            resolve();
          })
          .catch(error => reject(error));
      });
    },
    countAppointments({ state, commit }) {
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
            if (state.detail === null)
              commit("setDetail", list[0] ? list[0] : null);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // eslint-disable-next-line no-empty-pattern
    addAppointment({}, obj) {
      let newObj = obj;
      newObj.status = "pending";

      return db.collection("appointments").add(newObj);
    },
    // eslint-disable-next-line no-empty-pattern
    updateAppointment({}, { id, fields }) {
      console.log("TCL: updateAppointment -> fields", fields);
      console.log("TCL: updateAppointment -> id", id);

      return db
        .collection("appointments")
        .doc(id)
        .update(fields);
    }
  }
};
export default store;
