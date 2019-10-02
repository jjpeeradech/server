const { ipcRenderer } = require('electron')
const express = require('express')
const bodyParser = require('body-parser')
const apps = express()
const port = 3001
const cors = require('cors')
apps.use(bodyParser.json());
apps.use(cors());
const result = []
ipcRenderer.on('forWin1', function (event, arg2,arg3){
  console.log(arg2);
  console.log(arg3);
  //nationalID=arg2;
  var chk =checkID(arg3,arg2);
  console.log(chk);
  if(chk != false){
    return chk
  }
  if(chk == false){
    return 'False'
  }
});
apps.get('/', (req,res)=> {
    ipAddress = req.query.ip
    nationalID = req.query.input
    console.log(ipAddress)
    console.log(nationalID)
    //nationalID=arg2;
    var chk =checkID(ipAddress,nationalID);
    console.log(chk);
    if(chk != false){
        res.send({response:chk})
    }
    if(chk == false){
        res.send({response:'False'})
    }
  })
  apps.listen(port)
  function Uploadcsv() {
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                table = document.createElement("table");
                const rows = e.target.result.split("\n");
                const headers = rows[0].split(',')
                for (let i = 1; i < rows.length; i++) {        
                    if (!rows[i])
                        continue
                    const obj = {}
                    const currentline = rows[i].split(',')
            
                    for (let j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j]
                    }
                    result.push(obj)
                }
                for(let j=0;j<result.length;j++){
                    console.log(result[j])
                }
                alert("complete.");
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}
function checkID(arg2,arg3){
    console.log(arg2)
    console.log(arg3)
    for (var i = 0; i < result.length; i++){
        if (result[i].ID == arg3 && result[i].IP== arg2){
           console.log(result[i].Name)
           return result[i].Name;
        }
      }
      return false;
}