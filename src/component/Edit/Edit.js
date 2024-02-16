import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Edit.css';

const Edit = () => {
  const [edit, setEdit] = useState({});
  const { id } = useParams();
 const navigate = useNavigate()
  const getSingleData = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setEdit(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, [id]);

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, edit);
      if(response.data){
        alert('the Doto list is updatated successfullt')
        navigate('/')
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="edit">
      <div className='content'>
       <h1>Edit Title</h1>
        <input value={edit.title || ''} name='title' onChange={handleChange} placeholder="Edit your title..." />
        <br />
        <br />
        <button className='btn btn-primary p-3 m-1' onClick={handleEdit}>Edit Title</button>
      </div>
    </div>
  );
};

export default Edit;
