import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "yup-phone";
import { alertService } from "../../../services";
import API from "../../../utils/API";
import Row from "../../../components/Row";
import Col from "../../../components/Col";
import Container from "../../../components/Container";
import { USERID } from "../../../constants/apiConstants";
import { Button } from "react-bootstrap";
import ModalUser from "../../../components/Modal";

function AddEditCompany({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [userType, setUserType] = useState("");
  // variable to show or hide modal
  const [showHide, setShowHide] = useState(false);
  const [returnTest, setReturnTest] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();

  // Checking Usertype to grant Add/Eddit permissions.
  function typeUsers() {
    const userId = localStorage.getItem(USERID);
    API.getUser(userId).then((res) => {
      console.log(res.data.type);
      setUserType(res.data.type);
    });
  }

  // form validation rules
  const validationSchema = Yup.object().shape({
    id: Yup.string(),
    name: Yup.string().required("Company name is required"),
    description: Yup.string().required("Description is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string()
      .phone("US", true, "Format invalid")
      .required("Phone is required"),
    fax: Yup.string().phone("US", true, "Format invalid"),
    address: Yup.string().required("Street name is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zip_code: Yup.string().required("Zip code is required"),
    logo: Yup.string(),
    country: Yup.string().required("Country is required"),    
    status: Yup.string(),
    CategoryId: Yup.number().required("Category is required"),
    UserId: Yup.number(),
  });

  // functions to build form returned by useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit(data) {
    return isAddMode ? createCompany(data) : updateCompany(id, data);
  }

  //API call to create Company record
  function createCompany(data) { 
    return API.saveCompany(data)
      .then(() => {
        alertService.success("Company has been created", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch(function (error) {
        alertService.error(error.response.data.errors[0].message);
        console.log(error.response.data.errors[0].message);
      });
  }

  //API call to update company information
  function updateCompany(id, data) {
    console.log(data);
    return API.updateCompany(id, data)
      .then((res) => {
        console.log(res);
        alertService.success("Company updated", { keepAfterRouteChange: true });
        history.push("..");
      })
      .catch(alertService.error);
  }

  //Creating state to store categories from GetCategories API call to
  const [categories, setCategories] = useState([]);

  // API call pulling all Categories
  function getCategories() {
    return API.getCategories()
      .then((res) => {
        console.log(res);
        setCategories(res.data);
      })
      .catch(alertService.error);
  }

  // function to handle the modal
  function handleModalShowHide() {
    setShowHide(!showHide);
  }

  // Funtion to handle data choosen from Modal
  function handleDataBack(e) {
    e.preventDefault();
    console.log(e.target.dataset.id);
    console.log(e.target.dataset.user);
    setUserName(e.target.dataset.user);
    setUserId(e.target.dataset.id);
    handleModalShowHide();
  }

  // API call to Users for pulling owners info
  function checkOwnersInfo() {
    console.log(company);
    const userId = company.UserId;
    API.getUser(userId).then((res) => {
      setUserName(res.first_name + " " + res.last_name);
    });
  }

  const [company, setCompany] = useState({});
  useEffect(() => {
    if (!isAddMode) {
      // get company and set form fields
      API.getCompany(id).then((company) => {
        const fields = [
          "id",
          "name",
          "description",
          "address",
          "email",
          "phone",
          "fax",
          "logo",
          "city",
          "zip_code",
          "state",
          "country",
          "status",
          "CategoryId",
          "UserId",
        ];
        fields.forEach((field) => setValue(field, company.data[field]));
        setCompany(company.data);
      });
    }
    typeUsers();
    getCategories();
  }, []);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-2" />
        <Col size="md-8">
          <form
            className="card"
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <div className="card-header">
              <h1>{isAddMode ? "Add Company" : "Edit Company"}</h1>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-2">
                  <label>ID</label>
                  <input
                    name="id"
                    style={{
                      background: "rgba(0,0,0,0.07)",
                      pointerEvents: "none",
                    }}
                    type="text"
                    ref={register}
                    className={`form-control ${errors.id ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.id?.message}</div>
                </div>
                <div className="form-group col-5">
                  <label>Company Name</label>
                  <input
                    name="name"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    type="text"
                    ref={register}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.name?.message}
                    </div>
                </div>
                <div className="form-group col-5">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
              </div>              
              <div className="form-row">
                <div className="form-group col-6">
                  <label>Description</label>
                  <input
                    name="description"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.description ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.description?.message}
                  </div>
                </div>
                <div className="form-group col-3">
                  <label>Phone</label>
                  <input
                    name="phone"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.phone?.message}
                  </div>
                </div>
                <div className="form-group col-3">
                  <label>Fax</label>
                  <input
                    name="fax"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.fax ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.fax?.message}
                    </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-8">
                  <label>Address</label>
                  <input
                    name="address"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.address?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                  <label>City</label>
                  <input
                    name="city"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">{errors.city?.message}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-4">
                  <label>State</label>
                  <input
                    name="state"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.state ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.state?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                  <label>Zip Code</label>
                  <input
                    name="zip_code"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.zip_code ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.zip_code?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                  <label>Country</label>
                  <input
                    name="country"
                    type="text"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.country ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.country?.message}
                  </div>
                </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-3">
                    <label>Status</label>
                    <select
                      className="form-control form-select form-select-sm"
                      name="status"
                      ref={register}
                      aria-label=".form-select-sm"
                      disabled={userType === "Owner" ? true : false}
                      style={{
                        background: "rgba(0,0,0,0.07)",
                        height: "33px",
                        textAlign: "top",
                      }}
                    >
                      <option value="Active">Active </option>
                      <option value="Inactive">Inactive </option>
                    </select>
                  </div>
                  <div className="form-group col-3">
                    <label>Logo</label>
                    <input
                      name="logo"
                      type="text"
                      ref={register}
                      style={{ background: "rgba(0,0,0,0.07)" }}
                      className={`form-control ${
                        errors.logo ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.logo?.message}
                    </div>
                  </div>
                  <div className="form-group col-3">
                    <label>Category</label>
                    <select
                      className="form-control form-select form-select-sm"
                      name="CategoryId"
                      ref={register}
                      aria-label=".form-select-sm"
                      disabled={userType === "Owner" ? true : false}
                      style={{
                        background: "rgba(0,0,0,0.07)",
                        height: "33px",
                        textAlign: "top",
                      }}
                    >
                      {categories.map((result) => (
                        <option value={result.id} key={result.id}>
                          {result.name}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
                 <div className="form-row">
                  <div className="form-group col-4">
                    <label>Owner Id</label>
                    <>
                    {isAddMode === true ? (
                      <input
                        name="UserId"
                        type="text"
                        ref={register}
                        value={userId}
                        style={{
                          background: "rgba(0,0,0,0.07)",
                          height: "30px",
                        }}
                        className={`form-control ${
                          errors.UserId ? "is-invalid" : ""
                        }`}
                      />                     
                      
                    ) : (
                      <input
                        name="UserId"
                        type="text"
                        ref={register}
                        value={userId}
                        style={{
                          background: "rgba(0,0,0,0.07)",
                          height: "30px",
                        }}
                        className={`form-control ${
                          errors.UserId ? "is-invalid" : ""
                        }`}
                      />
                    )}
                    </>
                  </div>

                  <div className="form-group col-6">
                    <label>Owner Name</label>
                    <label
                      name="ownerName"
                      type="text"
                      disabled={userType === "Owner" ? true : false}
                      style={{ background: "rgba(0,0,0,0.07)", height: "30px" }}
                      className={`form-control ${
                        errors.UserId ? "is-invalid" : ""
                      }`}
                    >
                      {userName}
                    </label>
                    <div className="invalid-feedback">
                      {errors.UserId?.message}
                    </div>
                  </div>
                  <div className="form-group col-2 mt-2">
                    <Button variant="primary" onClick={handleModalShowHide}>
                      Search Owner
                    </Button>
                  </div>
                </div>              
            </div>
            <div className="card-footer">
              <div className="form-group">
                <button
                  type="submit"
                  disabled={formState.isSubmitting}
                  className="btn btn-primary"
                >
                  {formState.isSubmitting && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Save
                </button>
                <Link to={isAddMode ? "." : ".."} className="btn btn-link">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </Col>
        <Col size="md-2" />
      </Row>
      <ModalUser
        show={showHide}
        handleModalShowHide={handleModalShowHide}
        handleDataBack={handleDataBack}
        pageName="Users"
      />
    </Container>
  );
}

export { AddEditCompany };
