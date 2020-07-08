<template>
  <main id="main">
    <div class="container">
      <ul class="list flex flex-wrap">
        <NotePosition v-for="note in notes" :key="note.id" :data="note" />
      </ul>
    </div>
  </main>
</template>

<script>
import NotePosition from "@/components/note/NotePosition";
export default {
  name: "Index",
  components: {
    NotePosition,
  },
  data() {
    return {};
  },
  computed: {
    createNote() {
      return {
        name: "create-note",
      };
    },
    notes() {
      return this.$store.state.notes.notes;
    },
  },
  mounted() {
    this.$store.dispatch("notes/getNotes", {
      vm: this,
      type: this.$store.state.storageType,
    });
  },
};
</script>

<style lang="scss" scoped></style>
