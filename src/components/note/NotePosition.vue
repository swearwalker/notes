<template>
  <li class="note-item">
    <h2 class="note-item__name">{{ data.name }}</h2>
    <p class="note-item__content">{{ data.content }}</p>
    <div class="note-item__actions actions">
      <div class="actions__badge">
        <span class="actions__quantity">{{ data.comments.length }}</span>
      </div>
      <router-link :to="viewLink" class="actions__btn btn btn-info"
        >View</router-link
      >
      <router-link :to="editLink" class="actions__btn btn btn-success"
        >Edit</router-link
      >
      <button @click="deleteNote" class="actions__btn btn btn-danger">
        Delete
      </button>
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

<style lang="scss" scoped></style>
