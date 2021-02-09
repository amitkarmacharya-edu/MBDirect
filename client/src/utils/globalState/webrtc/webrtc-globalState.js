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
    REJECT_CALL,
    ACCEPT_CALL,
    INCOMING_CALL,
    LOADING
} from "./actions";

const MeetingContext = createContext();
const { Provider } = MeetingContext;

const reducer = (state, action) => {

    switch (action.type) {

        case SET_USER_ID:
            return {
                ...state,
                userId: action.userId,
                loading: false
            };

        case SAVE_USER_INFO:
            return {
                ...state,
                lobby: action.lobby,
                loading: false
            };

        case CLEAR_USER_INFO:
            return {
                ...state,
                lobby: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phoneNumber: "",
                    subject: "",
                    description: "",
                },
                loading: false
            };

        case START_MEETING:
            return {
                ...state,
                userId: action.userId,
                businessId: action.businessId,
                roomCreator: action.roomCreator,
                meetingStarted: true,
                loading: false,
                meetingType: action.meetingType
            };

        case CLOSE_MEETING:
            return {
                ...state,
                lobby: {
                    ...state.lobby,
                    subject: "",
                    description: ""
                },
                roomId: "",
                businessId: "",
                currentStage: state.stages[0],
                currentStageIndex: 0,
                remoteSocketId: "",
                roomCreator: false,
                meetingStarted: false,
                meetingType: "",
                loading: false
            };

        case UPDATE_STAGE:
            return {
                ...state,
                currentStage: action.updatedStage,
                currentStageIndex: action.updatedStageIndex,
                loading: false,
            };

        case SHOW_ALERTS:
            return {
                ...state,
                alertMsgs: action.errMsg,
                showAlerts: true
            };

        case HIDE_ALERTS:

            return {
                ...state,
                showAlerts: false,
            };

        case REJECT_CALL:
            let newCallList = state.callNotification.filter(call => {
                return call.remoteSocketId !== action.remoteSocketId
            });
            return {
                ...state,
                callNotification: [...newCallList],
                showCallNotification: state.callNotification.length > 0,
            };

        case INCOMING_CALL:
                console.log(action.data);
            return {
                ...state,
                callNotification: [action.data, ...state.callNotification],
                showCallNotification: true
            };

        case ACCEPT_CALL:
            let newList = state.callNotification.filter(call => {
                return call.remoteSocketId !== action.call.remoteSocketId
            });
            return {
                ...state,
                callNotification: [...newList],
                showCallNotification: newList.length > 0,
                currentStage: "CallSetup",
                currentStageIndex: 1,
                remoteSocketId: action.call.remoteSocketId,
                meetingStarted: true,
                meetingType: action.call.meetingType,
                loading: false
            };

        case LOADING:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
};

const MeetingProvider = ({ value = [], ...props }) => {

    const [state, dispatch] = useReducer(reducer, {
        lobby: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            subject: "",
            message: ""
        },
        callNotification: [],
        showCallNotification: false,
        alertMsgs: "",
        showAlerts: false,
        stages: ["Lobby", "CallSetup", "ConnectingCall", "InCall", "FeedBack"],
        currentStage: "Lobby",
        currentStageIndex: 0,
        roomCreator: false, // delete this for MBdirect
        userId: "",
        remoteSocketId: "",
        businessId: "",
        meetingStarted: false,
        loading: false,
        meetingType: "",

    });

    return <Provider value={[state, dispatch]} {...props} />;
};

const useMeetingContext = () => {
    return useContext(MeetingContext);
};

export { MeetingProvider, useMeetingContext };
