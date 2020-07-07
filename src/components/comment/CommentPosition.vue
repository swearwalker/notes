<template>
  <li class="comment-item">{{ data }}</li>
</template>

<script>
export default {
  name: "CommentPosition",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
