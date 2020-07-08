<template>
  <li class="comment-item flex flex-col p-2 rounded shadow">
    <h2 class="comment-item__author subtitle text-lg mb-2 truncate">
      {{ data.author }}
    </h2>
    <p class="comment-item__content description mb-1 truncate">
      {{ data.content }}
    </p>
    <span class="comment-item__date text-sm opacity-50">{{
      data.created_at | moment("LLL")
    }}</span>
  </li>
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
