import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/esm/Stack'
import Modal from 'react-bootstrap/Modal'
import { toast } from 'react-hot-toast'

const UpdateTaskModal = ({ showUpdateModal, handleUpdateModalClose, id, setTask }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("")
  const [archived, setArchived] = useState("")

  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(`https://task-management-dv04ijfoz-ahmedraza08450s-projects.vercel.app/api/v1/task/getSingleTask/${id}`, { withCredentials: true })
        setTitle(res.data.task.title)
        setDescription(res.data.task.description)
        setStatus(res.data.task.status)
        setArchived(res.data.task.archived)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    if (id) {
      getSingleTask(id)
    }
  }, [id])


  const handleUpdate = async () => {
    try {
      const res = await axios.put(`https://task-management-dv04ijfoz-ahmedraza08450s-projects.vercel.app/api/v1/task/updateTask/${id}`, {
        title,
        description,
        status,
        archived
      }, { withCredentials: true })
      toast.success(res.data.message)
      setTask(prevTask => {
        const updatedTasks = prevTask.map(task => {
          if (task._id === id) {
            return {
              ...task, title, description, status, archived
            };
          } else {
            return task;
          }
        })
        return updatedTasks;
      })

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <>
      <Modal show={showUpdateModal} onHide={handleUpdateModalClose} >
        <Modal.Header closeButton>
          <Modal.Title>
            Update Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack gap={2}>
            <input type="text" placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          </Stack>
          <br />
          <Stack gap={2}>
            <input type="text" placeholder='Title' value={description} onChange={(e) => setDescription(e.target.value)} />
          </Stack>
          <br />
          <label htmlFor="">Status</label>
          <Stack gap={2}>
            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option value="complete">Completed</option>
              <option value="incomplete">Incompleted</option>
            </select>
          </Stack>
          <label htmlFor="">Archived</label>
          <Stack gap={2}>
            <select value={archived} onChange={(e)=>setArchived(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Stack>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleUpdateModalClose}>Close</Button>
          <Button variant='primary' onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default UpdateTaskModal