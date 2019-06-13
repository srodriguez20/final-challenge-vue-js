import Vue from "vue";
import Vuex from "vuex";
import firebase from "./firebase";

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
      let collection = db.collection("appointments");
      return new Promise((resolve, reject) => {
        collection
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
