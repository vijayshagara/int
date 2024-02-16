import React, { useState, useEffect } from "react";
import axios from "axios";
import './Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate()

  const getProduct = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigate = (e)=>{
   let id = e.target.value
   navigate(`/edit/${id}`)
  }

  const handleDelete = async(e)=>{
    try {
        let id = e.target.value
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        if(response){
            alert('the doto list is deleted')
            navigate('/')
        }
    } catch (error) {
        console.log(error);
    }

  }

  // Filtering the data based on the search query
  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div>
        <h1 className="mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Doto list</h1>
      <div className="mt-2" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {searchQuery ? (
        <div className="main">
          {filteredData.map(filteredItem => (
            <div className="card" key={filteredItem.id}>

            <div className="card-body" >
            <h6 className="card-subtitle mb-2 text-muted">{filteredItem.id}</h6>
            <h5 className="card-title">{filteredItem.title}</h5>
            <h4 className="card-text">{filteredItem.completed.toString()}</h4>
            <button type="button" value={filteredItem.id} onClick={handleNavigate}className="btn btn-primary p-3">Edit</button> &nbsp;
                <button type="button" value={filteredItem.id} onClick={handleDelete}className="btn btn-danger p-3">Delete</button>
          </div>
          </div>


        ))}
        </div>
      ) : (
        <div  className="main">
          {data.map((d) => (
            <div className="card" key={d.id}>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">Id: {d.id}</h6>
                <h5 className="card-title">Title: {d.title}</h5>
                <h4 className="card-text">Status: {d.completed.toString()}</h4>
                <button type="button" value={d.id} onClick={handleNavigate}className="btn btn-primary p-3">Edit</button> &nbsp;
                <button type="button" value={d.id} onClick={handleDelete}className="btn btn-danger p-3">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
