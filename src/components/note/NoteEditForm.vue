<template>
  <form id="form">
    <h1 class="form__title">Edit Note</h1>
    <div class="form__wrapper">
      <label for="name" class="form__label">Name</label>
      <input
        v-model="$v.note.name.$model"
        id="name"
        type="text"
        class="form__input field"
      />
      <span
        v-if="!$v.note.name.required"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__wrapper">
      <label for="content" class="form__label">Name</label>
      <textarea
        v-model="$v.note.content.$model"
        id="content"
        class="form__textarea field"
      ></textarea>
      <span
        v-if="!$v.note.content.required"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__actions actions">
      <button @click="saveNote" class="actions__btn btn btn-success">
        Save
      </button>
      <button @click="resetForm" class="actions__btn btn btn-danger">
        Reset
      </button>
    </div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
export default {
  name: "NoteEditForm",
  data() {
    return {};
  },
  validations: {
    note: {
      name: {
        required,
      },
      content: {
        required,
      },
    },
  },
  computed: {
    note() {
      return this.$store.state.notes.note;
    },
  },
  methods: {
    saveNote() {
      this.$store
        .dispatch("notes/updateNote", {
          type: this.$store.state.storageType,
          note: this.note,
          vm: this,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    resetForm() {
      this.name = "";
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
