const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const color = require('./lib/color')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')








module.exports = dhil = async (dhil, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, author, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await dhil.getHostNumber()
        const blockNumber = await dhil.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await dhil.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        //const SN = GenerateSerialNumber("000000000000000000000000")
		
		/*onst isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false*/
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''
		const prefix = '!'

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'
		
		//const isBadword = badword.includes(chatId)
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        //const isKasar = await cariKasar(chats)
        //const GroupLinkDetector = antilink.includes(chatId)
        //const AntiStickerSpam = antisticker.includes(chatId)
        //const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)

        const serial = sender.id
        //const isAdmin = adminNumber.includes(sender.id)
        const ownerNumber = '628979870204@c.us'
        const isOwner = ownerNumber.includes(sender.id)



/*


SLOT KOSONG



*/
		if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}
switch(command) {

        case '!test':
            dhil.reply (from, 'Halo ini BOT BARU DIBIKIN JIR', id)
            break
default:
            //if (!isGroupMsg) return dhil.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Elaina, Link Ada Di Bio atau Bisa Mengetik #elainagroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *#iklan*', id)
            if (command.startsWith('!')) {
                dhil.reply(from, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *${prefix}menu*!`, id)
            }
            await dhil.sendSeen(from) 
            }
        
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //dhil.kill().then(a => console.log(a))
    }
}