import React from 'react'
import { Navigate, useParams, Outlet, useOutletContext } from 'react-router-dom'
import { Note } from "./App"


type NoteslayoutProps = {
    notes: Note[]
}
const NotesLayout = ({ notes }: NoteslayoutProps) => {
    const { id } = useParams()
    const note = notes.find(n => n.id === id)

    if (note == null) return <Navigate to="/" replace />
    return (
        <Outlet context={note}></Outlet>
    )
}

export function useNote() {
    return useOutletContext<Note>()
}
export default NotesLayout