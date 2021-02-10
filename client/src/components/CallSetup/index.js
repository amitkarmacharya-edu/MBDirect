import React, { useEffect, useRef, useState } from "react";
import { useMeetingContext } from "../../utils/globalState/webrtc/webrtc-globalState";
import {
  CLOSE_MEETING,
  LOADING,
  SHOW_ALERTS,
  UPDATE_STAGE,
} from "../../utils/globalState/webrtc/actions";
import meap from "../../utils/webrtc/webrtc-meap";
import "./style.css";

function InCall() {
  const [state, dispatch] = useMeetingContext();

  const selfiCam = useRef();
  const remoteCam = useRef();

  const [connecting, setConnecting] = useState(true);
  const [toggleAudio, setToggleAudio] = useState(true);
  const [toggleVideo, setToggleVideo] = useState(true);

  useEffect(() => {
    // add listener to meap
    meap.remoteCam = remoteCam;
    meap.addListener(haveRemoteStreamNotificationCB);

    console.log("mounting In call");
    // start video and audio[]

    console.log("my socket id : " + meap.signalingChannel.socket.id);
    console.log("Remote socket id : " + meap.signalingChannel.remoteSocketId);
    console.log(meap);
    console.log(state.remoteSocketId);

    if (!state.remoteSocketId) {
      meap.joinSocketRoom({
        userInfo: state.lobby,
        meetingType: state.meetingType,
      });
    }

    if (!meap.signalingChannel && !meap.signalingChannel.socket) {
      dispatch({
        type: SHOW_ALERTS,
        errMsg: "Something Went wrong, Try Reconnecting again",
      });
      dispatch({ type: CLOSE_MEETING });
    }

    loadCam();

    return () => {
      console.log("unmountig In call");
    };
  }, []);

  function loadCam() {
    const { userId, businessId, remoteSocketId, meetingType } = state;

    meap.userId = userId;
    meap.selfiCam = selfiCam;
    meap.remoteCam = remoteCam;
    meap.businessId = businessId;
    meap.remoteSocketId = remoteSocketId;
    meap.userMediaConstraints =
      meetingType === "audio"
        ? { audio: true, video: false }
        : { audio: true, video: true };

    console.log(meap.userMedia);
    if (meap.userMedia && meap.userMedia.haveLocalStream) {
      console.log(meap.selfiCam);
      meap.selfiCam = selfiCam;
      meap.remoteCam = remoteCam;
      meap.selfiCam.current.srcObject = meap.userMedia.getLocalStream();
      if (meap.signalingChannel.remoteSocketId) {
        startConnection();
      }
    }

    if (!meap.userMedia || !meap.userMedia.haveLocalStream) {
      meap.setupUserMedia(playLocalUserMedia).then(() => {
        console.log(meap.userMedia.haveLocalStream);
        console.log(meap.userMedia.getLocalStream());
      });
    }
  }

  function startConnection() {
    console.log("starting Connection");
    if (state.remoteSocketId) {
      meap.isCallee = false;
      // meap.connectToPeers(meap.isCallee, state.remoteSocketId, haveRemoteStreamNotificationCB);
      meap.connectToPeers(meap.isCallee, state.remoteSocketId);
    } else if (meap.userId && meap.businessId) {
      meap.isCallee = true;
      // meap.connectToPeers(meap.isCallee, state.remoteSocketId, haveRemoteStreamNotificationCB)
      meap.connectToPeers(meap.isCallee, state.remoteSocketId);
    } else {
      meap.closeUserMedia();
      meap.closePeerConnection();
      dispatch({
        type: SHOW_ALERTS,
        errMsg: "Something Went wrong, Plese reconnect",
      });
      dispatch({ type: CLOSE_MEETING });
    }
    console.log("Connectiong Started");
  }

  function haveRemoteStreamNotificationCB() {
    alert("got remote stream");
    setConnecting(false);
    muteVideoWhileConnecting();
  }

  function muteVideoWhileConnecting() {
    meap.userMedia.toggleAudio();
    meap.userMedia.toggleVideo();
  }

  function playLocalUserMedia(stream) {
    alert("testing");
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
    meap.remoteCam = remoteCam;
    meap.selfiCam.current.srcObject = meap.userMedia.getLocalStream();

    startConnection();
  }

  async function handleCallEnd() {
    dispatch({ type: LOADING });
    if (localStorage.getItem("Authenticated") === true) {
      meap.closeSocketConnection();
      meap.closeUserMedia();
    } else {
      meap.closeMeeting();
    }
    console.log(meap);
    dispatch({ type: CLOSE_MEETING });
  }

  function toggleVideoAudio(input) {
    if (input === "audio") {
      meap.userMedia.toggleAudio();
      setToggleAudio(!toggleAudio);
    } else {
      meap.userMedia.toggleVideo();
      setToggleVideo(!toggleVideo);
    }
  }

  return (
    <>
      {connecting === true && (
        <div className="row connecting bg-dark">
          <div
            style={{ height: "50vh", width: "100%" }}
            className="col-12 p-2 bg-dark d-flex align-items-center flex-column"
          >
            <div className="mt-3">
              <h5 className="text-center">Connecting</h5>
            </div>
            <div className="my-auto">
              <img
                src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg"
                className="img-fluid"
              />
              <h5 className="text-center">Company Name</h5>
            </div>
            <div className="mb-3 text-center">
              {/* end call */}
              <button
                type="button"
                className="btn btn-secondary bg-dark text-danger text-center px-4 w-25"
                onClick={handleCallEnd}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  <path
                    fillRule="evenodd"
                    d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="row bg-dark h-100">
        <div className="col-12 p-2">
          <div className="video-playground position-relative">
            <div className="video-container  rounded">
              <video
                id="selfi-cam"
                className="self-potrait-lg"
                autoPlay
                playsInline
                ref={remoteCam}
              ></video>
              <p className="text-white p-1 text-center name">
                Amit Karmacharya
              </p>
            </div>

            <div className="video-container self-potrait-sm-container position-absolute rounded">
              <video
                id="selfi-cam"
                className=" bg-dark self-potrait-sm"
                autoPlay
                playsInline
                hidden={state.meetingType === "audio"}
                ref={selfiCam}
              ></video>
              <p className="text-white p-1 text-center name-sm">
                Amit Karmacharya
              </p>
            </div>
          </div>
          <div className="col-12 controls">
            {/* microphone */}
            <button
              type="button"
              className="btn btn-secondary bg-dark px-4 w-25"
              onClick={() => toggleVideoAudio("audio")}
            >
              {toggleAudio === true ? (
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
            {/* video camera */}
            <button
              type="button"
              className="btn btn-secondary bg-dark px-4 w-25"
              onClick={() => toggleVideoAudio("video")}
            >
              {toggleVideo === true ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
            {/* end call */}
            <button
              type="button"
              className="btn btn-secondary bg-dark text-danger px-4 w-25"
              onClick={handleCallEnd}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-telephone-x"
                viewBox="0 0 16 16"
              >
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                <path
                  fillRule="evenodd"
                  d="M11.146 1.646a.5.5 0 0 1 .708 0L13 2.793l1.146-1.147a.5.5 0 0 1 .708.708L13.707 3.5l1.147 1.146a.5.5 0 0 1-.708.708L13 4.207l-1.146 1.147a.5.5 0 0 1-.708-.708L12.293 3.5l-1.147-1.146a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
            {/* settings */}
            <button
              type="button"
              className="btn btn-secondary bg-dark px-4 w-25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-gear"
                viewBox="0 0 16 16"
              >
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InCall;
