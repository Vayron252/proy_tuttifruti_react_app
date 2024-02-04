import * as signalR from "@microsoft/signalr";
const URL = `${import.meta.env.VITE_API_URL}/room`; //or whatever your backend port is
class Connector {
    connection;
    events;
    static instance;
    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.connection.start().catch(err => document.write(err));
        this.events = (onConnectedApp, onListRooms, onConnectedRoomUser, onAlertRoomUser, onDisconnectRoom) => {
            this.connection.on("connectedApp", (username, message) => {
                onConnectedApp(username, message);
            });
            this.connection.on("listRooms", (username, message) => {
                onListRooms(username, message);
            });
            this.connection.on("connectedRoomUser", (username, message) => {
                onConnectedRoomUser(username, message);
            });
            this.connection.on("readyRoomUser", (username, message) => {
                onAlertRoomUser(username, message);
            });
            this.connection.on("disconnectRoom", (username, message) => {
                onDisconnectRoom(username, message);s
            });
        };
    }
    conecctionAppUser = (idusuario) => {
        this.connection.send("connectedAppUser", "app", idusuario).then(x => console.log("sent"))
    }
    joinSpecificRoom = (idsala, idusuario) => {
        this.connection.send("joinSpecificRoom", "app", idsala, idusuario).then(x => console.log("sent"))
    }
    alertReadyRoomUser = (idsala, idusuario) => {
        this.connection.send("alertReadyRoomUser", "app", idsala, idusuario).then(x => console.log("sent"))
    }
    alertDisconnectRoomUser = (idjuego) => {
        this.connection.send("alertDisconnedRoomUser", "app", idjuego).then(x => console.log("sent"))
    }
    static getInstance() {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;