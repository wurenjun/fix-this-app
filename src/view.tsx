import React, { useEffect, useState } from "react";


function NotesPreview(props) {
  const [data, setData] = useState({ title: props.activeNote.title, body: props.activeNote.body });

  useEffect(() => {
    setData({ title: props.activeNote.title, body: props.activeNote.body })
  }, [props.activeNote.title, props.activeNote.body]);

  return (
    <div className="notes__preview">
      <input className="notes__title" type="text" placeholder="" value={data.title}  onChange={e => setData({...data, title: e.target.value,  })} />
      <textarea className="notes__body" value={data.body} onChange={e => setData({...data, body: e.target.value,  })}></textarea>
      <button id="save" onClick={() => props.save(data.title, data.body)}>Save</button>
      <button id="delete" onClick={() => props.delete(props.activeNote.id)}>Delete</button>
    </div>
  )
}

function NoteList(props) {
  const MAX_BODY_LENGTH = 60;

  const list = props.list.map(item => {
    return (
      <div className={+props.activeNote?.id === +item.id ? "notes__list-item notes__list-item--selected" : "notes__list-item"} key={item.id} data-note-id={item.id} onClick={() => props.selectedNote(item.id)} onDoubleClick={() => props.deleteNote(item.id)}>
        <div className="notes__small-title">{item.title}</div>
        <div className="notes__small-body">
            {item.body.substring(0, MAX_BODY_LENGTH)}
            {item.body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div className="notes__small-updated">
            {new Date(item.updated).toLocaleString(undefined, {
              dateStyle: "full",
              timeStyle: "short",
            })}
        </div>
      </div>
    )
  })
  return  <div className="notes__list">{list}</div>

}

export { NotesPreview, NoteList }


