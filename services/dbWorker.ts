export class DbWorker {
  constructor () {
    this.getSession().executeSql('CREATE TABLE requests(hash text, date bigint, ip text, browser text, os text, region text)')
  }

  public getSession () {
    const dbconfig = {
      host: process.env.host || 'localhost',
      user: process.env.user || 'admin',
      password: process.env.password || '123456',
      database: process.env.database || 'somedb'
    }
    const jsORM = require('js-hibernate')
    const session = jsORM.session(dbconfig)
    return session
  }

  public getRequestsMap () {
    const requestsMap = this.getSession()
      .tableMap('requests')
      .columnMap('hash', 'hash')
      .columnMap('date', 'date')
      .columnMap('ip', 'ip')
      .columnMap('browser', 'browser')
      .columnMap('os', 'os')
      .columnMap('region', 'region')

    return requestsMap
  }

  public getTableMap () {
    const tableMap = this.getSession()
      .tableMap('links')
      .columnMap('link', 'link')
      .columnMap('hash', 'hash')

    return tableMap
  }
}
