import axios from "axios";

export default {

  /*** USERS API AXIOS CALL ***/
  
  // Gets all Users
  getUsers: function() {
    console.log("IN");
    return axios.get("/api/users");
  },
  // Gets the User with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the User with the given id
  deleteUser: function(id) {
    return axios.delete("/api/users/" + id);
  },
  // Update the User with the given id
  updateUser: function(id) {
    return axios.put("/api/users/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Register new user
  registerUser: function(userData) {
    return axios.post("/api/register",userData);
  },
   // Login new user
   login: function(userData) {
    return axios.post("/api/login",userData);
  },
   // Logout user
   logout: function() {
    return axios.get("/logout");
  },

  /*** COMPANIES API AXIOS CALL ***/

  // Gets all Companies
  getCompanies: function() {
    console.log("IN");
    return axios.get("/api/companies");
  },
  // Gets the Company with the given id
  getCompany: function(id) {
    return axios.get("/api/companies/" + id);
  },
   // Update the Company with the given id
   updateCompany: function(id) {
    return axios.put("/api/companies/" + id);
  },
  // Deletes the Company with the given id
  deleteCompany: function(id) {
    return axios.delete("/api/companies/" + id);
  },
  // Saves a Company to the database
  saveCompany: function(userData) {
    return axios.post("/api/companies", userData);
  },


   /*** ADS API AXIOS CALL ***/

  // Gets all Ads
  getAds: function() {
    console.log("IN");
    return axios.get("/api/ads");
  },
  // Gets the Ad with the given id
  getAd: function(id) {
    return axios.get("/api/ads/" + id);
  },
   // Update the Ad with the given id
   updateAd: function(id) {
    return axios.put("/api/ads/" + id);
  },
  // Deletes the Ad with the given id
  deleteAd: function(id) {
    return axios.delete("/api/ads/" + id);
  },
  // Saves a Ad to the database
  saveAd: function(userData) {
    return axios.post("/api/ads", userData);
  },

   /*** MEETS API AXIOS CALL ***/

  // Gets all Meets
  getMeets: function() {
    console.log("IN");
    return axios.get("/api/meets");
  },
  // Gets the Meet with the given id
  getMeet: function(id) {
    return axios.get("/api/meets/" + id);
  },
   // Update the Meet with the given id
   updateMeet: function(id) {
    return axios.put("/api/meets/" + id);
  },
  // Deletes the Meet with the given id
  deleteMeet: function(id) {
    return axios.delete("/api/meets/" + id);
  },
  // Saves a Meet to the database
  saveMeet: function(userData) {
    return axios.post("/api/meets", userData);
  },
   
  
};
