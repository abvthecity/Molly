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
      console.log(e.data)

      for (let listener in Object.keys(this.listeners)) {
        this.listeners[listener](e)
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

  addListener(name, func = () => {}) {
    if (isFunction(func)) {
      this.listeners[name] = func
    }
  }

  removeListener(name) {
    if (this.listeners[name]) {
      delete this.listeners[name]
    }
  }

  send(msg) {
    this.ws.send(msg)
  }

}

export default socket
