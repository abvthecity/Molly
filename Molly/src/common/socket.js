import shortid from 'shortid'

function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

class socket {

  constructor() {

    this.ws = new WebSocket("ws://localhost:8080/Molly_Server/ws")
    this.connected = false
    this.listeners = {}

    this.ws.onopen = () => {
      this.connected = true
    };

    this.ws.onmessage = e => {
      // a message was received
      let parsedJSON = JSON.parse(e.data)
      parsedJSON.timeStamp = e.timeStamp

      for (let listener of Object.keys(this.listeners)) {
        if (this.listeners[listener]) this.listeners[listener](parsedJSON)
      }
    };

    this.ws.onerror = e => {
      // an error occurred
      console.error(e.message)
      this.ws.close()
      this.connected = false
    };

    this.ws.onclose = e => {
      // connection closed
      console.log(e.code, e.reason)
      this.ws.close()
      this.connected = false
    };

  }

  addListener(func = null) {
    let socketId = shortid.generate()
    if (isFunction(func))
      this.listeners[socketId] = func
    return socketId
  }

  removeListener(socketId) {
    if (this.listeners[socketId]) {
      delete this.listeners[socketId]
    }
  }

  send(msg) {
    this.ws.send(msg)
  }

}

export default socket
