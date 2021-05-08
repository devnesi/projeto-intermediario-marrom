const express = require('express')
const axios = require('axios')
const app = express()
const xpath = require('xpath'),
    dom = require('xmldom').DOMParser

app.get('/olx/terrenos', (req, res) => {
    const retorno = {}
    const lotes = []
    var page = req.query.page
    page = page === undefined ? 'https://sc.olx.com.br/florianopolis-e-regiao/outras-cidades/criciuma/imoveis/terrenos' : 'https://sc.olx.com.br/florianopolis-e-regiao/outras-cidades/criciuma/imoveis/terrenos?o=' + page
    axios.get(page).then(response => {
        const doc = new dom().parseFromString(response.data)
        const nextpage = xpath.select('//a[@data-lurker-detail="next_page"]/@href', doc)[0].value

        if (nextpage != undefined) {
            retorno.proxima = 'http://localhost:3000/olx/terrenos?page=' + nextpage.split('?o=')[1]
            retorno.anterior = 'http://localhost:3000/olx/terrenos?page=' + Number(nextpage.split('?o=')[1] - 1)
        }

        const items = xpath.select('//ul[@id="ad-list"]/li', doc)
        items.map(item => {
            const href = xpath.select('./a[@data-lurker-detail="list_id"]/@href', item)
            if (href.length == 0) return

            const lote = {
                href: href[0].value,
                title: xpath.select('./a[@data-lurker-detail="list_id"]/@title', item)[0].value,
                image: xpath.select('.//img/@src', item)[0].value,
            }

            lotes.push(lote)
        })
        retorno.results = lotes
        res.send(retorno)
    })
})


app.get('/olx/carros', (req, res) => {
    const retorno = {}
    const lotes = []
    var page = req.query.page
    page = page === undefined ? 'https://sc.olx.com.br/florianopolis-e-regiao/outras-cidades/criciuma/autos-e-pecas/carros-vans-e-utilitarios' : 'https://sc.olx.com.br/florianopolis-e-regiao/outras-cidades/criciuma/autos-e-pecas/carros-vans-e-utilitarios?o=' + page
    axios.get(page).then(response => {
        const doc = new dom().parseFromString(response.data)
        const nextpage = xpath.select('//a[@data-lurker-detail="next_page"]/@href', doc)[0].value

        if (nextpage != undefined) {
            retorno.proxima = 'http://localhost:3000/olx/carros?page=' + nextpage.split('?o=')[1]
            retorno.anterior = 'http://localhost:3000/olx/carros?page=' + Number(nextpage.split('?o=')[1] - 1)
        }

        const items = xpath.select('//ul[@id="ad-list"]/li', doc)
        items.map(item => {
            const href = xpath.select('./a[@data-lurker-detail="list_id"]/@href', item)
            if (href.length == 0) return

            const lote = {
                href: href[0].value,
                title: xpath.select('./a[@data-lurker-detail="list_id"]/@title', item)[0].value,
                image: xpath.select('.//img/@src', item)[0].value,
            }

            lotes.push(lote)
        })
        retorno.results = lotes
        res.send(retorno)
    })
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})