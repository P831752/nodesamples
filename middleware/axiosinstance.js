const { default: axios } = require('axios');
const axios_instance = axios.create({
    baseURL:'https://services.odata.org/V4/Northwind/Northwind.svc'
})
module.exports = axios_instance;
