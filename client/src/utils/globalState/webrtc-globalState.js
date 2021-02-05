import React, { createContext, useReducer, useContext } from "react";
import {
  SET_USER_ID,
  SAVE_USER_INFO,
  CLEAR_USER_INFO,
  START_MEETING,
  CLOSE_MEETING,
  UPDATE_STAGE,
  SHOW_ALERTS,
  HIDE_ALERTS,
  LOADING
} from "./actions";

const MeetingContext = createContext();
const { Provider } = MeetingContext;

const reducer = (state, action) => {
    
    switch(action.type){
        case SET_USER_ID:
            return {
        ...state,
        userId: action.userId,
        loading: false
      };

      default:
        return state;

    }

};

const MeetingProvider = ({ value = [], ...props }) => {
    
    const [state, dispatch] = useReducer(reducer, {
        lobby: {
          firtName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          subject: "",
          message: ""
        },
        alertMsgs: "",
        showAlerts: false,
        stages: ["Lobby", "CallSetup", "InCall", "FeedBack"],
        currentStage: "Lobby",
        currentStageIndex: 0,
        roomCreator: false, // delete this for MBdirect
        userId: "",
        roomId: "",
        businessId: "",
        meetingStarted: false,
        loading: false,
        meetingType: ""
      });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useMeetingContext = () => {
    return useContext(MeetingContext);
};

export { MeetingProvider, useMeetingContext };
