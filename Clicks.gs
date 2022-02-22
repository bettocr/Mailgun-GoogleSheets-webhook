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
// hoja de calculao
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(),1);
  sheet.insertRowAfter(lastRow);
  sheet.getRange(lastRow + 1, 1).setValue(fecha);
  //sheet.getRange(lastRow + 1, 1).setValue(formattedDate);
  sheet.getRange(lastRow + 1, 2).setValue(evento);
  sheet.getRange(lastRow + 1, 3).setValue(urlB);
  sheet.getRange(lastRow + 1, 4).setValue(usuario);
  sheet.getRange(lastRow + 1, 5).setValue(ip);
  sheet.getRange(lastRow + 1, 6).setValue(pais);
  sheet.getRange(lastRow + 1, 7).setValue(region);
  sheet.getRange(lastRow + 1, 8).setValue(ciudad);
  sheet.getRange(lastRow + 1, 9).setValue(tags);
  sheet.getRange(lastRow + 1, 10).setValue(clientName);
  sheet.getRange(lastRow + 1, 11).setValue(clientType);
  sheet.getRange(lastRow + 1, 12).setValue(deviceType);
  sheet.getRange(lastRow + 1, 13).setValue(clientOs);
  sheet.getRange(lastRow + 1, 14).setValue(userV);
  sheet.getRange(lastRow + 1, 15).setValue(boletin);
  sheet.getRange(lastRow + 1, 16).setValue(idBoletin);
  sheet.getRange(lastRow + 1, 17).setValue(mensajeID);
  sheet.getRange(lastRow + 1, 18).setValue(campana);
  sheet.getRange(lastRow + 1, 19).setValue(dominio);
  sheet.getRange(lastRow + 1, 20).setValue(sid);
  sheet.getRange(lastRow + 1, 21).setValue(params);
  SpreadsheetApp.flush();
}  
  return HtmlService.createHtmlOutput("post request received ");
}
