import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import SearchForm from "../SearchForm";
import SearchResultsList from "../SearchResultsList";
import { USERID } from "../../constants/apiConstants";
import API from "../../utils/API";

function ModalCompany(props) {
  const [companies, setCompanies] = useState([]);
  const [userType, setUserType] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([companies]);
  const [sortType, setSortType] = useState("a-z");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([users]);

  useEffect(() => {
    loadCompanies();
    loadUsers();
    typeUsers();
  }, []);

  function loadCompanies() {
    API.getCompanies()
      .then((res) => {
        setCompanies(res.data);
        setFilteredCompanies(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

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
    if (props.pageName === "Companies") {
      const listCompanies = companies.filter(
        (res) =>
          res.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
      );
      console.log(e.target.value);
      setFilteredCompanies(listCompanies);
    } else if (props.pageName === "Users") {
      const listUsers = users.filter(
        (res) =>
          (
            res.first_name.toLowerCase() +
            " " +
            res.last_name.toLowerCase()
          ).indexOf(e.target.value.toLowerCase()) >= 0
      );
      setFilteredUsers(listUsers);
    }
  }

  // Function to sort result by option choosen from Sort by picklist
  function sortBy(event) {
    if (props.pageName === "Companies") {
      setSortType(event.target.value.toLowerCase());
      let listCompaniesSorted = [];
      if (sortType === "a-z") {
        listCompaniesSorted = companies.sort((a, b) =>
          a.name < b.name ? 1 : -1
        );
        console.log(listCompaniesSorted);
      }
      if (sortType === "z-a") {
        listCompaniesSorted = companies.sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        console.log(listCompaniesSorted);
      }
      return setFilteredCompanies(listCompaniesSorted);
    } else if (props.pageName === "Users") {
      setSortType(event.target.value.toLowerCase());
      let listUsersSorted = [];
      if (sortType === "a-z") {
        listUsersSorted = users.sort((a, b) =>
          a.last_name > b.last_name ? 1 : -1
        );
        console.log(listUsersSorted);
      }
      if (sortType === "z-a") {
        listUsersSorted = users.sort((a, b) =>
          a.last_name < b.last_name ? 1 : -1
        );
        console.log(listUsersSorted);
      }
      return setFilteredUsers(listUsersSorted);
    }
  }

  return (
    <Modal show={props.show} size="lg">
      <Modal.Header closeButton onClick={props.handleModalShowHide}>
        <Modal.Title>List of {props.pageName} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchForm
          pageName={props.pageName}
          handleInputChange={handleInputChange}
          sortBy={sortBy}
        />
        <>
          {props.pageName === "Companies" ? (
            <SearchResultsList
              results={filteredCompanies}
              userType={userType}
              key={USERID}
              pageName="Companies"
            />
          ) : (
            <SearchResultsList
              results={filteredUsers}
              userType={userType}
              key={USERID}
              pageName="Users"
              handleDataBack={props.handleDataBack}
            />
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleModalShowHide}>
          Close
        </Button>        
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCompany;
