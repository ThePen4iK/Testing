<template>
  <div class="form__group" v-for="(field, index) in fields" :key="field.id">
    <label>
      <input
        class="form__input"
        :type="field.type"
        :placeholder="field.placeholder"
        @input="$emit('getInput', $event.target.value, index)"
      />
    </label>
    <span class="form__error" v-if="!field.validate && field.activated"
      >error</span
    >
  </div>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    fields: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  emits: ['getInput'],

};
</script>

<style lang="scss">
.form {
  &__group {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__input {
    width: 100%;
    border: none;
    outline: none;

    padding: 10px;
    background: #ffffff;
    border-radius: 5px;

    font-family: "Roboto", sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    text-align: left;
    color: #353535;

    &::placeholder {
      font-family: "Roboto", sans-serif;
      font-size: 17px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: -0.025em;
      text-align: left;
      color: #353535;
    }
  }

  &__error {
    color: red;
  }

  &__activated {
    display: block;
  }
}

</style>
