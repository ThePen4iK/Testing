<template>
  <div class="field">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
  }
};
</script>

<style scoped lang="scss">
.field{
  margin-bottom: 40px;
}
input {
  display: block;
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  text-align: center;
  outline: none;
}
</style>