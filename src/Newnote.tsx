import React from 'react'
import Noteform from './Noteform'
import "./App.css"
import { NoteData, Tag } from './App'



type NewNoteProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  avaliableTags: Tag[]
}
const Newnote = ({ onSubmit, onAddTag, avaliableTags }: NewNoteProps) => {
  return (
    <>
      <h1 className='newnote--title'>New note</h1>
      <Noteform
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        avaliableTags={avaliableTags}
      />

</>
  )
}

export default
  Newnote