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


}
