 
// The reporter object encapsulating the WebSocket
const vrllogger = {
  uuid: null,
  ipaddr: null,
  url: null,
  code: null,
 
  init: function() {
    this.id = "secim2023site";
    this.url = "http://vrllab.sabanciuniv.edu/api/collect/";
    this.uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    $.getJSON('https://api.ipify.org?format=json', function(data){
      this.ipaddr = data.ip;
    });
  },
 
  event: function(eventCode, message) {
    let logdata = {
      "app-id":this.id, 
      "data":{"event_type": eventCode, "message": message},
      "meta":{
        "id": this.uuid,
        "ip": this.ipaddr,
        "ts": Math.floor(Date.now() / 1000)
      }
    }

    $.post(this.url, logdata, function(result){console.log(result)});

    var message = JSON.stringify(logdata);
    console.log(logdata);
  }
};
 
// Start logger immediately
vrllogger.init();