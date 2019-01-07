class Authenticator {
  constructor() {
    this.onHandshake = this.onHandshake.bind(this);
  }

  onHandshake(handshake) {
    try {
      let params = parseUrlParameters(handshake.req.url);
      if(params.hasOwnProperty('name')) {
        let requestedName = params['name'];

        if(getGame().players.find(p => p.name === requestedName)) {
          return false;
        }

        handshake.req.requestedName = requestedName;
        return true;
      } else {
        return false;
      }
    } catch(e) {
      console.error(e);
      return false;
    }
  }
}

function parseUrlParameters(url) {
  let parsed = {};
  let input = url.substring(2).split('&');
  input.forEach(s => {
    [key, value] = s.split('=');
    if(key !== '') {
      parsed[key] = value;
    }
  });
  return parsed;
}


module.exports = Authenticator;
