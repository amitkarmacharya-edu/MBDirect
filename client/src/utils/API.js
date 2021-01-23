import axios from "axios";

export default {
  // Gets all books
  getUsers: function() {
    console.log("IN");
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the book with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Saves a book to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Register new user
  registerUser: function(userData) {
    return axios.post("/api/register",userData);
  },
   // Register new user
   login: function(userData) {
    return axios.post("/api/login",userData);
  },
   // Logout user
   logout: function() {
    return axios.get("/logout");
  }
};
