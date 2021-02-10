import {
  CLOSE_MEETING,
  LOADING,
  SET_USER_ID,
  SHOW_ALERTS,
  UPDATE_STAGE,
  INCOMING_CALL,
} from "../../utils/globalState/webrtc/actions";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import React, { useEffect, useRef, useState } from "react";
import meap from "../../utils/webrtc/webrtc-meap";
import API from "../../utils/API";
import "./style.css";

function CallSetup() {
  const [state, dispatch] = useMeetingContext();
  const [toggleAudioIcon, setToggleAudioIcon] = useState(true);
  const [toggleVideoIcon, setToggleVideoIcon] = useState(true);
  const [disableStartButton, setDisableStartButton] = useState(false);

  const selfiCam = useRef();

  useEffect(() => {
    console.log("mounting CallSetup");

    setUpCall();
    loadCam();

    // unmounting
    return () => {
      selfiCam.current.srcObject = null;
      console.log("unmounting CallSetup");
    };
  }, []);

  function setUpCall() {
    // setup meap connection
    let { userId, businessId, remoteSocketId, meetingType } = state;
    console.log("userID ; " + userId);
    console.log("businessID : " + businessId);
    console.log("remoteSocketId:  " + remoteSocketId);
    console.log("meetingType: " + meetingType);

    // callsetup from lobby without id or bid and
    // remoteSocketId is set when answering incoming call
    if ((!userId || !businessId) && !remoteSocketId) {
      onerror("User ID, Business Id was missing, Please try reconnecting");
      dispatch({ type: CLOSE_MEETING });
      return;
    }

    meap.isCallee = true;
    meap.userId = userId;
    meap.selfiCam = selfiCam;
    meap.businessId = businessId;
    meap.remoteSocketId = remoteSocketId;
    meap.userMediaConstraints =
      meetingType === "video"
        ? { audio: true, video: true }
        : { audio: true, video: false };

    console.log(meap.selfiCam);
    console.log(meap.userMedia);

    // if (meap.signalingChannel && meap.signalingChannel.socket && state.remoteSocketId) {
    //     dispatch({
    //         type: UPDATE_STAGE,
    //         updatedStage: "ConnectingCall",
    //         updatedStageIndex: 2
    //     });
    // }
    console.log("mounted component");
  }

  function loadCam() {
    console.log(meap);
    console.log(meap.userMedia);

    meap.setupUserMedia(playLocalUserMedia).then(() => {
      console.log(meap.userMedia);
      console.log(meap.userMedia.constraints);
    });
    console.log(state);
  }

  function callGotRejected() {
    console.log("call got rejected by the business");
    meap.closeMeeting();
    console.log(meap);
    dispatch({
      type: SHOW_ALERTS,
      errMsg: "Business is busy with another client.",
    });
    dispatch({ type: CLOSE_MEETING });
  }

  function handleDialTone(data) {
    console.log("coming from handleDiatone inside Dashboard");
    console.log(data);
    dispatch({ type: INCOMING_CALL, data: data });
  }

  function playLocalUserMedia(stream) {
    if (!meap.userMedia) {
      dispatch({ type: SHOW_ALERTS, errMsg: "Couldn't get Local Media" });
      return;
    }

    console.log("playing local stream");
    console.log(meap.userMedia);
    console.log(meap.selfiCam);
    // older browsers may not have srcObject
    console.log(selfiCam.current.srcObject);
    console.log(meap.userMedia.haveLocalStream);
    console.log(meap.userMedia.getLocalStream());
    console.log(meap.userMediaConstraints);
    meap.selfiCam = selfiCam;
    meap.selfiCam.current.srcObject = meap.userMedia.getLocalStream();
  }

  function handleCallCancel() {
    if (meap.userMedia) {
      meap.userMedia.close();
      meap.userMedia = null;
    }
    selfiCam.current.srcObject = null;
    dispatch({ type: CLOSE_MEETING });
  }

  async function handleCallStart() {
    dispatch({ type: LOADING });

    try {
      if (!meap.signalingChannel) {
        console.log("no signal channel so start connection");
        let res = await meap.createSocketConnection(
          handleDialTone,
          callGotRejected
        );
      }
      // meap.userMedia.close();
      selfiCam.current.srcObject = null;
      console.log(selfiCam);
      dispatch({
        type: UPDATE_STAGE,
        updatedStage: "InCall",
        updatedStageIndex: 3,
      });
    } catch (err) {
      console.log(err);
      onerror(err);
    }
  }

  function handleVideoAudioToggle(input) {
    if (!selfiCam.current.srcObject) {
      return;
    }
    if (input === "audio") {
      meap.userMedia.toggleAudio();
      setToggleAudioIcon(!toggleAudioIcon);
    } else {
      meap.userMedia.toggleVideo();
      setToggleVideoIcon(!toggleVideoIcon);
    }
  }

  function onerror(err) {
    console.log(err);
    dispatch({ type: SHOW_ALERTS, errMsg: err });
  }

  return (
    <div className="call-setup row bg-dark h-100">
      <div className="col-12 p-2 h-100 w-100">
        <div className="video-playground">
          <div className="video-container rounded">
            <video
              id="selfi-cam"
              className="self-potrait h-100 bg-white"
              autoPlay
              playsInline
              ref={selfiCam}
            ></video>
            <p className="text-white p-1 text-center name">
              {state.lobby.firstName} {state.lobby.lastName}
            </p>
          </div>
        </div>
        {/* controls */}
        <div className="col-12 controls text-center">
          {/* Cancel Call */}
          <button
            type="button"
            className="btn btn-secondary bg-danger w-25 px-1 mx-1"
            onClick={handleCallCancel}
          >
            Cancel
          </button>
          {/* Start Call */}
          <button
            type="button"
            className="btn btn-secondary bg-success w-25 px-1 mx-1"
            onClick={handleCallStart}
            disabled={disableStartButton}
          >
            Start
          </button>
          {/* toggle video*/}

          {state.meetingType === "video" ? (
            <button
              type="button"
              className="btn btn-secondary bg-white w-25 mx-1"
              onClick={() => handleVideoAudioToggle("video")}
            >
              {toggleVideoIcon === true ? (
                // video on icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera-video text-success"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z"
                  />
                </svg>
              ) : (
                // mute video icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-camera-video-off text-danger"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l.714 1H9.5a1 1 0 0 1 1 1v6a1 1 0 0 1-.144.518l.605.847zM1.428 4.18A.999.999 0 0 0 1 5v6a1 1 0 0 0 1 1h5.014l.714 1H2a2 2 0 0 1-2-2V5c0-.675.334-1.272.847-1.634l.58.814zM15 11.73l-3.5-1.555v-4.35L15 4.269v7.462zm-4.407 3.56l-10-14 .814-.58 10 14-.814.58z"
                  />
                </svg>
              )}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-secondary bg-white mx-1 w-25"
              onClick={() => handleVideoAudioToggle("audio")}
            >
              {toggleAudioIcon === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-mic text-success "
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-mic-mute text-danger"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963l.845.845A2 2 0 0 1 10 3v3.879l1 1zM8.738 9.86l.748.748A3 3 0 0 1 5 8V6.121l1 1V8a2 2 0 0 0 2.738 1.86zm4.908 3.494l-12-12 .708-.708 12 12-.708.707z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CallSetup;
