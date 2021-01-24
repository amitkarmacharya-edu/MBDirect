import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import { List, ListItem } from "../../components/List";
import { USERID } from "../../constants/apiConstants";

function Users() {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    loadUsers();
    typeUsers();
  }, [])

  function loadUsers(){
    API.getUsers()
      .then(res => {
        setUsers(res.data);
        console.log(res.data);
      })       
      .catch(err => console.log(err));
  }

  function typeUsers(){
    const userId = localStorage.getItem(USERID);
    API.getUser(userId)
    .then(res => {
      setUserType(res.data.type);
    })    
  }
  

  return (
    <>
      <Navbar />
      <div className="users">
        <h1>Users</h1>
      </div>
      <Jumbotron>
              <h1>Users On My List</h1>
            </Jumbotron>
            { userType === "Admin" ? ( 
              <List>                
                {users
                .map(user => (
                  <ListItem key={user.email}>
                      <strong>
                        {user.first_name} by {user.last_name}
                      </strong>
                   
                    <DeleteBtn />
                  </ListItem>
                ))}
              </List>
            ) : (
              <List>                
                {users
                .filter(function (user){
                  console.log(user.id)
                  console.log(parseInt(localStorage.getItem(USERID)))
                  return user.id === parseInt(localStorage.getItem(USERID))                  
                })
                .map(function (user) {
                  return <ListItem key={user.email}>
                  <strong>
                    {user.first_name} by {user.last_name}
                  </strong>               
                <DeleteBtn />
              </ListItem>
                }
                )}
              </List>
            )}
    </>
  );
}

export default Users;
