import { createStore } from "vuex";
import users from "./modules/users.js"
import todos from "./modules/todos.js";
export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users, todos,
  },
});
