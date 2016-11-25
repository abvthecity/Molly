let server = '192.168.1.75'
let port = '8080'

export default {
  // styles
  borderRadiusSm: 4,
  borderRadiusMd: 6,
  borderRadiusLg: 8,
  unit: 4,
  navpad: 44,

  // http urls
  spotify: 'https://api.spotify.com/v1/',
  server: 'http://'+ server +':'+ port +'/Molly_Server/',
  socket: 'ws://'+ server +':'+ port +'/Molly_Server/ws',

  // functions
  millisToMinutesAndSeconds: function (millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
}
