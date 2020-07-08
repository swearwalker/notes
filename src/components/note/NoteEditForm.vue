<template>
  <form @submit.prevent="saveNote" id="form" class="w-full shadow rounded p-4">
    <h1 class="form__title title uppercase text-2xl mb-4">Edit Note</h1>
    <div class="form__wrapper">
      <label for="name" class="form__label subtitle mb-1">Name</label>
      <input
        v-model="$v.note.name.$model"
        id="name"
        type="text"
        class="form__input input"
      />
      <span
        v-if="!$v.note.name.required"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__wrapper">
      <label for="content" class="form__label subtitle mb-1">Content</label>
      <textarea
        v-model="$v.note.content.$model"
        id="content"
        class="form__textarea textarea"
      ></textarea>
      <span
        v-if="!$v.note.content.required"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-else class="form__message form__message-success">All good!</span>
    </div>
    <div class="form__actions actions w-full flex items-center justify-end">
      <button
        type="submit"
        :class="{ 'btn-disabled': $v.$invalid }"
        class="actions__btn btn btn-success"
        :disabled="$v.$invalid"
      >
        Save
      </button>
      <button
        @click.prevent="resetForm"
        class="actions__btn btn btn-danger ml-2"
      >
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
      this.note.name = "";
      this.note.content = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.form__wrapper {
  @apply flex flex-col w-full mb-2;
}
.form__message {
  @apply text-sm mb-1;
}
.form__message-success {
  @apply text-green-500;
}
.form__message-error {
  @apply text-red-500;
}
</style>
