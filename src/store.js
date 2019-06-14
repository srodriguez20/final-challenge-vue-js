import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";
import dateFns from "date-fns";

Vue.use(Vuex);
const db = firebase.firestore();

export default new Vuex.Store({
  state: { appointments: [] },
  getters: {
    appointments(state) {
      return state.appointments;
    }
  },
  mutations: {
    setAppointments(state, list) {
      state.appointments = list;
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
              appointment.id = docSnapshot.id;
              list.push(appointment);
            });
            commit("setAppointments", list);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});
