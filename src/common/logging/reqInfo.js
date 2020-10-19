class ReqInfo {
  constructor(url, params, body) {
    this.url = url;
    this.params = params;
    this.body = body;
  }
}

module.exports = { ReqInfo };
