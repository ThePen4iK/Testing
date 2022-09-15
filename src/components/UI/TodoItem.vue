<template>
  <article class="article" :class="{ completed: isCompleted }">
    <p class="article__text">{{ title }}</p>
    <button
      class="article__btn"
      @click="setToFavorite(id)"
      v-if="!inFavoritedID(id)"
    >
      Add Favorite
    </button>

    <button
      class="article__btn"
      @click="removeFromFavorite(id)"
      v-if="inFavoritedID(id)"
      :class="{ active: inFavoritedID(id) }"
    >
      Remove Favorite
    </button>
  </article>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "TodoItem",
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters("todos", ["inFavoritedID"]),
  },
  methods: {
    ...mapMutations("todos", ["setToFavorite", "removeFromFavorite"]),
  },
};
</script>

<style scoped lang="scss">
.article {
  padding: 15px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.completed {
    border: 2px solid tomato;
  }
  &__text {
    font-size: 18px;
  }
  &__btn {
    background: transparent;
    width: 100%;
    max-width: max-content;
    height: 40px;
    padding: 10px;
    border: 1px solid #7ede69;
    cursor: pointer;
    &.active {
      color: #fff;
      background: #074e1e;
    }
  }
}
</style>
