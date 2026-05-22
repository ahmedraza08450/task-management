import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import { MdEdit, MdDelete } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import CreateTaskModal from '../components/CreateTaskModal'
import UpdateTaskModal from '../components/UpdateTaskModal'
import ViewTaskModal from '../components/ViewTaskModal'

const Home = ({ task, setTask, isUserAuthenticated }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [viewTaskId, setViewTaskId] = useState("")
  const [updateTaskId, setUpdateTaskId] = useState("")
  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/v1/task/deleteTask/${id}`, { withCredentials: true })
      setTask(prevTasks => prevTasks.filter(task => task._id !== id))
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const handleCreateModalClose = () => setShowCreateModal(false)
  const handleUpdateModalClose = () => setShowUpdateModal(false)
  const handleViewModalClose = () => setShowViewModal(false)

  const handleCreateModalShow = () => setShowCreateModal(true)
  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id)
    setShowUpdateModal(true)
  }
  const handleViewModalShow = (id) => {
    setViewTaskId(id)
    setShowViewModal(true)
  }
  if (!isUserAuthenticated) {
    return <Navigate to={"/login"} />
  }
  return (
    <>
      <div className='container my-4'>
        <div className="row mb-3">
          <div className="col text-end">
            <Button onClick={handleCreateModalShow}>Create Task</Button>
          </div>
        </div>
        <div className="row">
          {
            task && task.length > 0 ? (task.map(task => {
              return (
                <div key={task._id} className='col-lg-3 col-md-4 col-sm-6'>
                  <Card style={{ marginBottom: "20px", minHeight: "400px" }}>
                    <Card.Body className='d-flex justify-content-between flex-column'>
                      <Stack gap={2}>
                        <Card.Title className='mb-2' style={{ height: "50px" }}>
                          {
                            task?.title?.length <= 40 ? task.title : task.title.slice(0, 40) + "...."
                          }
                        </Card.Title>
                        <Card.Text>
                          {
                           task?.description?.length <= 300 ? task.description : task.description.slice(0, 300) + "...."
                          }
                        </Card.Text>
                      </Stack>
                      <Stack direction='horizontal' gap={2} className='justify-content-end'>
                        <FaEye className='fs-3' onClick={() => handleViewModalShow(task._id)} />
                        <MdEdit className='fs-3' onClick={() => handleUpdateModalShow(task._id)} />
                        <MdDelete className='fs-3' onClick={() => deleteTask(task._id)} />
                      </Stack>
                    </Card.Body>
                  </Card>
                </div>
              )
            })) : (<h1>You Don't Have Any Task</h1>)
          }
        </div>
        <CreateTaskModal
          handleCreateModalClose={handleCreateModalClose}
          showCreateModal={showCreateModal}
          setTask={setTask}
        />
        <UpdateTaskModal
          showUpdateModal={showUpdateModal}
          handleUpdateModalClose={handleUpdateModalClose}
          id={updateTaskId}
          setTask={setTask}
        />
        <ViewTaskModal
          showViewModal={showViewModal}
          handleViewModalClose={handleViewModalClose}
          id={viewTaskId}
        />
      </div>
    </>
  )
}

export default Home