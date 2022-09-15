<template>
  <section class="about">
    <div class="container">
      <div class="test" v-if="isLoading">Loading...</div>
      <div class="about__wrapper" v-if="todos">
        <aside class="aside">
          <ul class="aside__list">
            <li class="aside__item">
              <select-filter :options="options" v-model="selectSort"
                >All
              </select-filter>
            </li>
            <li class="aside__item">
              <select-filter :options="usersId" v-model="selectSortUsers"
                >All Users
              </select-filter>
            </li>
          </ul>
          <button class="aside__create" @click="modalIsOpen = true">
            Create Todo
          </button>
        </aside>
        <div class="about__content">
          <search-filter v-model.trim="searchInput"></search-filter>
          <ul class="about__list" v-if="searchInputTodos.length > 0">
            <li
              class="about__item"
              v-for="item in searchInputTodos"
              :key="item.id"
            >
              <todo-item
                :id="item.id"
                :title="item.title"
                :isCompleted="item.completed"
              ></todo-item>
            </li>
          </ul>
          <span v-else>Пусто</span>
        </div>
      </div>
    </div>
    <app-modal v-model="modalIsOpen">
      <form @submit.prevent="onSubmit">
        <app-input v-model.trim="fieldsForTodo.userId"></app-input>
        <app-input v-model.trim="fieldsForTodo.title"></app-input>
        <button class="creat" :disabled="!check">Create</button>
      </form>
    </app-modal>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SelectFilter from "@/components/UI/SelectFilter.vue";
import SearchFilter from "@/components/UI/SearchFilter";
import TodoItem from "@/components/UI/TodoItem";
import AppModal from "@/components/UI/AppModal";
import AppInput from "@/components/UI/AppInput";

export default {
  name: "Main",
  components: { AppInput, AppModal, TodoItem, SearchFilter, SelectFilter },
  data() {
    return {
      selectSort: "All",
      selectSortUsers: "All",
      searchInput: "",
      modalIsOpen: false,
      fieldsForTodo: {
        userId: "",
        title: "",
      },
      options: [
        {
          value: "Completed",
          name: "Completed",
        },
        {
          value: "Uncompleted",
          name: "Uncompleted",
        },
        {
          value: "Favorites",
          name: "Favorites",
        },
      ],
    };
  },
  created() {
    this.getTodos();
  },
  methods: {
    ...mapActions("todos", ["getTodos", "createTodo"]),
    checkData() {
      this.getTodos().then((response) => {
        console.log(response, "component");
      });
    },
    onSubmit() {
      const obj = {
        userId: Number(this.fieldsForTodo.userId),
        title: this.fieldsForTodo.title,
      };
      this.createTodo(obj).then((data) => {
        this.fieldsForTodo.userId = "";
        this.fieldsForTodo.title = "";
        this.modalIsOpen = false;
        console.log(data.id, "creat todo: id");
      });
    },
  },
  computed: {
    ...mapGetters("users", ["currentUser"]),
    ...mapGetters("todos", ["isLoading", "todos", "usersId", "favorites"]),

    sortedSelectFirst() {
      if (this.selectSort === "All") {
        return this.todos;
      } else if (this.selectSort === "Completed") {
        return this.todos.filter((item) => item.completed === true);
      } else if (this.selectSort === "Uncompleted") {
        return this.todos.filter((item) => item.completed === false);
      } else if (this.selectSort === "Favorites") {
        return this.favorites;
      } else {
        return this.todos;
      }
    },
    sortedSelectUsers() {
      if (this.selectSortUsers === "All") {
        return this.sortedSelectFirst;
      } else {
        return this.sortedSelectFirst.filter((item) => {
          return item.userId === parseInt(this.selectSortUsers);
        });
      }
    },

    searchInputTodos() {
      return this.sortedSelectUsers.filter((item) =>
        item.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },

    check() {
      return Object.values(this.fieldsForTodo).every((item) => item.length > 0);
    },
  },
};
</script>

<style scoped lang="scss">
.about {
  padding: 60px 0;

  &__wrapper {
    display: grid;
    grid-template-columns: 180px 1fr;
    gap: 20px;
  }

  &__list {
    list-style: none;
    margin-top: 20px;
  }

  &__item {
    width: 100%;
    border: 1px solid #519945;

    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__article {
  }
}

.aside {
  &__list {
    list-style: none;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  &__create {
    cursor: pointer;
    width: 100%;
    height: 60px;
    margin-top: 20px;
    font-size: 18px;
    color: #000;
    background: #fff;
    border: none;
  }
}

.creat {
  width: 100%;
  max-width: 100px;
  height: 40px;
  background: #2f9c1e;
  border: none;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
}
</style>
