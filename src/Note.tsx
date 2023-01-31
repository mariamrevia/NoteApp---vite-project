import React from 'react'
import { useNote } from './NotesLayout'
import { Col, Row, Stack, Button } from 'react-bootstrap'
import styles from "./NoteList.module.css"
import { Link } from 'react-router-dom'
import ReactMarkdown from "react-markdown"
import { useNavigate } from 'react-router-dom'


type NoteProps = {
    onDelete: (id: string) => void
}


const Note = ({ onDelete }: NoteProps) => {
    const navigate = useNavigate()
    const note = useNote()
    return (
        <>

            <Row className="align-items-center mb-4">
                <Col>
                    <h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            gap={1}
                            direction="horizontal"
                            className="flex-wrap" >
                            {note.tags.map(tag => (
                                <span
                                    className={`text-trancute ${styles.badge}`} key={tag.id}>{tag.label}
                                </span>
                            ))}

                        </Stack>
                    )}
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary' className={`${styles.button}`}>edit</Button>
                        </Link>
                            <Button variant='outline-danger'
                                onClick={() => {
                                    onDelete (note.id)
                                    navigate("/")
                                }}

                            >delete</Button>
                        <Link to="/">
                            <Button variant='outline-secondary' >back</Button>
                        </Link>
                    </Stack>
                </Col>

            </Row>
            <ReactMarkdown>{note.markdown}</ReactMarkdown>

        </>

    )
}

export default Note