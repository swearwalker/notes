<template>
  <main id="main">
    <div class="container">
      <NoteCreateForm />
    </div>
  </main>
</template>

<script>
import NoteCreateForm from "@/components/note/NoteCreateForm";
export default {
  name: "Create",
  components: {
    NoteCreateForm,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
