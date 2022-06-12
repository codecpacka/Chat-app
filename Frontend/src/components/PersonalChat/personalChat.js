import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/esm/Container"
import { io } from "socket.io-client"
import { Button, Card, Form } from "react-bootstrap"
const socket = io("http://localhost:3000")

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue("")
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  )
}

const PersonalChat = () => {
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  function getData(msg) {
    setData(msg.target.value)
    console.warn(msg.target.value)
  }

  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      isDone: false,
    },
  ])
  const addTodo = (text) => {
    const newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  return (
    <div className="personalChat">
      <Navbar>
        <Container>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/")}
          >
            Logout<i className="bi bi-lock-fill"></i>
          </button>

          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => navigate("/home")}
          >
            <i className="bi bi-house-heart"></i>
          </button>
        </Container>
      </Navbar>
      <hr />

      <div className="row">
        <div className="col-sm-2">
          <div className="card" style={{ height: "600px" }}>
            <div className="card-body">
              <h4 className="card--title">
                {/* <i className="bi bi-person-fill"></i>User */}
                <i className="bi bi-person-fill"></i>
                {data}
              </h4>
              <hr />
            </div>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="card" style={{ height: "600px" }}>
            <div className="header" style={{ padding: "3px" }}>
              <h4>
                <i class="bi bi-chat-dots-fill"></i> User
              </h4>
            </div>
            <hr />

            <div className="body">utgut</div>

            <div
              className="footer"
              style={{ position: "absolute", bottom: "0", width: "100%" }}
            >
              <div className="row">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={getData}
                  ></input>
                  <button className="btn btn-outline-info">&#9658;</button>
                  <FormTodo addTodo={addTodo} />
                  <div>
                    {todos.map((todo, index) => (
                      <Card>
                        <Card.Body>"{todo.text}"</Card.Body>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalChat
