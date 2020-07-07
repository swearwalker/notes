import { db } from "@/config/db";

import toast from "@/helpers/Toast";

export default {
  async getNotes({ commit }, options) {
    try {
      if (options.type === "firebase") {
        const response = await db.collection("notes").get();
        const notes = response.docs.map((item) => ({
          ...item.data(),
          id: item.id,
        }));
        commit("setNotes", notes);
      } else {
        const notes = localStorage.getItem("notes");
        commit("setNotes", JSON.parse(notes));
      }
    } catch (e) {
      toast(options.vm, {
        title: "Сталась помилка при завантаженні заміток!",
        type: "error",
      });
    }
  },
  async getNote({ commit }, options) {
    try {
      if (options.type === "firebase") {
        const response = await db.collection("notes").doc(options.id).get();
        const note = {
          ...response.data(),
          id: response.id,
        };
        commit("setNote", note);
      } else {
        const notes = localStorage.getItem("notes");
        let note = {};
        JSON.parse(notes).filter((item) => {
          if (item.id === options.id) {
            note = item;
          }
        });
        commit("setNote", note);
      }
    } catch (e) {
      toast(options.vm, {
        title: "Сталась помилка при завантаженні замітки!",
        type: "error",
      });
    }
  },
  async createNote({ state }, options) {
    console.info(state);
    try {
      if (options.type === "firebase") {
        await db.collection("notes").doc().set(options.note);
      } else {
        const notes = localStorage.getItem("notes");
        const list = [];
        if (notes) {
          JSON.parse(notes).forEach((item) => {
            list.push(item);
          });
        }
        options.note.id = `f${(+new Date()).toString(16)}`;
        list.push(options.note);
        localStorage.setItem("notes", JSON.stringify(list));
      }
      toast(options.vm, {
        title: "Замітка успішно створена!",
        type: "success",
      });
    } catch (e) {
      toast(options.vm, {
        title: "Сталась помилка при створенні замітки!",
        type: "error",
      });
    }
  },
  async updateNote({ state }, options) {
    try {
      if (options.type === "firebase") {
        await db.collection("notes").doc(state.note.id).update(options.note);
      } else {
        let indexById = null;
        const notes = JSON.parse(localStorage.getItem("notes"));
        JSON.parse(notes).find((item, index) => {
          if (item.id === state.note.id) {
            indexById = index;
          }
        });
        notes[indexById].name = options.note.name;
        notes[indexById].content = options.note.content;
        localStorage.setItem("notes", JSON.stringify(notes));
      }
      toast(options.vm, {
        title: "Замітка успішно оновлена!",
        type: "success",
      });
    } catch (e) {
      toast(options.vm, {
        title: "Сталась помилка при оновленні замітки!",
        type: "error",
      });
    }
  },
  async deleteNote({ state }, options) {
    console.info(state);
    try {
      if (options.type === "firebase") {
        await db.collection("notes").doc(options.id).delete();
      } else {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (notes) {
          let indexById = null;
          notes.find((item, index) => {
            if (item.id === options.id) {
              indexById = index;
            }
          });
          notes.splice(indexById, 1);
          localStorage.setItem("notes", JSON.stringify(notes));
        }
      }
      toast(options.vm, {
        title: "Замітка успішно видалена!",
        type: "success",
      });
    } catch (e) {
      console.info("error", options);
      toast(options.vm, {
        title: "Сталась помилка при видалені замітки!",
        type: "error",
      });
    }
  },
  async createComment({ state, commit }, options) {
    try {
      if (options.type === "firebase") {
        await db
          .collection("notes")
          .doc(options.id)
          .update({
            comments: state.note.comments.concat(options.comment),
          });
      } else {
        const notes = JSON.parse(localStorage.getItem("notes"));
        let indexById = null;
        notes.find((item, index) => {
          if (item.id === options.id) {
            indexById = index;
          }
        });
        notes[indexById].comments.push(options.comment);
        localStorage.setItem("notes", JSON.stringify(notes));
      }
      commit("createComment", options.comment);
      toast(options.vm, {
        title: "Коментар успішно створений!",
        type: "success",
      });
    } catch (e) {
      toast(options.vm, {
        title: "Сталась помилка при створенні коментаря!",
        type: "error",
      });
    }
  },
};
