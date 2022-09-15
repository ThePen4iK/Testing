<template>
  <app-header></app-header>
  <main class="main">
    <router-view />
  </main>
  <app-footer></app-footer>
</template>
<script>

import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";

export default {
  components: { AppFooter, AppHeader },
  created() {
    if(!this.users && this.$route.name != "Login"){
      this.$router.push("/");
    }
  },

};
</script>
<style lang="scss">
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
}

body {
  font-family: 'Roboto', sans-serif;
}

.container {
  width: 100%;
  max-width: 1140px;
  padding: 0 15px;
  margin: 0 auto;
}

.main {
  flex: 1 0 auto;
  background: #A5A5A5;
}

.footer {
  flex: 0 0 auto;
}

img {
  width: auto;
  max-width: 100%;
  height: auto;
}
</style>
