export class dbWorker {
 constructor() {
  let query = this.getSession().executeSql(
   'CREATE TABLE links(link text, hash text)'
  );
  this.getSession().executeSql(
   'CREATE TABLE requests(hash text, date bigint, ip text, browser text, os text, region text)'
  );
 }

 public getSession() {
  var dbconfig = {
   host: process.env.host,
   user: process.env.user,
   password: process.env.password,
   database: process.env.database,
  };
  var jsORM = require('js-hibernate');
  var session = jsORM.session(dbconfig);
  return session;
 }

 public getRequestsMap() {
  let requestsMap = this.getSession()
   .tableMap('requests')
   .columnMap('hash', 'hash')
   .columnMap('date', 'date')
   .columnMap('ip', 'ip')
   .columnMap('browser', 'browser')
   .columnMap('os', 'os')
   .columnMap('region', 'region');

  return requestsMap;
 }

 public getTableMap() {
  let tableMap = this.getSession()
   .tableMap('links')
   .columnMap('link', 'link')
   .columnMap('hash', 'hash');

  return tableMap;
 }
}
