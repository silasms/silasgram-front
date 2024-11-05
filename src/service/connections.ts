class Connection {
  private connections: string

  constructor() {
    this.connections = 'connections'
    if (!this.isExistConnection)
      localStorage.setItem(this.connections, JSON.stringify([]))
  }

  listConnections() {
    const connectionsStorage = localStorage.getItem(this.connections)
    if (connectionsStorage !== null) return JSON.parse(connectionsStorage) || []
  }
  
  pushConnection(connection: string) {
    const connectionsStorage = this.listConnections()
    connectionsStorage.push(connection)
    localStorage.setItem(this.connections, JSON.stringify(connectionsStorage))
    return connectionsStorage
  }

  isExistConnection() {
    return Boolean(localStorage.getItem(this.connections))
  }
}

export default new Connection()
