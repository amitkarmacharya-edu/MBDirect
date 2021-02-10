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
        this.remoteSocketId = null;
        // calls back passed to singaling channel that handles 
        // call reject, accept and ringing/dialTone
        this.listener = [];
        this.subjectHasRemoteStream = false; 
    }

    /** SignalChannel */
    createSocketConnection(handleDialTone, callGotRejected) {
        return new Promise((resolve, reject) => {
            if (this.signalingChannel && this.signalingChannel.socket) {
                console.log("have socket connection");
                resolve();
            }
            try {
                this.signalingChannel = new SignalingChannel(
                    "ws://127.0.0.1:3001",
                    this.userId,
                    this.handleSignalError,
                    this.incomingSignalMessage.bind(this),
                    handleDialTone,
                    callGotRejected
                );
                this.signalingChannel.open();
                console.log(this.signalingChannel);
                console.log("creating Socket Connection: successfull");
                resolve();
            } catch (e) {
                console.log("Erro while creating signal channel");
                reject();
            }
        });
    }

    closeSocketConnection() {
        console.log(this.signalingChannel);
        if (!this.signalingChannel) {
            return;
        }
        this.signalingChannel.close();
        this.signalingChannel = null;
    }

    joinSocketRoom(meetingInfo) {
        return new Promise((resolve, reject) => {
            if (!this.businessId) {
                this.onerror("need businessId connect");
                reject();
            }

            if (!(this.signalingChannel && this.signalingChannel.socket)) {
                this.onerror("socket connection hasn't been established");
                reject();
            }

            console.log("connecting to the socket room");
            this.signalingChannel.connectToBusinessRoom(meetingInfo, this.businessId, this.userId);
            resolve();
        });
    }

    /** peer Connection */
    createPeerConnection(params, remoteUserId = "NO_ID") {
        console.log("creating peer connection");
        const cb = {
            errorHandler: this.handleError,
            remoteStreamHandler: this.remoteStreamHandler.bind(this),
            signalHandler: this.sendSignalMessage.bind(this),
            haveRemoteStreamNotificationCB: this.haveRemoteStreamNotificationCB
        }   
        let pc = {
            con: new WebRTCPeerConnection({ ...params, ...cb }),
            remoteUserId: remoteUserId,
        };

        console.log(this.userMedia);
        console.log(this.userMedia.getLocalStream());
        pc.con.addLocalStream(this.userMedia.getLocalStream());
        // save the pc to pcs collection
        this.pcs[remoteUserId] = pc;
        console.log(pc);
        console.log(this.pcs);
        console.log("created peer connection");

    }

    closePeerConnection() {
        if (!this.pcs) {
            return;
        }

        console.log(this.pcs);

        Object.keys(this.pcs).forEach(key => {
            this.pcs[key].con.close();
        });
        this.pcs = {};
    }

    setupPeerConnection({ userId, data }) {

        if (Object.keys(this.pcs).length <= 0) {
            console.log("No existing connection so new connection was found")
            this.createPeerConnection(peerConConfig);
            if (this.pcs && this.pcs["NO_ID"]) {
                let pc = this.pcs["NO_ID"];
                delete this.pcs["NO_ID"];
                console.log(this.pcs);
                pc.remoteUserId = userId;
                pc.polite = !data.polite;
                this.pcs[userId] = pc;

                if (!this.pcs[userId].con.localStream) {
                    this.pcs[userId].con.addLocalStream(this.userMedia.getLocalStream());
                }
                this.pcs[userId].con.receivedMessageFromSignaler(data.peerData);
            }
        } else if (this.pcs && this.pcs[userId]) {
            console.log("FOund user with id: " + userId);
            if (!this.pcs[userId].con.localStream) {
                this.pcs[userId].con.addLocalStream(this.userMedia.getLocalStream());
            }
            this.pcs[userId].con.receivedMessageFromSignaler(data.peerData);
        } else if (this.pcs && this.pcs["NO_ID"]) {

            console.log(`polite: ${data.polite}, startTime: ${data.startTime}`);

            let bePolite = this.pcs["NO_ID"].con.startTime > data.startTime;
            this.pcs["NO_ID"].con.polite = bePolite;
            this.pcs["NO_ID"].remoteUserId = userId;
            let pc = this.pcs["NO_ID"];
            delete this.pcs["NO_ID"];
            this.pcs[userId] = pc;


            console.log(`changed NO_ID to : ${userId} and bePolite: ${this.pcs[userId].polite}`);
            console.log(this.pcs);

            if (!this.pcs[userId].con.localStream) {
                this.pcs[userId].con.addLocalStream(this.userMedia.getLocalStream());
            }
            this.pcs[userId].con.receivedMessageFromSignaler(data.peerData)
        }
    }

    connectToPeers(isCallee, remoteSocketId) {
        console.log("connecting to peer");
        console.log("creating NO_ID peer connection");

        this.isCallee = isCallee;
        this.remoteSocketId = remoteSocketId;
        // this.haveRemoteStreamNotificationCB = haveRemoteStreamNotificationCB;
        this.createPeerConnection(peerConConfig);

        if (this.pcs && this.pcs["NO_ID"]) {
            console.log("starting call");
            if(!this.isCallee) {
                this.pcs["NO_ID"].con.startCall();
                console.log("started Peer Connection");
            } else {
                console.log("waiting for peer to answer the call");
            }
        } else {
            console.log("no pcs connections");
        }
    }

    /** singaling messages  */
    incomingSignalMessage(remoteSocketId, userId, data) {
        console.log("received from peers");
        console.log(remoteSocketId);
        console.log(userId);
        console.log(data);
        if (!data || !userId) {
            console.log(data);
            console.log(userId);
            this.onerror({
                error: `Need data  and userId, Got data:${data && true} and userId: ${userId && true}`
            });
            return;
        }
        if (data.error) {
            console.log(data.error)
            this.onerror(data.error);
            return;
        }
        this.remoteSocketId = remoteSocketId;
        this.setupPeerConnection({ userId, data })
    }

    sendSignalMessage(msg) {
        console.log("received msg from peerCon sending msg to signal channel");
        console.log(msg);
        if (!msg) {
            return;
        }
        if (!this.signalingChannel) {
            this.onerror("no signaling channel present to send msgs");
            return;
        }
        this.signalingChannel.send(msg);
    }

    handleSignalError(error) {
        console.log(error);
    }

    /** getUserMedia */
    setupUserMedia(CB) {
        return new Promise((resolve, reject) => {
            try{
                console.log("creating userMedia");
                console.log(this.userMediaConstraints);
                this.userMedia = new WebRTCUserMedia(this.userMediaConstraints, CB);
                resolve();
            } catch (e) {
                reject();
            }
        });
    }

    closeUserMedia() {
        if (!this.userMedia) {
            console.log("no media");
            return;
        }
        this.userMedia.close();
        this.userMedia = null;
        console.log("media closed");
    }
    
    /** media streams */
    gotLocalStream() {
        console.log("got local stream , invoked by userMedia open inside .then()");
        if(this.playMediaStreamCB){
            console.log("callback function played");
            this.playMediaStreamCB();
        }
        this.playLocalStream();
    }

    playLocalStream() {
        if (!this.userMedia) {
            this.onerror({
                error: "No Local Media"
            });
            return;
        }

        console.log("playing local stream");
        console.log(this.userMedia);
        console.log(this.selfiCam)
        // older browsers may not have srcObject
        this.selfiCam.current.srcObject = this.userMedia.getLocalStream();
        this.selfiCam.current.muted = true;

    }

    remoteStreamHandler({ track, streams }) {

        console.log(track);
        console.log(streams);

        console.log(this.remoteCam);
        // if(!this.remoteCam) {
        //     this.isConnectedCB()
        //     return;
        // }
        // if(this.remoteCam){
        //     this.userMedia.toggleAudio();
        //     this.userMedia.toggleVideo();
        // }
        

        alert("came from remoteStream handler");
        track.onunmute = () => {
            console.log("inside onunmute")
            if (this.remoteCam.current.srcObject) {
                return;
            }
            this.remoteCam.current.srcObject = streams[0];
            console.log("Playing remote video");
            console.log(this.remoteCam.current.srcObject);
            
        }

        // flag subject Has Remote stream
        this.subjectHasRemoteStreamNotification();
    }

    subjectHasRemoteStreamNotification() {
        this.subjectHasRemoteStream = true;
        this.listener.forEach(obs => {
            obs();
        });
    }

    addListener(listener){
        this.listener.push(listener);
    }
    
    /** Meeting */
    closeMeeting() {
        console.log("close meeting");
        this.closeUserMedia();
        this.closeSocketConnection();
        this.closePeerConnection();
    }

    leaveRoom() {
        console.log("leaving room");
        API.leaveRoom({ userId: this.userId, roomId: this.roomId })
            .then(res => {
                console.log(res.data);
                console.log("userMedia");
                console.log(this.userMedia);
            })
            .catch(err => {
                console.log(err);
            });
        
            this.closeMeeting();
    }

    /** error and info */
    onerror(msg) {
        console.log(msg);
        this.onerrorCB(msg)
    }
}

const meets = new Meap({audio: true, video: true});

export default meets;