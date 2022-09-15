<template>
  <header class="header">
    <div class="container">
      <template v-if="userAbout?.name">
        <div class="header__wrapper">
          <div class="header__icon"></div>
          <div class="header__user">{{ userAbout?.name }}</div>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapGetters("users", ["users"]),

    userAbout() {
      return this.users?.find(
        (item) => {
        console.log(item.id === Number(this.$route.params.id));
        return item.id === Number(this.$route.params.id);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100%;
  min-height: 60px;
  background: #474747;
  padding: 15px 0;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #519945;
  }
  &__user {
    font-family: "Roboto", sans-serif;
    font-size: 26px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.025em;
    text-align: left;
    color: #7ede69;
  }
}
</style>
