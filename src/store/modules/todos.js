import todosApi from "@/api/todos";
import { setItem, getItem } from "@/helpers/localStorage";

export default {
  name: "todos",
  namespaced: true,
  state: {
    data: null,
    errors: null,
    isLoading: false,
    favoritedID: getItem("favoritedID") ? getItem("favoritedID") : [],
  },
  getters: {
    todos(state) {
      return state.data;
    },
    usersId: (state) => {
      return [
        ...new Set(
          state.data.map((item) => {
            return item.userId;
          })
        ),
      ].map((item) => {
        return {
          name: item,
          value: item,
        };
      });
    },
    errors(state) {
      return state.errors;
    },
    isLoading(state) {
      return state.isLoading;
    },
    favorites(state) {
      return state.favoritedID.map((item) => {
        return state.data.find((elem) => elem.id === item);
      });
    },

    inFavoritedID: (state) => (id) =>
      state.favoritedID.find((item) => item === id),
  },
  mutations: {
    todosStart(state) {
      state.data = null;
      state.errors = null;
      state.isLoading = true;
    },
    todosSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    todosFail(state, payload) {
      state.isLoading = false;
      state.errors = payload;
    },
    createPostStart() {},
    createPostSuccess(state, payload) {
      state.data = [...state.data, payload];
    },
    createPostFail() {},
    setToFavorite(state, id) {
      state.favoritedID.push(id);
      setItem("favoritedID", state.favoritedID);
    },
    removeFromFavorite(state, id) {
      state.favoritedID.splice(
        state.favoritedID.findIndex((item) => item === id),
        1
      );
      setItem("favoritedID", state.favoritedID);
    },
  },
  actions: {
    async getTodos({ commit }) {
      commit("todosStart");
      return await todosApi.getTodos().then((response) => {
        commit("todosSuccess", response);
        console.log("test");
      });
    },

    createTodo({ commit }, credentials) {
      commit("createPostStart");
      return new Promise((resolve) => {
        todosApi.createTodo(credentials).then((item) => {
          commit("createPostSuccess", item);
          resolve(item);
        });
      });
    },
  },
};
