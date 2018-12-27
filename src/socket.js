let DataReceiver = {
  callbacks: new Map(),
  onDataReceived: (aSocketId, aData) => {
    if (!DataReceiver.callbacks.has(aSocketId)) {
      return;
    }
    DataReceiver.callbacks.get(aSocketId)._updateQueue(aData);
  },
};

browser.sockets.onDataReceived.addListener(DataReceiver.onDataReceived);

let ListeningSockets = new Map();

class ListeningSocket {
  constructor() {
    this.queue = []; // stores messages sent to socket
  }

  async startListening() {
    this.port = await browser.sockets.createServerSocket();
    DataReceiver.callbacks.set(this.port, this);
    browser.sockets.startListening(this.port);
    console.log('Listening on port ' + this.port);
  }

  _updateQueue(data) {
    console.log('_updateQueue data', data);
    this.queue.push(data);
  }
}

class SendingSocket {
  constructor() {
  }

  async connect(host, port) {
    this.id = await browser.sockets.createSendingSocket();
    browser.sockets.connect(this.id, host, port);
  }

  send(aData) {
    try {
      browser.sockets.sendData(this.id, aData);
      return true;
    } catch (err) {
      console.error(err,err.message);
      return false;
    }
  }

  close() {
    browser.sockets.close(this.id);
  }
}

