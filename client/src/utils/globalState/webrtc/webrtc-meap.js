import WebRTCPeerConnection from "./webrtc-peerConnection";
import SignalingChannel from "./webrtc-signalingChannel";
import WebRTCUserMedia from "./webrtc-userMedia";
import peerConConfig from "./webrtc-config";
import API from "../API";

class Meap {
    constructor(userMediaConstraints) {
        this.uid = Math.floor(Math.random() * 10 + 1);
        this.userId = null;
        this.roomId = null;
        this.businessId = null;
        this.startTime = Date.now();
        this.pcs = {};
        this.signalingChannel = null;
        this.userMedia = null;
        this.isCallee = null;
        this.userMediaConstraints = userMediaConstraints;
        this.selfiCam = null;
        this.remoteCam = null;
        this.onerrorCB = null;
    }

    
}

const meets = new Meap({audio: true, video: true});

export default meets;