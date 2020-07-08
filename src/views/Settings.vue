<template>
  <main id="main">
    <div class="container flex flex-wrap items-center justify-around">
      <h1 class="title w-full text-center uppercase text-xl mb-4">
        Choose storage type:
      </h1>
      <button
        @click="changeStorageType('localstorage')"
        :class="[$store.state.storageType === 'localstorage' ? '' : 'opacity-50']"
        class="btn btn-success"
      >
        Local Storage
      </button>
      <button
        @click="changeStorageType('firebase')"
        :class="[$store.state.storageType === 'firebase' ? '' : 'opacity-50']"
        class="btn btn-danger"
      >
        Firebase
      </button>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {};
  },
  computed: {
    type() {
      return this.$store.state.storageType;
    },
  },
  methods: {
    changeStorageType(selected) {
      this.$store.commit('changeStorageType', selected);
    },
  },
};
</script>

<style lang="scss" scoped></style>
