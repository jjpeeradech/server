//console.log('index.js')
const { ipcRenderer } = require('electron')
const result = []
//var nationalID;
//var x = document.getElementById("Btn").textContent;
ipcRenderer.on('forWin1', function (event, arg2,arg3){
  console.log(arg2);
  console.log(arg3);
  //nationalID=arg2;
  var chk =checkID(arg2,arg3);
  if(chk){
    ipcRenderer.sendSync('checkID','True')
  }
  if(!chk){
    ipcRenderer.sendSync('checkID','False')
  }
});
document.getElementById("btn").addEventListener("click", function() {
    //console.log(ipcRenderer.sendSync('message', 'ping synchronous')) // prints "pong"
    var x = document.getElementById('mytext').value;
    console.log(x)
    ipcRenderer.sendSync('message',x)
    /*ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) })

    ipcRenderer.send('asynchronous-message', 'ping asynchronous')*/
  });
  function Upload() {
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
               /* for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                            console.log(cell.innerHTML)
                        }
                    }
                }*/
                alert("complete.");
                //var dvCSV = document.getElementById("dvCSV");
                //dvCSV.innerHTML = "";
                //dvCSV.appendChild(table);
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
    for (var i = 0; i < result.length; i++){
        if (result[i].ID == arg2 && result[i].IP== arg3){
           console.log('Found')
           return true;
        }
      }
      return false;
}