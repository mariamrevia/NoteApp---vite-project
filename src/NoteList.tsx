
import React, { useMemo } from 'react'
import { useState } from 'react'
import { Button, Col, Row, Stack, Form, Card, Modal } from 'react-bootstrap'
import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from './App'
import { Note } from "./App"
import styles from "./NoteList.module.css"



type shortNote = {
    tags: Tag[]
    title: string
    id: string

}

type NoteListProps = {
    avaliableTags: Tag[]
    notes: Note[]
    deleteTag: (id: string) => void
    editTag: (id: string, label: string) => void

}

const NoteList = ({ avaliableTags, notes, editTag, deleteTag }: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [editTagsOpen, setEditTagsOpen] = useState(false)


    const filterdNotes = useMemo(() => {
        return notes.filter(note => {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
        })

    }, [title, selectedTags, notes])


    return (
        <>
            <Row>
                <Col >
                    <h1>Notes</h1>
                </Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant='primary' className={`${styles.button}`}>create</Button>
                        </Link>

                        <Button

                            onClick={() => setEditTagsOpen(true)}
                            variant='outline-secondary' >Edit Tags</Button>

                    </Stack>
                </Col>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    type='text' />
                            </Form.Group>
                        </Col>
                        <Col>

                            <Form.Group controlId="title">
                                <Form.Label>Tags</Form.Label>
                                <ReactSelect


                                    value={selectedTags.map((tag) => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    options={avaliableTags.map(tag => {
                                        return { label: tag.label, value: tag.id }
                                    })}
                                    onChange={tags => {
                                        setSelectedTags(
                                            tags.map((tag) => {
                                                return {
                                                    label: tag.label, id: tag.value
                                                }
                                            })
                                        )
                                    }}
                                    isMulti />
                            </Form.Group>
                        </Col>
                    </Row>

                </Form>
                <Row xs={1} sm={2} lg={3} className="g-3">
                    {filterdNotes.map(note => (
                        <Col key={note.id}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                            />
                        </Col>
                    ))}

                </Row>
            </Row>
            <EditTagsModal
                show={editTagsOpen}
                handleClose={() => setEditTagsOpen(false)}
                avaliableTags={avaliableTags}
                editTag={editTag}
                deleteTag={deleteTag}


            />
        </>
    )
}



type editTags = {
    avaliableTags: Tag[]
    show: boolean
    handleClose: () => void
    editTag: (id: string, label: string) => void
    deleteTag: (id: string) => void
}

function EditTagsModal({ avaliableTags, handleClose, show, editTag, deleteTag }: editTags) {
    return <Modal show={show} onHide={handleClose}>

        <Modal.Header>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack gap={2}>
                    {avaliableTags.map(tag => (
                        <Row key={tag.id}>
                            <Col xs="auto">
                                <Form.Control
                                    onChange={(e) => editTag(tag.id, e.target.value)}
                                    type='text' value={tag.label} />
                            </Col>
                            <Col>
                                <Button
                                    onClick={() => deleteTag(tag.id)}
                                    variant="outline-danger">&times;</Button>

                            </Col>

                        </Row>
                    ))}

                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
}
function NoteCard({ id, title, tags }: shortNote) {
    return (
        <Card
            as={Link} to={`/${id}`}
            className={`h-100 text-reset text-decoration-none
         ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">

                    <span className='fs-5'> {title}</span>
                    {tags.length > 0 && (
                        <Stack gap={1} direction="horizontal" className="justify-content-center flex-wrap" >
                            {tags.map(tag => (
                                <span className={`text-trancute ${styles.badge}`} key={tag.id}>{tag.label}</span>
                            ))}

                        </Stack>
                    )}

                </Stack>
            </Card.Body>
        </Card>
    )

}




export default NoteList