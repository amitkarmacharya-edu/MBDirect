import { io } from "socket.io-client";
export default class SignalingChannel {

    constructor(wssUrl, errorCB, msgCB) {
        this.wssUrl = wssUrl;
        this.roomId = null;
        this.userId = null;
        this.socket = null;
        this.connectedToRoom = false;

        // call backs
        this.onerrorCB = errorCB;
        this.onmessageCB = msgCB;
    }

    send(msg) {
        console.log("sending msg to socket server");
        if (!this.roomId || !this.userId) {
            return;
        }

        if (this.socket && this.connectedToRoom) {
            // sdp description broadcast
            this.socket.emit("signalChannel", {
                roomId: this.roomId,
                userId: this.userId,
                data: msg
            });
        }
    }
    
    connectToRoom(roomId, userId) {
        console.log("signalchannel: connecting to socket room: " + roomId);
        if (this.registered) {
            return;
        }

        console.log(roomId, userId);
        this.roomId = roomId;
        this.userId = userId;

        if (!this.roomId) {
            this.onerror({
                error: "roomId missing to register socket"
            });
        }

        if (!this.userId) {
            this.onerror({
                error: "userId missing to register socket"
            });
        }

        // connect to room
        this.socket.emit("connectRoom", {
            roomId: this.roomId,
            userId: this.userId
        });
    }
    
    leaveRoom() {
        if(!this.connectedToRoom){
            this.onerror({error: "not connected to any room"});
            return;
        }
        
        if(!this.roomId){
            this.onerror({error: "roomId missing to leave room"});
            return;
        } 
    
        this.socket.to(this.roomId).emit("leave", {
            roomId: this.roomId
        });
    }

    close() {

        if(!this.socket) {
            this.onerror({error: "no socket open to close"});
            return;
        }
        this.socket.close();
        this.socket = null;
        this.userId = null;
        this.roomId = null;
        this.connectedToRoom = false;
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
