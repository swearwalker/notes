<template>
  <main id="main">
    <div class="container">
      <NoteEditForm />
    </div>
  </main>
</template>

<script>
import NoteEditForm from '@/components/note/NoteEditForm';
export default {
  name: 'Edit',
  components: {
    NoteEditForm,
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
