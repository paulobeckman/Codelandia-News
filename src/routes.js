const express = require('express')
const routes = express.Router()

const api = require('./services/api')

const { API_KEY } = process.env

routes.get('/', function(req, res){    
    api.get(`?country=br&apiKey=00102fc9578d48fc95e35346b50d1cbb`).then(response => {
        const articles = response.data.articles

        articles.map(article => {
            const date = new Date(article.publishedAt)

            const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
            
            const year = date.getUTCFullYear()
            const month = date.getMonth()
            const day = `0${date.getUTCDate()}`.slice(-2)

            const format = `${day} de ${meses[month]}, ${year}`

            article.publishedAt = format
        })
        
        return res.render('index', {articles})
    });
})

module.exports = routes