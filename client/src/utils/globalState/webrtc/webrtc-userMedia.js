export default class WebRTCUserMedia {
    constructor(constraints, gotLocalStreamListener = null){
        this.constraints = constraints;
        // stores MediaDevices
        this.mediaDevices = [];
        this.videoInputDevices = [];
        this.audioInputDevices = [];
        this.audioOutputDevices = [];
        this.activeAudioInputDevice = null;
        this.activeAudioOutputDevice = null;
        this.activeVideoInputDevice = null;

        // indicates if stream was saved
        this.haveLocalStream = false;
        
        // stores localstream type MediaStream;
        this.localStream = null;

        // listener or observers
        this.onLocalStream = gotLocalStreamListener;

        // checks for media devices changes
        navigator.mediaDevices.ondevicechange = this.onDeviceChangeHandler.bind(this);
        this.open();
    }

    /** check for webrtc support */

    checkForWebRTCSupport(){
        // check if weRTC is supported
        let isWebRTCSupported = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        window.RTCPeerConnection;

       if (!isWebRTCSupported) {
           throw new Error("WebRTC not supported in your browser. please use chrome, firefox, safari, or edge");
       }

   }

    /** get media devices */

    getMediaDevices() {
        if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
            throw new Error("Couldn't find any media device");
        }        
        
        // get list of devices
        navigator.mediaDevices.enumerateDevices()
            .then(this.saveMediaDevices.bind(this))
            .catch(err => { throw new Error(err) });
    }

    onDeviceChangeHandler() {
        console.log("Updating Media Devices");
        this.getMediaDevices();
    }

    /** access user Media */

    // gets local media from the navigator, then calls get localStream.
    // calls the function to tell the listener
    // about the localmedia stream
    getLocalUserMedia() {
        console.log("WebRTCUserMedia: getUserMedia(): requesting user's media");
        // requesting user media devices
        navigator.mediaDevices.getUserMedia(this.constraints)
            .then(this.saveLocalMediaStream.bind(this))
            .then(() => this.onLocalStream())
            .catch(err => {
                throw new Error(err + ". Please click on the camera icon to change permission.");
            });
    }

}
