import * as sockets from "WEE-Sockets-API";

(async () => {
  let socket = new sockets.ListeningSocket();
  await socket.startListening();
  let sendingSocket = new sockets.SendingSocket();
  console.log("connecting to localhost port:", socket.port);
  await sendingSocket.connect("localhost", socket.port);
  sendingSocket.send("HELLO WORLD!!!", 'n');
  sendingSocket.close();
})();
