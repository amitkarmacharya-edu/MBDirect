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

    onIceCandidate({ candidate }) {

        if (candidate && candidate.candidate && this.onSignaler) {

            // console.log("---------------- filtered candidate -------------");
            // console.log(candidate.candidate);

            this.sendMessageToSignaler({
                polite: this.polite,
                startTime: this.startTime,
                peerData: {
                    type: "candidate",
                    candidate: JSON.stringify({ ice: candidate })
                }
            });

            console.log("ice candidate sent");

        } else {
            this.onerror({
                type: "EOI",
                message: "ENDOFICECANDIDATES: filtered all the non udp and null ice candidate "
            });
        }

    }

    onIceCandidateError(event) {
        console.log("On candidate Error");
        console.log(event);
    }

    onIceGatheringState(event) {
        let connection = event.target;

        switch (connection.iceGatheringState) {
            case "gathering":
                console.log("gathering");
                break;
            case "complete":
                console.log("complete");
                break;
            default: 
                console.log("new");
                break;
        }
    }

    /** Connection configuration */

    // caller will always be polite, people in the room
    // will always be an impolite peer and ignore the offer 
    // and respond with their own offer
    startCall() {
        console.log("started call ");

        if (!this.pc) {
            return;
        }

        // check if we connection has already started, offer/answer
        if (this.makingOffer || this.conHasStarted) {
            return;
        }

        this.makingOffer = true;
        this.polite = true;
        this.initiator = true;

        let constraints = this.initConfig.offerConstraints;
        // create an offer
        console.log("creating offer");
        this.pc.createOffer(constraints)
            .then((offer) => {

                console.log("setting localDescription");
                this.pc.setLocalDescription(new RTCSessionDescription(offer))
                    .then(() => {
                        console.log("got localDescription, sending offer");
                        console.log(this.pc.localDescription);

                        this.sendMessageToSignaler({
                            polite: this.polite,
                            startTime: this.startTime,
                            peerData: {
                                type: "description",
                                description: this.pc.localDescription
                            }
                        });

                        console.log("offer sent to signal channel");
                    })
                    .catch(err => {
                        this.onerror({
                            type: "FSLD",
                            message: "FAILETOSETLOCALDESCRIPTION: failed to setLocalDescription() while creating offer",
                            error: err
                        });
                    });

            })
            .catch(err => {
                this.onerror({
                    type: "FTCO",
                    message: "FAILEDTOCREATEOFFER: failed while creating offer as a caller",
                    err: err
                });
            })
            .finally(() => this.makingOffer = false);
    }
}

export default WebRTCPeerConnection;
