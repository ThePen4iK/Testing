<template>
  <div class="modal" v-if="modelValue" @click="hideModal">
    <div class="modal__container" @click.stop>
      <button class="modal__close" @click="hideModal">
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="30px"
          height="30px"
        >
          <path
            d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
          />
        </svg>
      </button>
      <h2 class="modal__header">Create Todo</h2>
      <div class="modal__content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    hideModal() {
      this.$emit("update:modelValue", false);
    },
  },
};
</script>

<style scoped lang="scss">
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: grey;
  &__container{
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 400px;
    border-radius: 15px;
    background: #fff;
  }
  &__header{
    padding: 10px;
    margin-bottom: 20px;
    text-align: center;
  }
  &__close{
    width: 30px;
    height: 30px;
    background: transparent;
    border: none;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 15px;
    right: 15px;
  }
  &__content{
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>
