(async () => {
  let socket = new ListeningSocket();
  await socket.startListening();
  let sendingSocket = new SendingSocket();
  console.log("connecting to localhost port:", socket.port);
  await sendingSocket.connect("localhost", socket.port);
  sendingSocket.send("HELLO WORLD!!!");
  sendingSocket.close();
})();
