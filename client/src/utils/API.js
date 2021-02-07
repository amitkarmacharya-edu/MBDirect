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
  updateUser: function(id, userData) {
    return axios.put("/api/users/" + id,userData);
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
    // Gets the Company with the given id
  getCompaniesByUser: function(userId) {
    return axios.get("/api/companies/byuser/" + userId);
  },
   // Update the Company with the given id
  updateCompany: function(id,companyData) {
    return axios.put("/api/companies/" + id,companyData);
  },
  // Deletes the Company with the given id
  deleteCompany: function(id) {
    return axios.delete("/api/companies/" + id);
  },
  // Saves a Company to the database
  saveCompany: function(companyData) {
    return axios.post("/api/companies", companyData);
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
   // Gets the Company with the given id
   getAdsByUser: function(userId) {
    return axios.get("/api/ads/byuser/" + userId);
  },
   // Update the Ad with the given id
   updateAd: function(id, data) {
    return axios.put("/api/ads/" + id, data);
  },
  // Deletes the Ad with the given id
  deleteAd: function(id) {
    return axios.delete("/api/ads/" + id);
  },
  // Saves a Ad to the database
  saveAd: function(adData) {
    return axios.post("/api/ads", adData);
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
  // Gets total Guests with the given user id
  getGuestsbyUserId: function(userId) {
    return axios.get("/api/meets/countguests/" + userId);
  },
  // Gets total Guests with the given user id
  getMeetsbyUserId: function(userId) {
    return axios.get("/api/meets/countmeets/" + userId);
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
  saveMeet: function(meetData) {
    return axios.post("/api/meets", meetData);
  },
  countMeetsByMonth: function(id, year) {
    return axios.get("/api/meets/meetsbymonth/" + id + "/" + year);
  },
  countAllMeetsByMonth: function(year) {
    return axios.get("/api/meets/allmeetsbymonth/" + year);
  },
   
   /*** Categories API AXIOS CALL ***/

  // Gets all Categories
  getCategories: function() {
    console.log("IN");
    return axios.get("/api/categories");
  },
  // Gets the Category with the given id
  getCategory: function(id) {
    return axios.get("/api/categories/" + id);
  },
   // Update the Category with the given id
   updateCategory: function(id) {
    return axios.put("/api/categories/" + id);
  },
  // Deletes the Category with the given id
  deleteCategory: function(id) {
    return axios.delete("/api/categories/" + id);
  },
  // Saves a Category to the database
  saveCategory: function(categoryData) {
    return axios.post("/api/categories", categoryData);
  },
  countCategoriesByCompany: function() {
    return axios.get("/api/categories/countbycompany");
  },
};
