import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/esm/Stack'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-hot-toast'

const CreateTaskModal = ({ handleCreateModalClose, showCreateModal, setTask }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleCreateTask = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/task/createTask`, {
                title,
                description,
            }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json"
                }
            })
            toast.success(res.data.message)
            setTask(prevTasks => [...prevTasks, res.data.task])
            setTitle("")
            setDescription("")
            handleCreateModalClose()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <Modal show={showCreateModal} onHide={handleCreateModalClose} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add Task
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stack gap={3}>
                        <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Stack>
                    <br />
                    <Stack gap={3}>
                        <input type="text" placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Stack>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCreateModalClose}>Close</Button>
                    <Button variant='primary' onClick={handleCreateTask}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateTaskModal