var fs = require('fs')

function getPDBList(send){
    fs.readdir("./backend/pdb", function(err, data){
        if( err ) 
            send(err)
        var sendData = [];
        for(var i = 0; i < data.length; i++){
            var curData = data[i].split('.')
            if(curData[curData.length-1]=='pdb')
                sendData.push(curData[curData.length-2])
        }
        send(null, sendData); 
    })
}


function generatePDBMolecules(pdb, send){
    var pdbPath = "./backend/pdb/" + pdb + ".pdb" 
    fs.readFile(pdbPath, function(err, data){
        if(err)
            send(err)
        data = data.toString().split('\n')
        var sendData = {}; 
        for(var i = 0; i < data.length; i++){
            var curData = data[i].split(/  */)
            if(curData[0]=='ATOM' && curData[2]=='CA'){
                if(!(curData[4] in sendData))
                    sendData[curData[4]] = []
                
                if(curData[9]>.5)
                    sendData[curData[4]].push(curData)
                else if(curData[9]==.5){
                    sendData[curData[4]].push(curData)
                    i++
                }
            }
        }            
        send(null, sendData)
    })
}

module.exports = {
    "getPDBList" : getPDBList,
    "generatePDBMolecules" : generatePDBMolecules
}