<template>
  <input
    @input="$emit('update:modelValue', $event.target.value)"
    class="search__input"
    type="text"
    placeholder="Search..."
  />
</template>

<script>
export default {
  name: "SearchFilter",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.search {
  &__input {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    border: 1px solid #519945;
    outline: none;
    text-align: center;
  }
}
</style>
