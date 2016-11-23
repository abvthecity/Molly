function get(url){
  let requestTime = (new Date()).getTime()
  return fetch(url).then(res => {
    let responseTime = (new Date()).getTime()
    let precision = (responseTime - requestTime) / 2
    let serverOffset = Date.parse(res.headers.map.date[0]) + precision - responseTime
    return res.json()
      .then(json => {
        json.serverOffset = serverOffset
        return json
      })
  })
}

function post(url, body){
  let requestTime = (new Date()).getTime()
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(res => {
    let responseTime = (new Date()).getTime()
    let precision = (responseTime - requestTime) / 2
    let serverOffset = Date.parse(res.headers.map.date[0]) + precision - responseTime
    return res.json()
      .then(json => {
        json.serverOffset = serverOffset
        return json
      })
  })
}

module.exports = {
    get: get,
    post: post,
};
