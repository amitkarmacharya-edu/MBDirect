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
