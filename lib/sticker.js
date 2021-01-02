const { fetchJson } = require('../lib/fetcher')
const settings = require('./database/settings')


/**
 * Creater sticker lightning from media URL.
 * @param {String} url 
 */
const stickerLight = (url) => new Promise((resolve, reject) => {
    console.log('Creating sticker GIF...')
    fetchJson(`https://api.vhtear.com/lightning?link=${url}&apikey=${settings.vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

/**
 * Create sticker fire from media URL.
 * @param {String} url 
 */
const stickerFire = (url) => new Promise((resolve, reject) => {
    console.log('Creating sticker GIF...')
    fetchJson(`https://api.vhtear.com/burning_fire?link=${url}&apikey=${settings.vhtearkey}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

module.exports ={
    stickerLight,
    stickerFire
}