<template>
  <div class="note-item">
    <div class="note-item__container flex flex-col p-4 shadow rounded">
      <h1 class="note-item__name title mb-4 uppercase text-xl">
        {{ note.name }}
      </h1>
      <p class="note-item__content description mb-2">{{ note.content }}</p>
      <div
        class="note-item__actions actions flex items-center justify-between mb-4"
      >
        <div class="actions__badge badge badge-info">
          <i class="fas fa-comments actions__icon"></i>
          <span class="actions__quantity ml-2">{{ note.comments.length }}</span>
        </div>
        <router-link
          :to="editLink"
          class="actions__btn btn btn-success ml-auto"
        >
          <i class="fas fa-pen actions__icon"></i>
        </router-link>
        <button @click="deleteNote" class="actions__btn btn btn-danger ml-2">
          <i class="fas fa-trash-alt actions__icon"></i>
        </button>
      </div>
      <div class="note-item__comments comments">
        <button
          v-if="!showingCreateCommentForm"
          @click="showCreateCommentForm"
          class="comments__btn btn btn-success ml-auto mb-2"
        >
          Create Comment
        </button>
        <CommentCreateForm
          v-else
          @create-comment="createComment"
          @cancel="hideCreateCommentForm"
        />
        <ul class="comments__list">
          <li v-if="note.comments.length === 0" class="comments__item-empty">
            Empty comments
          </li>
          <CommentPosition
            v-for="(comment, index) in note.comments"
            :data="comment"
            :key="index"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCreateForm from "@/components/comment/CommentCreateForm";
import CommentPosition from "@/components/comment/CommentPosition";
export default {
  name: "NoteViewForm",
  components: {
    CommentCreateForm,
    CommentPosition,
  },
  data() {
    return {
      showingCreateCommentForm: false,
    };
  },
  computed: {
    note() {
      if (Object.keys(this.$store.state.notes.note).length > 0) {
        return this.$store.state.notes.note;
      } else {
        return {
          name: "",
          content: "",
          comments: [],
        };
      }
    },
    editLink() {
      return {
        name: "edit",
        params: {
          id: this.$route.params.id,
        },
      };
    },
  },
  methods: {
    createComment(comment) {
      this.$store
        .dispatch("notes/createComment", {
          id: this.note.id,
          comment,
          type: this.$store.state.storageType,
          vm: this,
        })
        .then(() => {
          this.hideCreateCommentForm();
        });
    },
    deleteNote() {
      this.$store
        .dispatch("notes/deleteNote", {
          vm: this,
          id: this.data.id,
          type: this.$store.state.storageType,
        })
        .then(() => {
          this.$router.push("/");
        });
    },
    showCreateCommentForm() {
      this.showingCreateCommentForm = true;
    },
    hideCreateCommentForm() {
      this.showingCreateCommentForm = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
