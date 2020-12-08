import socketIOClient   from 'socket.io-client';

export class clientSocket {

    constructor(endpoint){
        this.socket = socketIOClient(endpoint);
    }

    listen (event, callback = ()=>{} ){
     
        this.socket.on(event, callback);
    }
    
    emit(event, ...data){
        this.socket.emit(event, ...data);
    }

}

