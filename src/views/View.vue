<template>
  <main id="main">
    <div class="container">
      <NoteViewForm />
    </div>
  </main>
</template>

<script>
import NoteViewForm from '@/components/note/NoteViewForm';
export default {
  name: 'View',
  components: {
    NoteViewForm,
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch('notes/getNote', {
      id: this.$route.params.id,
      type: this.$store.state.storageType,
    });
  },
};
</script>

<style lang="scss" scoped></style>
