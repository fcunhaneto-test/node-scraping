const axios = require('axios')
const cheerio = require('cheerio')

let str = [];
axios.get('https://www.imdb.com/title/tt0056197/?ref_=nv_sr_srsg_0').then(response => {
    $ = cheerio.load(response.data)
    const context = $('.subtext').text()
    let arr = context.split('|')
    str = arr.map((value, index) => {
        nv = value.replace(/(\r\n|\n|\r)/gm, "")
        return nv.trim();
    })
    console.log(str)
    setTime(arr[1])
    setCategories(arr[2])

    const title = $('.title_wrapper').find('h1').text()
    setTitleYear(title)

    const original_title = $('.originalTitle').text().split(' (')
    console.log('Título Original:', original_title[0])

    let d = $('.credit_summary_item').find('a').first()
    console.log('Diretor', d.text())

    const summary = $('.summary_text').text()
    console.log('Resumo:', summary.trim())

    let actor = $('.primary_photo').next('td').find('a').toArray().map(item => {
        return $(item).text()
    })
    console.log('AC', actor)

    let ch = $('.cast_list > tbody > tr > td.character').toArray()
    let c = ch.map((item, index) => {
        return $(item).text().trim()
    })

})

function setTime(t) {
    let v = t.replace(/(h|min)/gm, "")
    const t_arr = v.trim().split(' ')
    const time = '0' + t_arr[0] + ':' + t_arr[1]
    console.log('Time:', time)
}

function setCategories(c) {
    nc = c.replace(/(\r\n|\n|\r)/gm, "")
    let categories = nc.split(', ')
    console.log('Categoria 1:', categories[0])
    console.log('Categoria 2:', categories[2])
}

function setTitleYear(ty) {
    let ty_arr = ty.split('(')
    console.log('Título', ty_arr[0].trim())
    const year = ty_arr[1].split(')')
    console.log('Ano:', year[0])

}

