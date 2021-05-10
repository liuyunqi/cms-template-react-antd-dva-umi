import queryString from 'query-string';


export default class BaseSevice {

  // object {} == transform ==> stringQuery 'a=1&b=2'
  static QSstringify(params: object) {
    return queryString.stringify(params);
  }

  // reverse    -    stringQuery 'a=1&b=2' == transform ==> object {}
  static QSparse(params: string) {
    return queryString.parse(params);
  }
}