import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Modal } from 'react-bootstrap';
import {  Button, Input} from '@material-ui/core';
import Appp from "../AppRoute";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import Registration from './addUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { MDBIcon } from 'mdbreact';
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Regist from "./conducteurs";
import PersonAddIcon from '@mui/icons-material/PersonAdd';


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers();
}, []);

const fetchUsers = async () => {
    await axios.get(`http://localhost:8000/api/uusers`).then(({data})=>{
        setUsers(data);
    });
};

const deleteUser = async (id) => {
  const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      return result.isConfirmed;
  });

  if(!isConfirm){
      return;
  }

  await axios.delete(`http://localhost:8000/api/destory/${id}`).then(({data})=>{
      Swal.fire({
          icon:"success",
          text:data.message
      });
      fetchUsers();
  }).catch(({response:{data}})=>{
      Swal.fire({
          text:data.message,
          icon:"error"
      });
  });
};

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
   <>  
    <div>
      <Appp />
    </div>
   <br /> <br /> <br />
   <div className="container"> 
      <div className="row mb-3">
            <div className='col-12' >
    
    <div row= "mb-3" style={{ align: "center", marginLeft: "20%"}}> 
            <div className="col-8">
                <div className="card card-body">   
                
                    <div className="table-responsive"> 
                    <>
   <Button onClick={() => setShowModal(true)} style={{marginRight: "50%"}} variant="secondry">

   <PersonAddIcon size="2x"  />

    </Button>
    <br /> <br />
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ajouter un utilisateur/administrateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Registration />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
    <Table className="table table-bordered mb-0 text-center" hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
      {
        users.length > 0 && (
        users.map((row, key)=>(
        <tr key={key}>
            <td>{row.name}</td>
            <td>{row.email}</td>
            <td>{row.role}</td>
            <td>
   
    <FaTrash size={20} color="#ff0000" variant="danger" onClick={()=>deleteUser(row.id)} style={{marginRight: '15%'}}/>

    <Link to={`/editUser/${row.id}`} >  <FaEdit className="edit-icon" size={20} color="#2E8B57" /> </Link>
          
            </td>
        </tr>
        ))
        )
    }
      </tbody>
    </Table>
    </div>
    </div>
    </div>
    </div></div></div>
    </div>
  
    </>
    
  );
}

export default UserList;



