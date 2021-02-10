import { io } from "socket.io-client";
import { useMeetingContext } from "../globalState/webrtc/webrtc-globalState";

export default class SignalingChannel {
    constructor(wssUrl, userId = null, errorCB, msgCB, dialToneCB, callGotRejected) {
        this.uid = Math.floor(Math.random() * 10 + 1 );
        this.wssUrl = wssUrl;
        this.businessId = null;
        this.userId = userId;
        this.socket = null;
        this.remoteSocketId = null;
        this.connectedToBusinessRoom = false;

        // call backs
        this.onerrorCB = errorCB;
        this.onmessageCB = msgCB;
        this.handleDialTone = dialToneCB;
        this.callGotRejected = callGotRejected;

    }

    open() {
        if (this.socket) {
            console.log(this.socket);
            return;
        }

        this.socket = new io();

        // connection
        this.socket.on("connect", () => {
            // register business associated to the user
            console.log("socketId: " + this.socket.id);
            this.socket.emit("RegisterBusinessToMeets", {
                userId: this.userId
            });
            console.log("connected to socket");
        });

        /**
         * Find and Register Business to the user socket it
         * All the calls from Business will be forwarded to 
         * the ownner socket id
         */

        // status when business are attached to the user
        this.socket.on("BusinessRegistered", (businessId) => {
            console.log(businessId);
            console.log("business connected : " + businessId);
        });

        // status when business are attached to the user
        this.socket.on("FailedToRegisterBusiness", (errMsg) => {
            console.log(errMsg);
        });

        /**
         * connect to the socket room associated with the business
         */
        // connected to room
        this.socket.on("connectedToRoom", ({userId, roomId}) => {
            console.log(`${userId} connected to ${roomId}`);
            this.connectedToBusinessRoom = true;
        });

        // failed to connect to room
        this.socket.on("BusinessBusy", (error) => {
            console.log("Business is busy with other calls, or not available");
            this.onerror(error);
        });

        // user connected to room
        this.socket.on("welcomeToTheBusiness", (msg) => {
            console.log(msg);
        });

        // status when business are attached to the user
        this.socket.on("failedToConnectRoom", (errMsg) => {
            console.log(errMsg);
        });

        /**
         *  Incoming and out Going calls
         */

        // when user joins, they keep broadcast their presence
        // unless the business answer
        this.socket.on("dialTone", (data) => {
            console.log(data);
            if(!data && !this.handleDialTone){
                console.log("NO handle Dial tone");
                return;
            }
            this.connectToBusinessRoom = true;
            console.log(this.handleDialTone);
            this.handleDialTone(data);
            console.log("testing");
        });

        // call rejected
        this.socket.on("callRejected", (remoteSocketId) => {
            this.socket.emit("leaveRoom", {remoteSocketId});
            console.log("Call was rejected");
            console.log(this.callGotRejected);
            this.connectedToBusinessRoom = false;
            this.callGotRejected();
        });
        
        // call accepted
        this.socket.on("callAccepted", () => {
            console.log("Call was accepted");
        });

        /**
         * Messages from other sockets/peer
         */
        // mssage forward by signaling channel
        this.socket.on("peerMessages", ({remoteSocketId, userId, data}) => {
            console.log("Singaling channel : remoteSocketId : " + remoteSocketId);
            console.log("received msessages from peers");
            if(!data || !userId){
                return;
            }
            this.remoteSocketId = remoteSocketId;
            console.log('======peerserver======')
            console.log("mysocket id: " + this.socket.id);
            console.log("remote socket id: " + remoteSocketId);
            console.log('============')
            this.onmessageCB(remoteSocketId, userId, data);
        });

        // error
        this.socket.on("connecterror", () => {
            console.log("connection error");
            console.log("trying to reconnect");

            clearTimeout(setTimeout(() => {
                this.socket.connect();
            }, 2000));
        });

        // disconnect
        this.socket.on("disconnect", () => {
            console.log("disconnected");
        });
    }

    send(msg) {
        console.log("sending msg to socket server");
        console.log(this);
        if(!this.remoteSocketId){
            return;
        }

        console.log('==send==========')
        console.log("mysocket id: " + this.socket.id);
        console.log("remote socket id: " + this.remoteSocketId);
        console.log('============')
        if (this.socket) {
            // sdp description broadcast
            this.socket.emit("signalChannel", {
                mySocketId: this.socket.id,
                remoteSocketId: this.remoteSocketId,
                userId: this.userId,
                data: msg
            });
        }
       console.log("signal sent to server");
    }
    
    connectToBusinessRoom(meetingInfo, bId, userId) {
        console.log("signalchannel: connecting to socket room: " + bId);
        if (this.connectedToBusinessRoom) {
            return;
        }

        console.log(bId, userId);
        this.businessId = bId;
        this.userId = userId;

        if (!this.businessId) {
            this.onerror({
                error: "roomId missing to register socket"
            });
            return;
        }

        if (!this.userId) {
            this.onerror({
                error: "userId missing to register socket"
            });
            return;
        }

        console.log('======connet to business======')
        console.log("mysocket: " + this.socket);
        console.log("mysocket id: " + this.socket.id);
        console.log("remote socket id: " + this.remoteSocketId);
        console.log('============')

        // connect to room
        this.socket.emit("connectToBusiness", {
            userInfo: meetingInfo.userInfo,
            meetingType: meetingInfo.meetingType,
            bId: this.businessId,
            userId: this.userId
        });
    }

    leaveRoom() {
        if(!this.connectedToBusinessRoom){
            this.onerror({error: "not connected to any room"});
            return;
        }
        
        if(!this.businessId){
            this.onerror({error: "roomId missing to leave room"});
            return;
        } 
    
        this.socket.to(this.businessId).emit("leave", {
            businessId: this.businessId
        });
    }

    rejectCall(remoteSocketId){
        console.log("remote call rejected from : " + remoteSocketId);
        this.socket.emit("callRejected", {remoteSocketId});
    }

    close() {

        if(!this.socket) {
            this.onerror({error: "no socket open to close"});
            return;
        }
        this.socket.close();
        this.socket = null;
        this.userId = null;
        this.businessId = null;
        this.connectedToBusinessRoom = false;
        this.onerrorCB = null;
        this.onmessageCB = null;
    }
    
    onerror(error){
        console.log(error);
        if(!error){
            return;
        }
        if(!this.onerrorCB){
            alert("signaling channel onerrorCB not implemented");
            return;
        }

        this.onerrorCB({
            error: "userId missing to register socket"
        });

    }
}
