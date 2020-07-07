<template>
  <div class="note-item">
    <h1 class="note-item__name">{{ note.name }}</h1>
    <p class="note-item__content">{{ note.content }}</p>
    <div class="note-item__actions actions">
      <div class="actions__badge">
        <span class="actions__quantity">{{ note.comments.length }}</span>
      </div>
      <router-link :to="editLink" class="actions__btn btn btn-success"
        >Edit</router-link
      >
      <button @click="deleteNote" class="actions__btn btn btn-danger">
        Delete
      </button>
    </div>
    <div class="note-item__comments comments">
      <button
        v-if="!showingCreateCommentForm"
        @click="showCreateCommentForm"
        class="comments__btn btn btn-success"
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
          id: this.data.id,
          comment,
          type: this.$store.state.storageType,
          vm: this,
        })
        .then(() => {
          this.hideModal();
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
