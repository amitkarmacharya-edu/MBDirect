import React, { useState, useRef, useEffect } from "react";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import { CLOSE_MEETING, LOADING, SAVE_USER_INFO, CLEAR_USER_INFO, UPDATE_STAGE, SHOW_ALERTS }  from "../../utils/globalState/webrtc/actions";
import "./style.css";
function Lobby() {

    const [state, dispatch] = useMeetingContext();
    const [disabled, setDisabled] = useState(true);
    const formRef = useRef();

    useEffect(() =>{
        console.log("populate data");
        populateFormData();
    }, []);

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log("form submit");

        if(!state.businessId){
            dispatch({type: SHOW_ALERTS, errMsg: "Meeting Cannot start without a Business Id"});
            return;
        }

        dispatch({type: LOADING});
        // do a form submit
        dispatch({
            type: UPDATE_STAGE, 
            updatedStage: "CallSetup",
            updatedStageIndex: 1
        });
    }

    const handleFormCancel = () => {
        dispatch({type: LOADING});
        // call signalling channel to clsoe the socket connection
        dispatch({type: CLOSE_MEETING});
    }

    const handleOnChange = e => {
        let value = e.target.value;
        let name = e.target.name;
        let lobby = state.lobby;
      
        lobby[name] = value;

        dispatch({type: SAVE_USER_INFO, lobby: lobby});

        if(!state.lobby.firstName || !state.lobby.lastName || !state.lobby.email){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
        
    }
    const clearForm = () => {
        const form = formRef.current.elements;
        console.log(form);
        dispatch({type: LOADING});
        Array.from(form).forEach(ele => {
            if(ele.value !== ""){
                ele.value = "";
            }
        });
        dispatch({type: CLEAR_USER_INFO});
    }
    const populateFormData = () => {
        const form = formRef.current;
        let lobby = state.lobby;
        Object.keys(lobby).forEach(item => {
            if(!lobby[item]){
                return;
            }

            form.elements[item].value = lobby[item];
        });

        if(lobby["firstName"] && lobby["lastName"] && lobby["email"]){
            setDisabled(false);
        }

    }

    return (
        <form className="row bg-white m-auto lobby-form text-dark" ref={formRef}>
            <p className="px-3 mt-3">Please Provide your information</p>
            {/* full name */}
            <div className="mb-3 col-12">
                <label className="form-label">First Name: <span className="text-danger">*</span></label>
                <input onChange={handleOnChange} name="firstName" type="text" className="form-control" placeholder="John " required/>
            </div>
            {/* last name */}
            <div className="mb-3 col-12">
                <label className="form-label">Last Name: <span className="text-danger">*</span></label>
                <input onChange={handleOnChange} name="lastName" type="text" className="form-control" placeholder="Doe" required/>
            </div>
            {/* email */}
            <div className="mb-3 col-12">
                <label className="form-label">Email Address: <span className="text-danger">*</span></label>
                <input onChange={handleOnChange} name="email" type="email" className="form-control" placeholder="example@email.com" required/>
            </div>
            {/* phone number */}
            <div className="mb-3 col-12">
                <label className="form-label">Phone Number:</label>
                <input onChange={handleOnChange} name="phoneNumber" 
                type="text" 
                className="form-control"
                />
            </div>
            {/* subject */}
            <div className="mb-3 col-12">
                <label className="form-label">Subject</label>
                <input onChange={handleOnChange} name="subject" type="text" className="form-control"  placeholder="Enter your subject" />
            </div>
            {/* message */}
            <div className="mb-3 col-12">
                <label className="form-label">Message: </label>
                <textarea onChange={handleOnChange} name="descritpion" className="form-control" rows="3" placeholder="Enter your message"></textarea>
            </div>
            <div className="col-12 text-right">
                <a className="mb-3" onClick={clearForm}>Clear</a>
                <button className="btn btn-danger mb-3 mx-2" onClick={handleFormCancel}>Cancel</button>
                <button 
                type="submit" 
                className="btn btn-primary mb-3" 
                onClick={handleFormSubmit}
                disabled={disabled}
                >
                    Setup Call</button>
            </div>
        </form>
    );
}
export default Lobby;