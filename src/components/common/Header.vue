<template>
  <header
    id="header"
    class="fixed top-0 left-0 right-0 py-4 w-full bg-gray-700"
  >
    <div class="container">
      <div class="header flex items-center justify-between">
        <router-link :to="indexLink" class="header__link text-white"
          >Home</router-link
        >
        <div class="header__actions actions flex items-center">
          <router-link :to="createLink" class="header__link text-white">
            <i class="fas fa-plus"></i>
          </router-link>
          <router-link :to="settingsLink" class="header__link text-white ml-4">
            <i class="fas fa-sliders-h"></i>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    indexLink() {
      return {
        name: "index",
      };
    },
    createLink() {
      return {
        name: "create",
      };
    },
    settingsLink() {
      return {
        name: "settings",
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
