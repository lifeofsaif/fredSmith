var fs = require('fs')

function fuck() {
    fs.readFile("./pdb/4ey7.pdb", function (err, data) {
        if (err)
            console.log(err)
        data = data.toString().split('\n')

        for (var i = 0; i < data.length; i++) {
            var curData = data[i].split(/  */)
            if (curData[0] == 'ATOM' && curData[2] == "CA")
                console.log(data[i])
        }
    })
}

function chod(a,b,n){
    var interval = (a+b)/2;
    
    var chod; 
    for(i = 0; i < n; i++){
        if(interval < 10e-7)
            return i
        interval = interval/2
    }
    return interval; 
}

console.log(chod(-1, 4, process.argv[2]))

