<template>
  <form
    @submit.prevent="createComment"
    id="form"
    class="w-full shadow rounded p-4 mb-2"
  >
    <div class="form__wrapper">
      <label for="name" class="form__label subtitle mb-1">Author</label>
      <input
        v-model="$v.author.$model"
        id="name"
        type="text"
        class="form__input input"
      />
      <span
        v-if="!$v.author.required && $v.author.$error"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span
        v-if="!$v.author.fullName && $v.author.$error"
        class="form__message form__message-error"
        >Field must contain only two words and starts with upper letter!</span
      >
    </div>
    <div class="form__wrapper">
      <label for="content" class="form__label subtitle mb-1">Content</label>
      <textarea
        v-model="$v.content.$model"
        id="content"
        class="form__textarea textarea"
      ></textarea>
      <span
        v-if="!$v.content.required && $v.content.$error"
        class="form__message form__message-error"
        >Field must be filled!</span
      >
    </div>
    <div class="form__actions actions flex items-center justify-end">
      <button
        type="submit"
        :class="{ 'btn-disabled': $v.$invalid }"
        class="actions__btn btn btn-success"
        :disabled="$v.$invalid"
      >
        Create
      </button>
      <button
        @click.prevent="resetForm"
        class="actions__btn btn btn-danger ml-2"
      >
        Reset
      </button>
    </div>
  </form>
  <!--  <b-form @submit.prevent="createComment">-->
  <!--    <b-form-group label="Автор" label-for="name">-->
  <!--      <b-form-input-->
  <!--        id="name"-->
  <!--        v-model="$v.author.$model"-->
  <!--        type="text"-->
  <!--        :state="!authorValidate"-->
  <!--        aria-describedby="input-required input-fullname"-->
  <!--        placeholder="Введіть автора"-->
  <!--      ></b-form-input>-->
  <!--      <b-form-invalid-feedback v-if="!$v.author.required" id="input-required">-->
  <!--        Поле не може бути пустим!-->
  <!--      </b-form-invalid-feedback>-->
  <!--      <b-form-invalid-feedback v-if="!$v.author.fullName" id="input-fullname">-->
  <!--        Поле має містити 2 слова, кожне з яких, має починатись з великої літери!-->
  <!--      </b-form-invalid-feedback>-->
  <!--    </b-form-group>-->
  <!--    <b-form-group label="Опис" label-for="content">-->
  <!--      <b-form-textarea-->
  <!--        id="content"-->
  <!--        :state="$v.content.required"-->
  <!--        v-model="$v.content.$model"-->
  <!--        aria-describedby="textarea-required"-->
  <!--        placeholder="Введіть опис"-->
  <!--      ></b-form-textarea>-->
  <!--      <b-form-invalid-feedback v-if="!$v.content.required" id="textarea-required">-->
  <!--        Поле не може бути пустим!-->
  <!--      </b-form-invalid-feedback>-->
  <!--    </b-form-group>-->
  <!--    <div class="actions d-flex">-->
  <!--      <b-button class="ml-auto" type="submit" variant="primary">Збергти</b-button>-->
  <!--      <b-button @click="cancel" class="ml-2" variant="danger">Відміна</b-button>-->
  <!--    </div>-->
  <!--  </b-form>-->
</template>

<script>
import { required, helpers } from "vuelidate/lib/validators";
const fullName = helpers.regex(
  "fullName",
  /^([A-ZА-ЯІЇЄЮ][a-zа-яіїєю]+(?=\s[A-ZА-ЯІЇЄЮ])(?:\s[A-ZА-ЯІЇЄЮ][a-zа-яіїєю]+)+)$/
);
export default {
  name: "CommentCreateForm",
  data() {
    return {
      author: "",
      content: "",
    };
  },
  computed: {
    authorValidate() {
      return !(this.$v.author.fullName && this.$v.author.required);
    },
  },
  validations: {
    author: {
      required,
      fullName,
    },
    content: {
      required,
    },
  },
  methods: {
    createComment() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("create-comment", {
          author: this.author,
          content: this.content,
          created_at: Date.now(),
        });
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    resetForm() {
      this.author = "";
      this.content = "";
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
