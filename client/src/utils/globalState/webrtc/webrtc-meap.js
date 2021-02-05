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

    init() {

        if (!this.userId || !this.businessId || !this.roomId) {
            throw new Error(`Provide Info: userId: ${this.userId && true}, businessId: ${this.businessId && true}, roomId: ${this.roomId && true}`)
        }

        console.log("userId : " + this.userId);
        console.log("roomId : " + this.roomId);
        console.log("callee: " + this.isCallee);
        console.log("initializing meetingroom");

        if (this.signalingChannel) {
            return;
        }

        Promise.all([
            this.createSocketConnection(),
            this.joinSocketRoom(),
            this.setupUserMedia()
        ])
        .then(
                (fulfillment) => {
                    console.log("setup was successfull");
                },
                (rejection) => {
                    this.leaveRoom();
                }
            );
    }
    
    /** SignalChannel */
    createSocketConnection() {
        console.log("creating Socket Connection");
        return new Promise((resolve, reject) => {
            if (this.signalingChannel && this.signalingChannel.socket) {
                console.log("have socket connection");
                resolve();
            }
            try {
                this.signalingChannel = new SignalingChannel("ws://127.0.0.1:3001",
                    this.handleSignalError,
                    this.incomingSignalMessage
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

    joinSocketRoom() {
        return new Promise((resolve, reject) => {
            if (this.roomId === "") {
                this.onerror("need roomId to load the socket");
                reject();
            }

            if (!(this.signalingChannel && this.signalingChannel.socket)) {
                this.onerror("socket connection hasn't been established");
                reject();
            }

            console.log("connecting to the socket room");

            this.signalingChannel.connectToRoom(this.roomId, this.userId);
            resolve();
        });

    }

    
}

const meets = new Meap({audio: true, video: true});

export default meets;