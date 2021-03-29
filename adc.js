const axios = require('axios')
const cheerio = require('cheerio')

axios.get('http://www.adorocinema.com/filmes/filme-33427/').then(response => {
    $ = cheerio.load(response.data)
    let title = $('.titlebar-title').first()
    console.log('Título:', title.text())

    let others = $('.meta-body-info').find('.spacer').parent()
    let a = others.text()
    let b = a.replace(/(\r\n|\n|\r)/gm, "").split('/')

    let c = b.map(item => {
        return item.trim()
    })
    console.log('Ano', c[0].substr(-4))
    console.log('Time:', setTime(c[1]))
    let cats = c[2].split(', ')
    let categories = cats.map(item => {
        return item.trim()
    })
    console.log('Categoria 1:', categories[0])
    console.log('Categoria 2:', categories[1])
})

function setTime(t) {
    let v = t.replace(/(h|min)/gm, "")
    const t_arr = v.trim().split(' ')
    return '0' + t_arr[0] + ':' + t_arr[1]
}
