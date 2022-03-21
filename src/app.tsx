import { NotesPreview, NoteList } from "./view";
import NotesAPI from "./api";
import React from "react";

interface props {}
interface state {
  activeNote: any
}

export default class App extends React.Component<props, state> {
  notes:any[] = [];
  constructor(props: props) {
    super(props);
    this.state = { activeNote: null }
  }
  componentDidMount() {
    this.notes = NotesAPI.getAllNotes();
    this.setState({ activeNote: this.notes.length ? this.notes[0] : null  });
  }
  onNoteAdd = () => {
    const newNote = {
      title: "新建笔记",
      body: "开始记录...",
    };

    NotesAPI.saveNote(newNote);
    this._refreshNotes();
  }
  _refreshNotes(noteId?) {
    this.notes = NotesAPI.getAllNotes();
    if (noteId) {
      const activeNote = this.notes.find((note) => +note.id === +noteId);
      this.setState({ activeNote: activeNote });
    }
    else {
      this.setState({ activeNote: this.notes[0] || null });
    }
  }
  selectedNote = (id) => {
    this._refreshNotes(id);
  }
  onNoteEdit = (title, body) => {
    NotesAPI.saveNote({
      id: this.state.activeNote.id,
      title,
      body,
    });

    this._refreshNotes(this.state.activeNote.id);
  }
  onNoteDelete = (noteId) => {
    const doDelete = confirm("确认要删除该笔记吗?");
    if (!doDelete) return;
    NotesAPI.deleteNote(noteId);
    this._refreshNotes();
  }
  render() {
    return (
      <>
      <div className="notes__sidebar">
        <button className="notes__add" type="button" onClick={this.onNoteAdd}>添加新的笔记 📒</button>
        <NoteList list={[...this.notes]} activeNote={this.state.activeNote} selectedNote={this.selectedNote} deleteNote={this.onNoteDelete}></NoteList>
      </div>
      {
        this.state.activeNote && <NotesPreview activeNote={this.state.activeNote} save={this.onNoteEdit} delete={this.onNoteDelete}></NotesPreview>
      }
      </>
    )
  }

  // _refreshNotes() {
  //   const notes = NotesAPI.getAllNotes();

  //   this._setNotes(notes);

  //   if (notes.length > 0) {
  //     this._setActiveNote(notes[0]);
  //   }
  // }

  // _setNotes(notes) {
  //   this.notes = notes;
  //   this.view.updateNoteList(notes);
  //   this.view.updateNotePreviewVisibility(notes.length > 0);
  // }

  // _setActiveNote(note) {
  //   this.activeNote = note;
  //   this.view.updateActiveNote(note);
  // }

  // _handlers() {
  //   return {
  //     onNoteSelect: (noteId) => {
  //       const selectedNote = this.notes.find((note) => +note.id === +noteId);
  //       this._setActiveNote(selectedNote);
  //     },
  //     onNoteAdd: () => {
  //       const newNote = {
  //         title: "新建笔记",
  //         body: "开始记录...",
  //       };

  //       NotesAPI.saveNote(newNote);
  //       this._refreshNotes();
  //     },
  //     onNoteDelete: (noteId) => {
  //       NotesAPI.deleteNote(noteId);
  //       this._refreshNotes();
  //     },
  //   };
  // }
}
