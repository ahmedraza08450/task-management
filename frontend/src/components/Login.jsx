import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Login = ({ isUserAuthenticated, setIsUserAuthenticated }) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        "https://task-management-dv04ijfoz-ahmedraza08450s-projects.vercel.app/api/v1/user/login",
        {
          email,
          password
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      setEmail("")
      setPassword("")
      setIsUserAuthenticated(true)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  if (isUserAuthenticated) {
    return <Navigate to={"/"} />
  }

  return (
    <div
      style={{
        minHeight: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >

      <Container className="d-flex justify-content-center">

        <Card
          style={{
            width: "26rem",
            border: "none",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}
        >

          <Card.Body>

            <h2 className="text-center fw-bold mb-4">
              Welcome Back
            </h2>

            <Form onSubmit={handleLogin}>

              <Form.Group className="mb-3">

                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "12px",
                    borderRadius: "10px"
                  }}
                />

              </Form.Group>

              <Form.Group className="mb-3">

                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: "12px",
                    borderRadius: "10px"
                  }}
                />

              </Form.Group>

              <div className="d-grid mb-3">

                <Button
                  variant="primary"
                  type="submit"
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "18px"
                  }}
                >
                  LOGIN
                </Button>

              </div>

              <p className="text-center">

                Don't have an account?{" "}

                <Link
                  to={"/register"}
                  className="text-decoration-none fw-bold"
                >
                  REGISTER
                </Link>

              </p>

            </Form>

          </Card.Body>

        </Card>

      </Container>

    </div>
  )
}

export default Login