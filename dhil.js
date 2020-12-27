require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-decrypt')
const fs = require('fs-extra')
const ffmpeg = require('fluent-ffmpeg')
const axios = require('axios')
const moment = require('moment-timezone')
const getYouTubeID = require('get-youtube-id')
const os = require('os')
const get = require('got')
const speed = require('performance-now')
const fetch = require('node-fetch')
const { spawn, exec } = require('child_process')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const google = require('google-it')
const translatte = require('translatte')
const { stdout } = require('process')
const translate = require('translatte')
const Math_js = require('mathjs');
const imageToBase64 = require('image-to-base64')
const bent = require('bent')
const request = require('request')

//const { getStickerMaker } = require('./lib/ttp')
//const quotedd = require('./lib/quote')
const color = require('./lib/color')
const urlShortener = require('./lib/shortener')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const cariKasar = require('./lib/toxic')

const { 
    downloader,
    liriklagu,
    quotemaker,
    randomNimek,
    sleep,
    jadwalTv,
    processTime,
    nulis
    } = require('./lib/functions')

/*const { 
    help,
    admincmd,
    ownercmd,
    nsfwcmd,
    kerangcmd,
    mediacmd,
    animecmd,
    othercmd,
    downloadcmd,
    praycmd,
    groupcmd,
    funcmd,
    bahasalist,
    sewa,
    snk, 
    info, 
    sumbang, 
    readme, 
    listChannel,
    commandArray
    } = require('./lib/help')

const {
    instagram,
    tiktok,
    facebook,
    smule,
    starmaker,
    twitter,
    joox
    } = require('./lib/downloader')

const {
    stickerburn,
    stickerlight
    } = require('./lib/sticker')*/

const { 
    uploadImages, 
    custom
    } = require('./lib/fetcher')

