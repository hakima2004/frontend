import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState({});
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/usersss/${id}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: 'error',
        });
      });
  }, [id]);

  const handleChange = event => {
    event.persist();
    const { name, value } = event.target;
    setUsers(prevUsers => ({
      ...prevUsers,
      [name]: value,
    }));

    if (name === 'password') {
      if (value.length < 6) {
        setValidationError(prevErrors => ({
          ...prevErrors,
          password: 'Password should be at least 6 characters long',
        }));
      } else {
        setValidationError(prevErrors => ({
          ...prevErrors,
          password: '', // Clear password validation error
        }));
      }
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const data = {
      name: users.name,
      email: users.email,
      role: users.role,
      password: users.password,
    };

    if (data.password.length < 6) {
      setValidationError(prevErrors => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      Swal.fire({
        icon: 'error',
        text: 'Password should be at least 6 characters long',
      });
      return; // Stop the submission
    }
        

    axios
      .put(`http://localhost:8000/api/uuserss/${id}`, data)
      .then(response => {
        console.log(response);
        Swal.fire({
          icon: 'success',
          text: data.message,
        });
        navigate('/act');
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: 'error',
          });
        }
      });
  };

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>modifier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
            <Row className="mb-12">
              <Form.Group className="col col-sm-6">
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={users.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-12">
              <Form.Group className="col col-sm-6">
                <Form.Label htmlFor="role">Role:</Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  value={users.role}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="col col-sm-6">
                <Form.Label htmlFor="password">Password:</Form.Label>
                <Form.Control
                  name="password"
                  value={users.password}
                  onChange={handleChange}
                  type="password"
                />
                {validationError.password && (
                  <Form.Text className="text-danger">
                    {validationError.password}
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
          Enregistrer
                    </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
