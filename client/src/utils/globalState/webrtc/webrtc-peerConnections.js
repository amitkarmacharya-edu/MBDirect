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

        /** connection change */
        connectionStateChange(event) {
            switch (this.pc.connectionState) {
                case "connected":
                    this.conHasStarted = true;
                    console.log("connection has started");
                    break;
                case "disconnected":
                case "failed":
                // One or more transports has terminated unexpectedly or in an error
                case "closed":
                    console.log("disconnected, failed, closed");
                    // The connection has been closed
                    this.conHasStarted = false
                    break;
            }
        }

        onnegotiation() {
            if (!this.pc) {
                return;
            }
    
            if (!this.conHasStarted) {
                return
            }
    
            console.log("negoation under way");
    
            this.makingOffer = true;
    
            // calling without arguments automatically creates and sets the 
            // appropriate description based on the current signalingState.
            this.pc.setLocalDescription()
                .then(() => {
                    this.sendMessageToSignaler({
                        polite: this.polite,
                        startTime: this.startTime,
                        peerData: {
                            type: "description",
                            description: this.pc.localDescription
                        }
                    });
                    console.log("sent description on negotiation");
                })
                .catch(err => {
                    console.log(false);
                    this.onerror(
                        {
                            type: "FSLD",
                            message: "FAILETOSETLOCALDESCRIPTION: onenogationneeded failed to setLocalDescription().",
                            error: err
                        }
                    );
                })
                .finally(() => {
                    this.makingOffer = false;
                });
        }

        /** Ice */
    onConnectionStateChange(event) {

        console.log(event);
        console.log("iceConnectionState: " + this.pc.iceConnectionState);

        if (!this.pc) {
            return
        }

        if (this.pc.iceConnectionState === "failed") {
            this.pc.restartIce();
        }

    }
}

export default WebRTCPeerConnection;
