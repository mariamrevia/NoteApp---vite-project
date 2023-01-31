import React, { useState } from 'react'
import { Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreatableReactSelect from "react-select/creatable"
import { Link } from "react-router-dom"
import { useRef } from "react"
import { NoteData } from './App'
import { Tag } from './App'
import { v4 as uuidV4 } from "uuid"
import { useNavigate } from 'react-router-dom'


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    avaliableTags: Tag[]

} & Partial<NoteData>



const Noteform = ({ onSubmit, onAddTag, avaliableTags, title = "", markdown = "", tags = [] }: NoteFormProps) => {
    const navigate = useNavigate()
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })
        navigate("..")
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Stack gap={4}>
                    <Row>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    defaultValue={title}
                                    ref={titleRef}
                                    required />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="title">
                                <Form.Label>Tags</Form.Label>
                                <CreatableReactSelect

                                    onCreateOption={label => {
                                        const newTag = { id: uuidV4(), label }
                                        onAddTag(newTag)
                                        setSelectedTags(prev => [...prev, newTag])
                                    }}
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
                    <Form.Group controlId="markdown">
                        <Form.Label>body</Form.Label>
                        <Form.Control
                            defaultValue={markdown}
                            ref={markdownRef}
                            required as="textarea"
                            rows={15} />
                    </Form.Group>

                    <Stack direction='horizontal' gap={3} className="button-stack">
                        <Button type="submit" variant='primary'>save</Button>
                        <Link to="..">
                            <Button type="button" variant='outline-secondary'>cancel</Button>

                        </Link>
                    </Stack>
                </Stack>

            </Form>


        </div>
    )
}

export default Noteform