// Google Sheets webHook - Mailgun Click event


//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {

var params = JSON.stringify(e.postData.contents);
params = JSON.parse(params);
var myData = JSON.parse(e.postData.contents);


var fecha = myData["event-data"]["timestamp"];
//var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
//var dateObj = new Date(fecha*1000);
//var formattedDate = Utilities.formatDate(fecha, "GMT-06:00", "yyyy-MM-dd HH:mm:ss");
var evento = myData["event-data"]["event"];
var usuario = myData["event-data"]["recipient"];
var urlB = ""
if (myData["event-data"]["url"]){
  urlB = myData["event-data"]["url"];
}else{
  urlB = "N/A";
}
var ip = myData["event-data"]["ip"];
var pais = myData["event-data"]["geolocation"]["country"];
var region = myData["event-data"]["geolocation"]["region"];
var ciudad = myData["event-data"]["geolocation"]["city"];
var tags = myData["event-data"]["tags"];
var clientName = myData["event-data"]["client-info"]["client-name"];
var clientType = myData["event-data"]["client-info"]["client-type"];
var deviceType = myData["event-data"]["client-info"]["device-type"];
var clientOs = myData["event-data"]["client-info"]["client-os"]; 
var userV = myData["event-data"]["user-variables"];
var boletin = "";
var idBoletin = "";
var sid = "";
if (myData["event-data"]["mailing-list"]["address"]){
  boletin = myData["event-data"]["mailing-list"]["address"];
  idBoletin = myData["event-data"]["mailing-list"]["list-id"];
  sid = myData["event-data"]["mailing-list"]["sid"];
}else{
  boletin = "n/a";
  idBoletin = "n/a";
  sid = "n/a";
}
var mensajeID = myData["event-data"]["message"]["headers"]["message-id"];
var campana = myData["event-data"]["campaigns"];
var dominio = myData["event-data"]["recipient-domain"];

if (fecha != ""){
// hoja de calculado
  var sheet = SpreadsheetApp.getActiveSheet();
  var contenido = [fecha,evento,urlB,usuario,ip,pais,region,ciudad,tags,clientName,clientType,deviceType,clientOs,userV,boletin,idBoletin,mensajeID,campana,dominio,sid,params];
  sheet.appendRow(contenido);
  SpreadsheetApp.flush();
}    
  return HtmlService.createHtmlOutput("post request received ");
}
