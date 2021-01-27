import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { USERID } from "../../constants/apiConstants";


function Users(props) {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([users]);
  const [sortType, setSortType] = useState("a-z");
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    loadUsers();
    typeUsers();   
  }, []);

  function loadUsers() {
    API.getUsers()
      .then((res) => {
        setUsers(res.data);
        setFilteredUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
      console.log(res.data.type);
      setUserType(res.data.type);
    });
  }

  function handleInputChange(e) {
    const listUsers = users.filter(
      (res) =>
        (
          res.first_name.toLowerCase() +
          " " +
          res.last_name.toLowerCase()
        ).indexOf(e.target.value.toLowerCase()) >= 0
    );
    console.log(e.target.value);
    setFilteredUsers(listUsers);
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy (event) {    
    setSortType(event.target.value.toLowerCase());
    let listUsersSorted =[];
    if (sortType === 'a-z'){
      listUsersSorted = users.sort((a,b) => (a.last_name > b.last_name) ? 1 : -1);
      console.log(listUsersSorted);       
    }
    if (sortType === 'z-a') {
      listUsersSorted = users.sort((a,b) => (a.last_name < b.last_name) ? 1 : -1);
      console.log(listUsersSorted);           
    }       
    return setFilteredUsers(listUsersSorted);
  };

  return (
    <div>
      <Navbar sidebar={sidebar} isActive={showSidebar}/>      
      <Container sidebar={sidebar} isActive={showSidebar} style={{ marginTop: 30 }}>      
      <Row>
          <Col size="md-12">        
            <div>
              <Container style={{ minHeight: "80%" }}>             
                <SearchForm pageName="Users"                 
                  handleInputChange={handleInputChange}
                  sortBy={sortBy}
                />
                <SearchResults results={filteredUsers} userType={userType} pageName="Users"/>
              </Container>
            </div>
          </Col>
        </Row>      
      </Container>
    </div>
  );
}

export default Users;
