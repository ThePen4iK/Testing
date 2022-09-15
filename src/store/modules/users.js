import getUsers from "@/api/users.js";
import { getItem, setItem } from "@/helpers/localStorage";

export default {
  name: "users",
  namespaced: true,
  state: {
    users: null,
    errors: null,
    isLoading: false,
    currentUser: getItem("currentUser") ? getItem("currentUser") : null,
  },
  getters: {
    users(state) {
      return state.users;
    },
    isLoading(state) {
      return state.isLoading;
    },
    currentUser(state){
      return state.currentUser;
    },
  },
  mutations: {
    usersStart(state) {
      state.users = null;
      state.errors = null;
      state.isLoading = true;
      state.currentUser = null;
    },
    usersSuccess(state, payload) {
      state.users = payload;
      state.isLoading = false;
    },
    usersFail(state, payload) {
      state.errors = payload;
      state.isLoading = false;
    },
    isCurrentUserSuccess(state, payload){
      state.currentUser = payload;
      setItem("currentUser", state.currentUser);
    },
    isCurrentUserFail(state){
      state.currentUser = null,
        setItem("currentUser", null);
    }
  },
  actions: {
    async getUsers({ commit }) {
      const result = await getUsers();
      commit("usersStart");
      commit("usersSuccess", result);
      return result;
    },

    getCurrentUser({commit, state}, {username, phone}){
      const user = state.users.find((item)=> item.username === username);
      if(!user || user.phone !==phone){
        commit("isCurrentUserFail")
      }else{
        commit("isCurrentUserSuccess", user)
      }
    }
  },
};
