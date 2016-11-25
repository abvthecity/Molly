function get(url){
  return fetch(url).then(res => res.json())
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
  }).then(res => res.json())
}

module.exports = {
    get: get,
    post: post,
};
