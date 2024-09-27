const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000 
const env = require('dotenv')
const localJSON = require('./data/products.json')
const localProduct = require('./Router/localProduct')
const nwProduct = require('./Router/nwProduct')
const{json} = require('express');
const { default: axios } = require('axios');

const axios_instance = axios.create({
    baseURL:'https://services.odata.org/V4/Northwind/Northwind.svc'
})

app.use(json())
app.use(express.urlencoded({extended:false}))

app.post('/localProdJSON', (req, res) => {
    const newData = req.body
    console.log("newData:",newData)
    localJSON.Products.push(newData);
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(JSON.stringify(localJSON))
})

env.config({
    path: './config/config.env'
})
//Get Root
app.get('', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1 style="color:red;">Welcome to CAP programs</h1>');
})

app.get('/localProdJSON', (req, res) => {
    res.status(200).send(JSON.stringify(localJSON))
})

// read-fetch data from Norwind oData service using Promise

app.get('/getNorthwindsrv', (req, res) => {
// Mode -1
    // axios.get('https://services.odata.org/V4/Northwind/Northwind.svc/Products?$format=json')
    //     .then((results) => {
    //         console.log(" ** results **:", results);
    //         res.setHeader('Content-Type', 'text/html');
    //         res.status(200).send(JSON.stringify(results.data.value))
    // })
// Mode -2
    axios_instance.get('/Products').then((results) => {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(JSON.stringify(results.data.value))
    })
})
//Async-Await
app.get('/getNorthwindsrvAsync', async(req, res) => {
    try {
        const result = await axios_instance.get('Products')
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(JSON.stringify(result.data.value))    
    } catch (error) {
        res.status(400)
    }
 })

 app.get('/getNorthwindFilters/:id', async(req, res) => {
    const ID = req.params.id;
    const fieldID = ID.match(/\S+(?==)/g)
    console.log("fieldID:" +fieldID);
    const value = ID.split('=').pop()
    console.log("value:" +value);  

    try {
        const result = await axios_instance.get('Products', {
            params: {
                $filter: `${fieldID} eq ${value}`
            }
        })
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(JSON.stringify(result.data.value))    
    } catch (error) {
        res.status(400)
    }
 })

 app.use('/api/localProducts',localProduct)
 app.use('/api/nwProducts',nwProduct)

app.listen(5000, () => console.log(`listen port ${PORT} in ${process.env.NODE_ENV} server`));
