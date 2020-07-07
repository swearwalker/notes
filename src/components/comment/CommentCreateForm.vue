<template>
  <form id="form">
    <div class="form__wrapper">
      <label for="name" class="form__label">Author</label>
      <input
        v-model="$v.author.$model"
        id="name"
        type="text"
        class="form__input field"
      />
      <span v-if="!$v.author.required" class="form__message form__message-error"
        >Field must be filled!</span
      >
      <span v-if="!$v.author.fullName" class="form__message form__message-error"
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
      <button @click="createComment" class="actions__btn btn btn-success">
        Create
      </button>
      <button @click="resetForm" class="actions__btn btn btn-danger">
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

<style lang="scss" scoped></style>
