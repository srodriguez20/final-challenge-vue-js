import firebase from "../../firebase";
import dateFns from "date-fns";

const db = firebase.firestore();

const store = {
  state: {
    users: [],
    currentUser: null
  },
  getters: {
    users(state) {
      return state.users;
    },
    currentUser(state) {
      return state.currentUser;
    }
  },
  mutations: {
    setUsers(state, list) {
      state.users = list;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    fetchUsers({ commit }) {
      const collection = db.collection("users");
      return new Promise((resolve, reject) => {
        collection
          .get()
          .then(querySnapshot => {
            let list = [];
            querySnapshot.forEach(docSnapshot => {
              let user = docSnapshot.data();
              user.uid = docSnapshot.id;
              list.push(user);
            });

            commit("setUsers", list);
            commit("setCurrentUser", list[0] ? list[0] : null);
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
