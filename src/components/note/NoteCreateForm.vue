<template>
  <form id="form">
    <h1 class="form__title">Create Note</h1>
    <div class="form__wrapper">
      <label for="name" class="form__label">Name</label>
      <input
        v-model="$v.name.$model"
        id="name"
        type="text"
        class="form__input field"
      />
      <span v-if="!$v.name.required" class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__wrapper">
      <label for="content" class="form__label">Name</label>
      <textarea
        v-model="$v.content.$model"
        id="content"
        class="form__textarea field"
      ></textarea>
      <span
        v-if="!$v.content.required"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__actions actions">
      <button @click="createNote" class="actions__btn btn btn-success">
        Create
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
  name: "NoteCreateForm",
  data() {
    return {
      name: "",
      content: "",
    };
  },
  validations: {
    name: {
      required,
    },
    content: {
      required,
    },
  },
  methods: {
    createNote() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("notes/createNote", {
            type: this.$store.state.storageType,
            note: {
              name: this.name,
              content: this.content,
              comments: [],
            },
            vm: this,
          })
          .then(() => {
            this.$router.push("/");
          });
      }
    },
    resetForm() {
      this.name = "";
      this.content = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
