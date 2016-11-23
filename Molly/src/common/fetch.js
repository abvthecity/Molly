function get(url){
  return fetch(url).then(res => res.json())
}

function post(url, body){
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
