import React from 'react'
import { NoteData,Tag } from './App'
import Noteform from './Noteform'
import { useNote } from './NotesLayout'



type EditNoteProps = {
    onSubmit: (id:string , data: NoteData) => void
    onAddTag: (tag: Tag) => void
    avaliableTags : Tag[]
  }

      const EditNote = ({onSubmit , onAddTag , avaliableTags}:EditNoteProps) => {
        const note =useNote ()
        return (
            <>
          
             <h1 className='newnote--title'>New note</h1>
             <Noteform
             title={note.title}
             markdown={note.markdown}
             tags={note.tags}
             onSubmit={data => onSubmit (note.id,data)}
             onAddTag={onAddTag}
             avaliableTags={ avaliableTags}
             />
     
          </>
        )
      }


export default EditNote