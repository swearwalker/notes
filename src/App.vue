<template>
  <div id="app">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from "@/components/common/Header";
export default {
  name: "App",
  components: {
    HeaderComponent,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
