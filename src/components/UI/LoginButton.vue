<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    loginButton: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>

</style>