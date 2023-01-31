
import React from "react"
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route, Navigate } from "react-router-dom"
import { useLocalStorage } from "./useLocalStorage"
import { useMemo } from "react"
import { v4 as uuidV4 } from "uuid"
import Newnote from "./Newnote"
import NoteList from "./NoteList"
import "./App.css"
import NotesLayout from "./NotesLayout"
import EditNote from "./EditNote"
import Note from "./Note"

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]

}
export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}


function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])


  
  function onCreateNote({tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })

  }

  function onEditNote(id: string, { tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })

  }

  function editTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return (
        prevTags.filter(tag => tag.id !== id)
      )
    })
  }

  return (
    <div className="App">

      <Container className="my-container">

        <Routes>
          <Route path="/" element={<NoteList
            notes={notesWithTags}
            avaliableTags={tags}
            deleteTag={deleteTag}
            editTag={editTag}

          />} />
          <Route path="/new" element={
            <Newnote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              avaliableTags={tags}

            />} />
          <Route path="/:id" element={<NotesLayout
            notes={notesWithTags} />}>
            <Route
              index element={<h1><Note
                onDelete={onDeleteNote}

              /></h1>} />
            <Route path="edit" element={
              <EditNote
                onSubmit={onEditNote}
                onAddTag={addTag}
                avaliableTags={tags}

              />} />

          </Route>
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Container>

    </div>
  )
}

export default App
