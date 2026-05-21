import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/esm/Stack'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-hot-toast'

const ViewTaskModal = ({ showViewModal, handleViewModalClose, id }) => {
  const [task, setTask] = useState([])

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(`https://task-management-dv04ijfoz-ahmedraza08450s-projects.vercel.app/api/v1/task/getSingleTask/${id}`, { withCredentials: true })
        setTask(res.data.task)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    if (id) {
      getSingleTask(id)
    }
  }, [id])

  return (
    <>
      <Modal show={showViewModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            View Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack>
            <p className='fw-bold mb-0'>Title</p>
            <p>{task && task.title}</p>
          </Stack>
          <Stack>
            <p className='fw-bold mb-0'>Description</p>
            <p>{task && task.description}</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleViewModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewTaskModal