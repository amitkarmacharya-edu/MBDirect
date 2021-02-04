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
import { Button } from 'react-bootstrap';
import ModalCompany from "../../../components/Modal"
import $ from "jquery";



function AddEditAd({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;
  const [userType, setUserType] = useState("");
  // variable to show or hide modal
  const [showHide, setShowHide] = useState(false);
  const [returnTest, setReturnTest] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyId, setCompanyId] = useState();
  const [userId, setUserId] = useState();
  
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
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    discount: Yup.string(),
    status: Yup.string().required("Status is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
    CompanyId: Yup.number(),
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
    return isAddMode ? createAd(data) : updateAd(id, data);
  }

  //Creating new Ad
  function createAd(data) {
    console.log(data);
    console.log(Array.from(data.image));
    const file = Array.from(data.image);

    const fd = new FormData($("#adsForm")[0]);
    console.log(fd);
    $.ajax({
      url: "/api/ads",
      type: "POST",
      data: fd,
      contentType: false,
      processData: false,
    })
      .then(() => {
        alertService.success("Advertisment has been created", {
          keepAfterRouteChange: true,
        });
        history.push(".");
      })
      .catch(function (error) {
        alertService.error(error.response.data.errors[0].message);
        console.log(error.response.data.errors[0].message);
      });

    // console.log("Saving Ad");
    // return API.saveAd(data)
    //   .then(() => {
    //     alertService.success("Advertisment has been created", {
    //       keepAfterRouteChange: true,
    //     });
    //     history.push(".");
    //   })
    //   .catch(alertService.error);
  }

  // Function to Update Ad information 
  function updateAd(id, data) {

    console.log(Array.from(data.image));
    const file = Array.from(data.image);
    const fd = new FormData($("#adsForm")[0]);
    console.log(fd);
    $.ajax({
      url: "/api/ads/" + id,
      type: "PUT",
      data: fd,
      contentType: false,
      processData: false,
    })
      .then(() => {
        alertService.success("Ad has been updated", {
          keepAfterRouteChange: true,
        });
        history.push("..");
      })
      .catch(function (error) {
        alertService.error(error.response.data.errors[0].message);
        console.log(error.response.data.errors[0].message);
      });


    // console.log(data);
    // return API.updateAd(id, data)
    //   .then((res) => {
    //     console.log(res);
    //     alertService.success("Advertisment updated", {
    //       keepAfterRouteChange: true,
    //     });
    //     history.push("..");
    //   })
    //   .catch(alertService.error);
  }

  const [ad, setAd] = useState({});

  // function to handle the modal
  function handleModalShowHide() {
    setShowHide(!showHide);    
  }

    // Funtion to handle data choosen from Modal
  function handleDataBack(e) {
    e.preventDefault();  
    setCompanyName(e.target.dataset.company);
    setCompanyId(e.target.dataset.id);
    setUserId(e.target.dataset.userid);
    handleModalShowHide();
  }

 // API call to Users for pulling owners info
 function checkCompanyInfo(companyId) {  
  console.log(companyId); 
  API.getCompany(companyId).then((res) => {    
    setCompanyName(res.data.name);
  });
}

// API call to get Ad Data choosen from each card and pass company ID to checkCompanyInfo Function
async function getAdData (id){
  let res = await API.getAd(id);
  let adData= await res.data;  
  console.log(adData); 
  let companyId = await adData.CompanyId;
  console.log(companyId);
  checkCompanyInfo(companyId);
  const fields = [
    "id",
    "name",
    "description",
    "discount",
    "status",
    "image",
    "start_date",
    "end_date",
    "CompanyId",
    "UserId",
  ];

  fields.forEach((field) => {
    if (field === "image" && adData[field] !== "") {
      console.log("there is something");
      return setValue(field, "");
    }
    return setValue(field, adData[field]);
  }); 
  
  return adData;
}


  useEffect(() => {
    if (!isAddMode) {
      // get company and set form fields
      getAdData(id);     
      
    }

    // if (!isAddMode) {
    //   // get user and set form fields
    //   API.getAd(id).then((ad) => {
    //     const fields = [
    //       "id",
    //       "name",
    //       "description",
    //       "discount",
    //       "status",
    //       "image",
    //       "start_date",
    //       "end_date",
    //       "CompanyId",
    //       "UserId",
    //     ];
    //     fields.forEach((field) => setValue(field, ad.data[field]));
    //     setAd(ad.data);
    //   });
    // }
    typeUsers();
  }, []);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        <Col size="md-2" />
        <Col size="md-8">
          <form
            id="adsForm"
            className="card"
            onSubmit={handleSubmit(onSubmit)}
            onReset={reset}
          >
            <div className="card-header">
              <h1>{isAddMode ? "Add Adverstiment" : "Edit Adverstiment"}</h1>
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
                  <label>Name</label>
                  <input
                    name="name"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    type="text"
                    ref={register}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-5">
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
                    <option value="Active">Active</option>
                    <option value="Deactivate">Deactivate</option>
                  </select>
                </div>
                <div className="form-group col-4">
                  <label>Image</label>
                  <input
                    name="image"
                    type="file"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)",
                    height: "33px",
                    paddingTop: "2px",
                    paddingBottom: "2px",
                   }}
                    className={`form-control ${
                      errors.image ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.image?.message}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-4">
                  <label>Start Date</label>
                  <input
                    name="start_date"
                    type="date"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.start_date ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.start_date?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                  <label>End Date</label>
                  <input
                    name="end_date"
                    type="date"
                    ref={register}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.end_date ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.end_date?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                  <label>Discount</label>
                  <input
                    name="discount"
                    type="number"
                    ref={register}
                    min="0"
                    max="100"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.discount ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.discount?.message}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-2">
                  <label>Company Id</label>
                  <input
                    name="CompanyId"
                    type="number"
                    ref={register}
                    value={companyId}
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.CompanyId ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.CompanyId?.message}
                  </div>
                </div>
                <div className="form-group col-4">
                        <label>Company Name</label>
                        <label
                          name="companyName"
                          type="text"
                          // disabled={userType === "Owner" ? true : false}
                          style={{
                            background: "rgba(0,0,0,0.07)",
                            height: "30px",
                          }}
                          className={`form-control ${
                            errors.companyName ? "is-invalid" : ""
                          }`}
                        >
                          {companyName}
                        </label>
                        <div className="invalid-feedback">
                          {errors.companyName?.message}
                        </div>
                      </div>
                <div className="form-group col-3 align-self-center" >                        
                        <Button variant="primary" onClick={handleModalShowHide}>
                          Search Company
                        </Button>
                      </div>
                <div className="form-group col-3">
                  <label>User Id</label>
                  <input
                    name="UserId"
                    type="number"
                    ref={register}
                    value={userId}
                    diplay="block"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                    className={`form-control ${
                      errors.UserId ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.UserId?.message}
                  </div>
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
      <ModalCompany show={showHide} handleModalShowHide={handleModalShowHide} handleDataBack={handleDataBack} pageName="Companies"/>
                
    </Container>
  );
}

export { AddEditAd };
