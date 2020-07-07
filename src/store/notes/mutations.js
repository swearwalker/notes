export default {
  setNotes(state, data) {
    state.notes = data;
  },
  setNote(state, data) {
    state.note = data;
  },
  createComment(state, comment) {
    state.note.comments.push(comment);
  },
};
