import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Register = ({ isUserAuthenticated, setIsUserAuthenticated }) => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(
        "https://task-management-dv04ijfoz-ahmedraza08450s-projects.vercel.app/api/v1/user/register",
        {
          firstName,
          lastName,
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

      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")

      setIsUserAuthenticated(true)

      toast.success(res.data.message)

    } catch (error) {
      toast.error(error.response.data.message)
      setIsUserAuthenticated(false)

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
            width: "28rem",
            border: "none",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
          }}
        >

          <Card.Body>

            <h2 className="text-center mb-4 fw-bold">
              Create Account
            </h2>

            <Form onSubmit={handleRegister}>

              <Form.Group className="mb-3">

                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ padding: "12px", borderRadius: "10px" }}
                />

              </Form.Group>

              <Form.Group className="mb-3">

                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ padding: "12px", borderRadius: "10px" }}
                />

              </Form.Group>

              <Form.Group className="mb-3">

                <Form.Control
                  type="text"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ padding: "12px", borderRadius: "10px" }}
                />

              </Form.Group>

              <Form.Group className="mb-3">

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ padding: "12px", borderRadius: "10px" }}
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
                  REGISTER
                </Button>

              </div>

              <p className="text-center">

                Already Registered?{" "}

                <Link
                  to={"/login"}
                  className="text-decoration-none fw-bold"
                >
                  LOGIN
                </Link>

              </p>

            </Form>

          </Card.Body>

        </Card>

      </Container>
    </div>
  )
}

export default Register