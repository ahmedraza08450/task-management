import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react';


function Header({ task, setTask, isUserAuthenticated, setIsUserAuthenticated }) {
  const [allTask, setAllTask] = useState([]);
  const navigateTo = useNavigate()
  useEffect(() => {
    fetchTasks()
  }, [isUserAuthenticated])
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/task/getMyTasks", { withCredentials: true })
      setAllTask(res.data.task)
      setTask(res.data.task)
    } catch (error) {
      console.log(error);
    }
  }

  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true })
      toast.success(res.data.message)
      setIsUserAuthenticated(false)
      navigateTo("/login")
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  const filterTask = (filterType) => {
    let filterTask = [];
    switch (filterType) {
      case "complete":
        filterTask = allTask.filter(task => task.status === "complete")
        break;
      case "incomplete":
        filterTask = allTask.filter(task => task.status === "incomplete")
        break;
      case "archived":
        filterTask = allTask.filter(task => task.archived === true)
        break;
      case "all":
        filterTask = allTask;
        break;
      default:
        filterTask = allTask;
    }
    setTask(filterTask)
  }
  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${!isUserAuthenticated ? "d-none" : ""}`}>
      <Container>
        <Navbar.Brand href="#home" className=''>TASK MANAGEMENT SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className='text-decoration-none d-flex align-items-center link-light'>Home</Link>
            <NavDropdown title="Filter Tasks" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => filterTask("all")}>All Tasks</NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("complete")}>
                Completed Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("incomplete")}>
                Incomplete Tasks
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => filterTask("archived")}>
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>
            <Button className='bg-primary border-0' style={{ width: "fit-content" }} onClick={handleLogout}>LOGOUT</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;