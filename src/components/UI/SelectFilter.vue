<template>
  <select class="select" :value="modelValue" @change="changeOption">
    <option value="All"><slot></slot></option>
    <option v-for="option in options" :key="option" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  width: 100%;
  height: 25px;
  outline: none;
}
</style>
