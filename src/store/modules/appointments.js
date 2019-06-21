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
    },
    lastest: ""
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
    appendAppointments(state, list) {
      state.appointments = state.appointments.concat(list);
    },
    setDetail(state, appointment) {
      state.detail = appointment;
    },
    setLast(state, appointment) {
      state.lastest = appointment;
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
              appointment.end = appointment.end.replace(" UTC", "");
              commit("setLast", docSnapshot.id);
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
    fetchMoreAppointments({ state, commit }) {
      const collection = db.collection("appointments");
      return new Promise((resolve, reject) => {
        collection
          .doc(state.lastest)
          .get()
          .then(function(doc) {
            collection
              .orderBy("start")
              .startAfter(doc)
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
                commit("appendAppointments", list);
                resolve();
              });
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAppointmentById({ commit }, id) {
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
    // eslint-disable-next-line no-empty-pattern
    countAppointments({}, { start, end }) {
      const collection = db.collection("appointments");
      return new Promise((resolve, reject) => {
        collection
          .orderBy("start")
          .where("start", ">", start)
          .where("start", "<", end)
          .get()
          .then(querySnapshot => {
            let pending = 0;
            let confirmed = 0;
            let cancelled = 0;
            querySnapshot.forEach(docSnapshot => {
              let appointment = docSnapshot.data();
              if (appointment.status === "pending") pending++;
              if (appointment.status === "confirmed") confirmed++;
              if (appointment.status === "cancelled") cancelled++;
            });
            resolve({ pending, confirmed, cancelled });
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
      return db
        .collection("appointments")
        .doc(id)
        .update(fields);
    }
  }
};
export default store;
