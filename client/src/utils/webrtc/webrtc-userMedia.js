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

    open(){
        /**
         * check if webrtc is supported
         */
        this.checkForWebRTCSupport();

        /**
         * request list of devices before requesting user media 
         * which helps detect if any media devices are present
         */
        // this.getMediaDevices();
        this.getLocalUserMedia(this.constraints);
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
    onDeviceChangeHandler() {
        console.log("Updating Media Devices");
        this.getMediaDevices();
    }

    getMediaDevices() {
        if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
            throw new Error("Couldn't find any media device");
        }        
        
        // get list of devices
        navigator.mediaDevices.enumerateDevices()
            .then(this.saveMediaDevices.bind(this))
            .catch(err => { throw new Error(err) });
    }

    saveMediaDevices(devices) {
        if (!devices && devices.length <= 0){
            throw new Error("Media Device is required, found None.");
        }

        /**
         * save all the media devices
         * and separate them into their own type
         * those which aren't vitual
         */
        const audioinput = [];
        const audiooutput = [];
        const videoinput = [];
        this.mediaDevices = devices.filter( device => {
            if (device.deviceId === "" || device.label.indexOf("Virtual") !== -1){
                return false;
            }

            if (device.kind === "audioinput"){
                audioinput.push(device);
            } else if (device.kind === "audiooutput") {
                audiooutput.push(device);
            } else if (device.kind === "videoinput") {
                videoinput.push(device);
            }

            return true;
        });

        this.audioInputDevices = [...audioinput];
        this.audioOutputDevices = [...audiooutput];
        this.videoInputDevices = [...videoinput];

        console.log(devices);
        console.log("Saved All Media Devices");
    }

    /** access user Media */

    // gets local media from the navigator, then calls get localStream.
    // calls the function to tell the listener
    // about the localmedia stream
    async getLocalUserMedia() {
        console.log("WebRTCUserMedia: getUserMedia(): requesting user's media");
        // requesting user media devices
        try {
            const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
            this.localStream = stream;
            this.haveLocalStream = true;
            if(this.onLocalStream){
                this.onLocalStream(stream);
            }
        } catch (e) {
            console.log(e);
        }
    }

    getLocalStream() {
        return this.localStream;
    }
    
    toggleAudio() {
        this.localStream.getAudioTracks().forEach(track => {
            if (track.readyState === 'live') {
                track.enabled = !track.enabled;
            }
        });
    }

    toggleVideo() {
        console.log("video toogle");
        this.localStream.getVideoTracks().forEach(track => {
            if(track.readyState === 'live') {
                track.enabled = !track.enabled;
            }
        });
    }

    close() {
        if (!this.haveLocalStream) {
            console.log("no stream to close")
            return;
        }

        this.localStream.getTracks().forEach(track => { 
            track.stop();
        });

        this.mediaDevices = [];
        this.videoInputDevices = [];
        this.audioInputDevices = [];
        this.audioOutputDevices = [];
        this.activeAudioInputDevice = null;
        this.activeAudioOutputDevice = null;
        this.activeVideoInputDevice = null;

        // indicates if stream was saved
        this.haveLocalStream = false;

    }
    
}
