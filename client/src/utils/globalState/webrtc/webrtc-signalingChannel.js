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

    

}
