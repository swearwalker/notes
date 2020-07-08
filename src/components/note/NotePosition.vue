<template>
  <li class="note-item w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 mb-4">
    <div class="note-item__container flex flex-col shadow bg-white rounded p-4">
      <h2 class="note-item__name title mb-4 uppercase text-xl">
        {{ data.name }}
      </h2>
      <p class="note-item__content description mb-2">{{ data.content }}</p>
      <div class="note-item__actions actions flex items-center justify-between">
        <div class="actions__badge badge badge-info">
          <i class="fas fa-comments actions__icon"></i>
          <span class="actions__quantity ml-2">{{ data.comments.length }}</span>
        </div>
        <router-link :to="viewLink" class="actions__btn btn btn-info ml-auto">
          <i class="fas fa-eye actions__icon"></i>
        </router-link>
        <router-link :to="editLink" class="actions__btn btn btn-success ml-2">
          <i class="fas fa-pen actions__icon"></i>
        </router-link>
        <button @click="deleteNote" class="actions__btn btn btn-danger ml-2">
          <i class="fas fa-trash-alt actions__icon"></i>
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: "NotePosition",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    viewLink() {
      return {
        name: "view",
        params: {
          id: this.data.id,
        },
      };
    },
    editLink() {
      return {
        name: "edit",
        params: {
          id: this.data.id,
        },
      };
    },
  },
  methods: {
    deleteNote() {
      this.$store
        .dispatch("notes/deleteNote", {
          vm: this,
          id: this.data.id,
          type: this.$store.state.storageType,
        })
        .then(() => {
          this.$store.dispatch("notes/getNotes", {
            type: this.$store.state.storageType,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.actions__btn {
  @apply p-2;
}
</style>