// LOAD FILE
let banned = JSON.parse(fs.readFileSync('./lib/database/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfw.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/simisimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/setting.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let premiNumber = JSON.parse(fs.readFileSync('./lib/database/premium.json'))

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/badword.json'))
let pendaftar = JSON.parse(fs.readFileSync('./lib/database/user.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/stickerspam.json'))

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    banChats,
    barbarkey,
    vhtearkey,
    restartState: isRestart,
    mtc: mtcState
    } = setting

let state = {
    status: () => {
        if(banChats){
            return 'Nonaktif'
        }else if(mtcState){
            return 'Nonaktif'
        }else if(!mtcState){
            return 'Aktif'
        }else{
            return 'Aktif'
        }
    }
}

prefix = ','
var timeStart = Date.now() / 1000
moment.tz.setDefault('Asia/Jakarta').locale('id')

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

        global.prefix
        
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await dhil.getHostNumber()
        const blockNumber = await dhil.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await dhil.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const SN = GenerateSerialNumber("000000000000000000000000")

        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'

        const isBadword = badword.includes(chatId)
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const isKasar = await cariKasar(chats)
        const GroupLinkDetector = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)
        
        const tms = (Date.now() / 1000) - (timeStart);
        const cts = waktu(tms)

        const serial = sender.id
        const isPremi = premiNumber.includes(sender.id)
        const ownerNumber = '6288xxx@c.us'
        const isOwner = ownerNumber.includes(sender.id)

        if (isGroupMsg && GroupLinkDetector && !isGroupAdmins && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await dhil.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    dhil.reply(from, `*「 GROUP LINK DETECTOR 」*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(`, id).then(() => {
                        dhil.removeParticipant(groupId, sender.id)
                    })
                }
            }
        }

        if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }

        if(!isCmd && isKasar && isGroupMsg && isBadword && !isGroupAdmins) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }
        
        // [BETA] Avoid Spam Message
        //if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        //if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // AKTIFKAN APABILA TIDAK INGIN TERKENA SPAM!!
        //addFilter(from)
        if (isCmd && !isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))}
        if (isCmd && isGroupMsg) {console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))}

        // FUNCTION
        function waktu(seconds) { // dhil
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);
            var dDisplay = d > 0 ? d + (d == 1 ? " Hari,":" Hari,") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " Jam,":" Jam,") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " Menit,":" Menit,") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " Detik,":" Detik") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
        var nmr = sender.id
        var obj = pendaftar.some((val) => {
            return val.id === nmr
        })
        var cekage = pendaftar.some((val) => {
            return val.id === nmr && val.umur >= 15
        })

        function monospace(string) {
            return '```' + string + '```'
        }


        function isReg(obj){
            if (obj === true){
                return false
            } else {     
                return dhil.reply(from, `Kamu belum terdaftar sebagai pengguna BOT\nuntuk mendaftar kirim ${prefix}daftar nama.umur\n\ncontoh format: ${prefix}daftar dhil.17\n\ncukup gunakan nama depan/panggilan saja`, id) //if user is not registered
            }
        }

        function cekumur(obj){
            if (obj === true){
                return false
            } else {
                return dhil.reply(from, `Kamu belum cukup umur untuk menggunakan Elaina, min 16 tahun\n\nKamu bisa mendaftar ulang dengan cara donasi terlebih dahulu, bales ${prefix}donasi\nHubungi Owner : wa.me/6281311850715`, id) //if user is not registered
            }
        }

        const apakah = [
            'Ya',
            'Tidak',
            'Coba Ulangi'
            ]

        const bisakah = [
            'Bisa',
            'Tidak Bisa',
            'Coba Ulangi'
            ]

        const kapankah = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi'
            ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
            ]

        const mess = {
            wait: '[ WAIT ] Sedang di proses⏳ silahkan tunggu sebentar',
			Own: '[❗] Perintah ini hanya bisa digunakan oleh Owner BOT',
			Ga: '[❗] Perintah ini hanya bisa digunakan oleh Admin Grup',
            magernulissatu: 'Harap Tunggu, BOT Sedang Menulis Di Buku 1!',
            error: {
                St: '[❗] Kirim gambar dengan caption *#sticker* atau tag gambar yang sudah dikirim',
                Ti: '[❗] Replay sticker dengan caption *#stickertoimg* atau tag sticker yang sudah dikirim',
                Qm: '[❗] Terjadi kesalahan, mungkin themenya tidak tersedia!',
                Yt3: '[❗] Terjadi kesalahan, tidak dapat meng konversi ke mp3!',
                Yt4: '[❗] Terjadi kesalahan, mungkin error di sebabkan oleh sistem.',
                Ig: '[❗] Terjadi kesalahan, mungkin karena akunnya private',
                Ki: '[❗] Bot tidak bisa mengeluarkan Admin group!',
                Sp: '[❗] Bot tidak bisa mengeluarkan Admin',
                Ow: '[❗] Bot tidak bisa mengeluarkan Owner',
                Bk: '[❗] Bot tidak bisa memblockir Owner',
                Ad: '[❗] Tidak dapat menambahkan target, mungkin karena di private',
                Iv: '[❗] Link yang anda kirim tidak valid!'
            }
        }

        const tutor = 'https://i.ibb.co/Hp1XGbL/a4dec92b8922.jpg'
        const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
       
        const isMuted = (chatId) => {
          if(muted.includes(chatId)){
            return false
        }else{
            return true
            }
        }

        function banChat () {
            if(banChats == true) {
            return false
        }else{
            return true
            }
        }
        
        // FUNCTION
                function isStickerMsg(id){
                if (isPremi) {return false;}
                let found = false;
                for (let i of stickerspam){
                    if(i.id === id){
                        if (i.msg >= 12) {
                            found === true 
                            dhil.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis!`, id).then(() => {
                                dhil.removeParticipant(groupId, id)
                            })
                            return true;
                        }else if(i.msg >= 12){
                            found === true
                            dhil.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu terdeteksi spam sticker!\nMohon tidak spam 5 sticker lagi atau akan di KICK!`, id)
                            return true
                        }else{
                            found === true
                            return false;
                        }   
                    }
                }
                if (found === false){
                    let obj = {id: `${id}`, msg:1};
                    stickerspam.push(obj);
                    fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
                    return false;
                }  
            }
        function addStickerCount(id){
            //if (isPremi) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
            }
        }

        function isBadwordMsg(id){
            //if (isPremi) {return false;}
            let kasar = false;
            for (let i of msgBadword){
                if(i.id === id){
                    let msg = i.msg
                    if (msg >= 3) { // 3X BADWORD AKAN TERKENA KICK
                        kasar === true 
                        dhil.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗕𝗔𝗗𝗪𝗢𝗥𝗗 」*\nKamu telah berkata kasar di grup ini, kamu akan di kick otomatis!`, id).then(() => {
                            dhil.removeParticipant(groupId, id)
                        })
                        return true;
                    }else{
                        kasar === true
                        return false;
                    }   
                }
            }
            if (kasar === false){
                let obj = {id: `${id}`, msg:1};
                msgBadword.push(obj);
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                return false;
            }  
        }
        function addBadCount(id){
            //if (isPremi) {return;}
            var kasar = false
            Object.keys(msgBadword).forEach((i) => {
                if(msgBadword[i].id == id){
                    kasar = i
                }
            })
            if (kasar !== false) {
                msgBadword[kasar].msg += 1;
                fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
            }
        }

        function isMsgLimit(id){
                    //if (isPremi) {return false;}
                    let found = false;
                    for (let i of msgLimit){
                        if(i.id === id){
                            if (i.msg >= 8) {
                                found === true 
                                dhil.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nMaaf, akun anda kami blok karena SPAM, dan tidak bisa di UNBLOK!`, id)
                                dhil.contactBlock(id)
                                banned.push(id)
                                fs.writeFileSync('./lib/database/banned.json', JSON.stringify(banned))
                                return true;
                            }else if(i.msg >= 8){
                                found === true
                                dhil.reply(from, `*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 」*\nNomor anda terdeteksi spam!\nMohon tidak spam 5 pesan lagi atau nomor anda AUTO BLOK!`, id)
                                return true
                            }else{
                                found === true
                                return false;
                            }   
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, msg:1};
                        msgLimit.push(obj);
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                        return false;
                    }  
                }
        function addMsgLimit(id){
                    //if (isPremi) {return;}
                    var found = false
                    Object.keys(msgLimit).forEach((i) => {
                        if(msgLimit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        msgLimit[found].msg += 1;
                        fs.writeFileSync('./lib/database/msgLimit.json',JSON.stringify(msgLimit));
                    }
                }
        function isLimit(id){
                    //if (isPremi) {return false;}
                    let found = false;
                    for (let i of limit){
                        if(i.id === id){
                            let limits = i.limit;
                            if (limits >= limitCount) {
                                found = true;
                                dhil.reply(from, `Perintah BOT anda sudah mencapai batas, coba esok hari :)`, id)
                                return true;
                            }else{
                                limit
                                found = true;
                                return false;
                            }
                        }
                    }
                    if (found === false){
                        let obj = {id: `${id}`, limit:1};
                        limit.push(obj);
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                        return false;
                    }  
                }
        function limitAdd (id) {
                    //if (isPremi) {return;}
                    var found = false;
                    Object.keys(limit).forEach((i) => {
                        if(limit[i].id == id){
                            found = i
                        }
                    })
                    if (found !== false) {
                        limit[found].limit += 1;
                        fs.writeFileSync('./lib/database/limit.json',JSON.stringify(limit));
                    }
                }
        
                // END HELPER FUNCTION
        // FUNCTION DAFTAR! NEXT UPDATE
        function monospace(string) {
            return '```' + string + '```'
        }

        // Serial Number Generator
        function GenerateRandomNumber(min,max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890ABCDEFGIJKLMNOPQRSTUVWXYZ";
            var randomNumber = GenerateRandomNumber(0,chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask){
            var serialNumber = "";
            if(mask != null){
                for(var i=0; i < mask.length; i++){
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }
        
                if(body === prefix+'mute' && isMuted(chatId) == true){
                    if(isGroupMsg) {
                        if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        dhil.reply(from, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute!`, id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        reply(from, 'Bot telah di mute pada chat ini! #unmute untuk unmute!', id)
                    }
                }
                if(body === prefix+'unmute' && isMuted(chatId) == false){
                    if(isGroupMsg) {
                        if (!isGroupAdmins) return dhil.reply(from,  mess.Ga, id)
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        dhil.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/muted.json', JSON.stringify(muted, null, 2))
                        dhil.reply(from, 'Bot telah di unmute!', id)                   
                    }
                }
                if (body === prefix+'unbanchat') {
                    if (!isOwner) return dhil.reply(from, mess.So, id)
                    if(setting.banChats === false) return
                    setting.banChats = false
                    banChats = false
                    fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
                    dhil.reply(from, 'Global chat has been enabled!', id)
                }
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {
			case prefix + 'banchat':
            if (setting.banChats === true) return
            if (!isOwner) return dhil.reply(from, mess.Own, id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/setting.json', JSON.stringify(setting, null, 2))
            dhil.sendText(from, 'Global chat\nMode: *OFF!*')
            break

        case prefix + 'unmute':
            console.log(`Unmuted ${name}!`)
            await dhil.sendSeen(from)
            break
            case prefix + 'mute':
            console.log(`Muted ${name}!`)
            await dhil.sendSeen(from)
            break
        case prefix + 'unbanchat':
            console.log(`Banchat ${name}!`)
            await dhil.sendSeen(from)
            break
		case prefix+'test':
            dhil.reply (from, 'Halo ini BOT BARU DIBIKIN JIR', id)
            break
			case prefix+'asu':
		if (!isOwner) return dhil.reply (from, mess.Own, id)
            await dhil.reply (from, 'ajg', id)
            break





default:
            //if (!isGroupMsg) return dhil.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Elaina, Link Ada Di Bio atau Bisa Mengetik #elainagroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *#iklan*', id)
            if (command.startsWith(prefix + '')) {
                dhil.reply(from, `Maaf ${pushname}, Command *${args[0]}* Tidak Terdaftar Di Dalam *${prefix}menu*!`, id)
            }
            await dhil.sendSeen(from) 
            }
        }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
        //dhil.kill().then(a => console.log(a))
    }
}
