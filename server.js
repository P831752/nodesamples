const http = require('http');
const fs = require('fs');
const path = require('path');
const { emitKeypressEvents } = require('readline');

const server = http.createServer((req, res) => {

// Ex 1 - Insept Request Details.
const {headers, url, method} = req;
console.log(headers, url, method);

// *** Ex 2 - Insept Request Details. ********************************
    // res.setHeader('Content-Type', 'text/html');
    // res.end('<h1>Welcome to CAP programs</h1>');

    // res.setHeader('Content-Type', 'application/json');
    // res.end(JSON.stringify({
    //         'Course Name':'Welcome to CAP programs'
    // }))
// *** Ex 3 - Post Calls ********************************
    // if (req.method == 'POST'){
    //     var Data = [];
    //     req.on('data', (chunk) => {
    //         Data.push(chunk)
    //     }).on('end', () =>{
    //         const bodyString = Buffer.concat(Data).toString();
    //         //res.end(JSON.stringify(bodyString));
    //         res.end(JSON.stringify(JSON.parse(bodyString)));
    //     })
    // }

// *** Ex 4 - Read data from JSON and store into File ********************************
        if (req.method == 'POST'){
            var Data = [];
            req.on('data', (chunk) => {
                Data.push(chunk)
            }).on('end', () =>{
                const bodyString = Buffer.concat(Data).toString();
                const bodyJSON = JSON.parse(bodyString);

                const{employess, fileID} = bodyJSON;
                const fPath = path.join(__dirname, 'files', `data_file_${fileID}.txt`);
                let fileContent = 'Name' + '\t' + 'Role';

                employess.map((emp) => {
                    fileContent = fileContent +'\n' + emp.name + '\t' + emp.role;
                })

                if (fs.existsSync(fPath)) 
                    res.end(JSON.stringify({"msg":'File already Exist'}))

                fs.writeFile(fPath, fileContent, 'utf-8', (err, succ) => {
                    if (err) throw err
                    res.end(JSON.stringify({"msg":'File Created Successfully'}))
                })
            })
        } else {
            res.end('Store into File END');
        }
})

server.listen(5000, () => console.log('listen port 5000'));
