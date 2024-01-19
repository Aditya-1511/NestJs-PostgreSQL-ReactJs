import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  //   const [edit, setEdit] = useState(false);
  //   const [changeName, setChangedName] = useState('')
  const [data, setData] = useState({});
  const { id } = useParams();
  //   console.log(id, '----------getUserDetails');

  //   const handleEdit = () => {
  //     setEdit(true);
  //   };

  useEffect(() => {
    const getUser = () => {
      // console.log(id, '---');
      axios
        .get(`http://localhost:8000/users/getUser/${id}`, {})
        .then((res) => {
          console.log(res, '---->> res');
          setData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getUser();
  }, [id]);

  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/innerHome');
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Name : {data?.name}</p>
          <p>ID : {data?.id}</p>
          <p>Email : {data?.email}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleBackButton}>
            Back
          </Button>
          {/* <Button variant="primary">Edit details</Button> */}
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Profile;
