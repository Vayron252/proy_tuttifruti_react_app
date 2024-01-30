import * as signalR from "@microsoft/signalr";
const URL = "https://localhost:7263/room"; //or whatever your backend port is
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
        this.events = (onRecibeMensaje, onListRooms, onListPlayersRoom) => {
            this.connection.on("recibeMensaje", (username, message) => {
                onRecibeMensaje(username, message);
            });
            this.connection.on("listRooms", (username, message) => {
                onListRooms(username, message);
            });
            this.connection.on("listPlayersRoom", (username, message) => {
                onListPlayersRoom(username, message);
            });
        };
    }
    generarConexionUsuario = (idusuario) => {
        this.connection.send("generarConexionUsuario", "foo", idusuario).then(x => console.log("sent"))
    }
    static getInstance() {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    }
}
export default Connector.getInstance;