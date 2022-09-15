<template>
  <section class="authorization">
    <div class="container">
      <div class="authorization__wrapper">
        <div class="authorization__header">
          <p class="authorization__text">description</p>
        </div>
        <form @submit.prevent="checkForm" class="authorization__form">
          <p class="authorization__descr">description</p>
          <div class="authorization__wrap">
            <login-input :fields="fields" @getInput="validateFields"></login-input>
          </div>
          <span v-if="flag">login error</span>
          <login-button class="authorization__btn">Auth</login-button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import LoginInput from "@/components/UI/LoginInput";
import LoginButton from "@/components/UI/LoginButton";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppLogin",
  components: { LoginInput, LoginButton },
  data() {
    return {
      flag: false,
      fields: [
        {
          id: 1,
          type: "text",
          placeholder: "Username",
          value: "",
          activated: false,
          validate: false,
          pattern: /^[a-zA-Z]+$/
        },
        {
          id: 2,
          type: "tel",
          placeholder: "Phone Number",
          value: "",
          activated: false,
          validate: false,
          pattern: /^[0-9+\s()x.-]+$/
        }
      ]
    };
  },
  methods: {
    ...mapActions("users", ["getUsers"]),
    checkForm() {
      this.getUsers().then((response) => {
        console.log(response);
        this.users.forEach(item => {
          if (item.username === this.fields[0].value && item.phone === this.fields[1].value) {
            this.$router.push({ name: "Main", params: { id: item.id, slug: item.username } });
          } else {
            this.flag = true;
          }
        });
      });
    },
    validateFields(value, index) {
      const field = this.fields[index];
      field.value = value;
      field.validate = field.pattern.test(value);
      field.value === "" ? (field.activated = false) : (field.activated = true);
    },
  },
  computed: {
    ...mapGetters("users", ["users"]),
  }
};
</script>

<style scoped lang="scss">
.authorization {
  width: 100%;
  min-height: 750px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #828282;

  .container {
    width: 100%;
    max-width: 477px;
    padding: 0 15px;
    margin: 0 auto;
  }

  &__header {
    background: #A5A5A5;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  }

  &__text {
    font-family: "Roboto", sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    text-align: left;
    color: #5F5F5F;
  }

  &__form {
    background: #C3C3C3;
    padding: 15px 25px 30px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  &__descr {
    font-family: "Roboto", sans-serif;
    font-size: 15px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    text-align: left;
    color: #5F5F5F;
  }

  &__wrap {
    list-style: none;
    margin-top: 14px;
    margin-bottom: 25px;
  }

  &__btn {
    background: #519945;
    border: none;
    border-radius: 5px;
    padding: 10px;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: "Roboto", sans-serif;
    font-size: 17px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: -0.025em;
    text-align: left;
    color: #FFFFFF;
    cursor: pointer;
  }
}
</style>