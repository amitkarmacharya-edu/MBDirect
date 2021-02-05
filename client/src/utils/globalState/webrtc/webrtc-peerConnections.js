class WebRTCPeerConnection {

    constructor({
        initConfig,
        errorHandler,
        remoteStreamHandler,
        signalHandler
    }) {

        // save init configuration
        this.initConfig = initConfig;
        // record the time the connnection was started
        this.startTime = Date.now();

        // perfect nogotiation pattern
        this.polite = false;
        this.initiator = false;
        this.makingOffer = false;
        this.ignoreOffer = false;
        this.conHasStarted = false;
        this.localStream = false;
        this.remoteStream = null;

        // needed argument to create RTCPeerConnection instance
        // and to create an offer
        this.rtcConfig = initConfig.rtcConfig;
        this.offerConstraints = initConfig.offerConstraints;

        // RTCPeerConnection creation and initialization
        this.pc = new RTCPeerConnection(this.rtcConfig);
        this.pc.onnegotiationneeded = this.onnegotiation.bind(this);
        this.pc.onicecandidate = this.onIceCandidate.bind(this);
        this.pc.oniceconnectionstatechange = this.onConnectionStateChange.bind(this);
        this.pc.onicecandidateerror = this.onIceCandidateError;
        this.pc.ontrack = this.receivedRemoteStream.bind(this);
        this.pc.onconnectionstatechange = this.connectionStateChange.bind(this);
        this.pc.onicegatheringstatechange = this.iceGatheringState;
        
        // callbacks to handle various RTCPeeconnection event
        // will be initialized by the app layer
        this.onErrorCB = errorHandler;
        this.onRemoteStreamCB = remoteStreamHandler;
        this.onSignaler = signalHandler;



    }

}

export default WebRTCPeerConnection;
