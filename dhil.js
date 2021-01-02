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
const emojiUnicode = require('emoji-unicode')
const canvas = require('canvacord')

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
    } = require('./lib/downloader')*/

const {
    stickerLight,
    stickerFire
    } = require('./lib/sticker')

const { 
    uploadImages, 
    custom
    } = require('./lib/fetcher')

// LOAD FILE | Database
let banned = JSON.parse(fs.readFileSync('./lib/database/user/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/nsfw.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/simisimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/settings.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/msgLimit.json'))
let premiNumber = JSON.parse(fs.readFileSync('./lib/database/user/premium.json'))
const _afk = JSON.parse(fs.readFileSync('./lib/database/user/afk.json'))
// END 

// PROTECT
let antilink = JSON.parse(fs.readFileSync('./lib/database/antilink.json'))
let antibadword = JSON.parse(fs.readFileSync('./lib/database/antibadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/antisticker.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/msgBadword.json'))
let dbbadword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/user/badword.json'))
let user = JSON.parse(fs.readFileSync('./lib/database/user/reguser.json'))
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

const prefix = ','
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
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isImage = type === 'image'

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
        const ownerNumber = '628979870204@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        
		
		
        const argz = body.trim().split(/ +/).slice(1)

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
        var obj = user.some((val) => {
            return val.id === nmr
        })
        var cekage = user.some((val) => {
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
            Gr: '[❗] Perintah ini hanya bisa digunakan di dalam Grup',
            Ba: '[❗] Perintah ini hanya bisa digunakan jika bot menjadi Admin Grup',
            Pr: '[❗] Perintah ini hanya bisa digunakan oleh user Premium',
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
                Fo: '[❗] Maaf, format yang anda masukan salah!',
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
                                fs.writeFileSync('./lib/database/user/banned.json', JSON.stringify(banned))
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
				
        // FUNCTION DAFTAR! by Gimenz
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

        // AFK Function | Thansk to BocchiBot
        const addAfkUser = (userId, time, reason) => {
            const obj = { id: userId, time: time, reason: reason }
            _afk.push(obj)
            fs.writeFileSync('.lib/database/user/afk.json', JSON.stringify(_afk))
        }

        const checkAfkUser = (userId) => {
            let status = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    status = true
                }
            })
            return status
        }

        const getAfkReason = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].reason
            }
        }

        const getAfkTime = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].time
            }
        }

        const getAfkId = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].id
            }
        }

        const getAfkPosition = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            return position
        }
        const isAfkOn = checkAfkUser(sender.id)
        
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
                    fs.writeFileSync('./lib/database/settings.json', JSON.stringify(setting, null, 2))
                    dhil.reply(from, 'Global chat has been enabled!', id)
                }
        if (isMuted(chatId) && banChat() && !isBlocked && !isBanned || isOwner ) {
        switch(command) {
			case prefix + 'banchat':
            if (setting.banChats === true) return
            if (!isOwner) return dhil.reply(from, mess.Own, id)
            setting.banChats = true
            banChats = true
            fs.writeFileSync('./lib/database/settings.json', JSON.stringify(setting, null, 2))
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
			// Owner Setting
			case prefix+'cekprefix':
            dhil.reply(from, `PREFIX YANG SAAT INI DIGUNAKAN *「* ${prefix} *」*`)
            break
        case prefix+'setprefix':{
            if(!isOwner) return dhil.reply(from, mess.Own, id)
            if (args.length === 1) return dhil.reply(from, `Kirim perintah *${prefix}prefix [ NEW PREFIX ]*`, id)
            prefix = args[1]
            dhil.sendText(from, `Berhasil Mengganti Prefix Ke *「* ${prefix} *」*`)
		}
            break
            case prefix+'setbotname':
            if (!isOwner) return dhil.reply(from, mess.Own, id)
                const setnem = body.slice(12)
                await dhil.setMyName(setnem)
                dhil.sendTextWithMentions(from, `Makasih Nama Barunya @${sender.id.replace('@c.us','')}!`)
            break
        case prefix+'setbotstatus':
            if (!isOwner) return dhil.reply(from, mess.Own, id)
                const setstat = body.slice(14)
                await dhil.setMyStatus(setstat)
                dhil.sendTextWithMentions(from, `Makasih Status Barunya @${sender.id.replace('@c.us','')} 😘`)
            break
        case prefix+'setbotpp':
            if (!isOwner) return dhil.reply(from, mess.Own, id)
            if (isMedia) {
                const mediaData = await decryptMedia(message)
                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                await dhil.setProfilePic(imageBase64)
                dhil.sendTextWithMentions(`Makasih @${sender.id.replace('@c.us','')} Foto Profilenya!`)
            } else if (quotedMsg && quotedMsg.type == 'image') {
                const mediaData = await decryptMedia(quotedMsg)
                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                await dhil.setProfilePic(imageBase64)
                dhil.sendTextWithMentions(from, `Makasih @${sender.id.replace('@c.us','')} Foto Profilenya!`)
            } else {
                dhil.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan #setprofilepic`, id)
            }
            break
			
			// DAFTAR
			case prefix +'daftar':{  //menambahkan nomor ke database | Daftar By BANG RISTIYANTO
                    if (argz.length === 1){
                        const arg = body.substring(body.indexOf(' ') + 1)
                    const no = sender.id
                    const name = arg.split('.')[0]
                    const mur = arg.split('.')[1]
                    if(isNaN(mur)) return await dhil.reply(from, 'Umur harus berupa angka!!', id)
                    if(mur >= 40) return await dhil.reply(from, 'Kamu terlalu tua, kembali lagi ke masa muda untuk menggunakan bot', id)
                    const jenenge = name.replace(' ','')
                    var cek = no
                        var obj = user.some((val) => {
                            return val.id === cek
                        })
                        if (obj === true){
                            return dhil.reply(from, 'kamu sudah terdaftar', id) //if number already exists on database
                        } else {
                            const mentah = await dhil.checkNumberStatus(no) //VALIDATE WHATSAPP NUMBER
                            const msg = monospace(`pendaftaran berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}\n₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋\n[Nama]: ${jenenge} [@${no.replace(/[@c.us]/g, '')}]\n[Nomor]: wa.me/${no.replace('@c.us', '')}\n[Umur]: ${mur}\n⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻\nUntuk menggunakan bot silahkan kirim !help\nTotal Pengguna yang telah terdaftar ${user.length}`)
                            const hasil = mentah.canReceiveMessage ? msg : false
                            if (!hasil) return dhil.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id) 
                            {
                            const register = ({
                                id: mentah.id._serialized,
                                nama: jenenge,
                                umur: mur
                            })
                            user.push(register)
                            fs.writeFileSync('./lib/database/user/reguser.json', JSON.stringify(user))
                                dhil.sendTextWithMentions(from, hasil)
                            }
                        }
                    } else {
                        await dhil.reply(from, 'Format yang kamu masukkan salah, kirim !daftar nama.umur\n\ncontoh format: !daftar galang.17\n\ncukup gunakan nama depan/panggilan saja', id) //if user is not registered
				}}
                break   
				case prefix +'regulang':{
                        if (!isOwner) return dhil.reply(from, 'Command ini hanya dapat digunakan oleh owner bot')  
                        if (!args.length >= 1) return dhil.reply(from, 'Siapa yang ingin di daftarkan ulang?', id)
                        const nomer = args[1]
                        let text = nomer.replace(/[-\s+@c.us]/g,'')
                        const cus = text + '@c.us'
                        const umur = args[2]
                        if(umur >= 40) return await dhil.reply(from, 'Umur terlalu tua kak, max 40 yaa :D', id)
                            var found = false
                            Object.keys(user).forEach((i) => {
                                if(user[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                user[found].umur = umur;
                                const updated = user[found]
                                const result = monospace(`Update data berhasil dengan SN: ${SN} pada ${moment().format('DD/MM/YY HH:mm:ss')}\n₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋₋\n[Nama]: ${updated.nama} | @${updated.id.replace(/[@c.us]/g, '')}\n[Nomor]: wa.me/${updated.id.replace('@c.us', '')}\n⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻⁻\nTotal Pengguna yang telah terdaftar ${user.length}`)
                                console.log(user[found])
                                fs.writeFileSync('./lib/database/user/reguser.json',JSON.stringify(user));
                                dhil.sendTextWithMentions(from, result)
                            } else {
                                    dhil.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                            }
                        }
                    break
                    // DAFTAR | END

					case prefix + 'bc':{
					if(isReg(obj)) return
					if(cekumur(cekage)) return // BROADCAST BY TOBZ
					if (!isOwner) return dhil.reply(from, mess.Own, id)
						bctxt = body.slice(4)
						txtbc = `*「 Alyx BROADCAST 」*\n\n${bctxt}`
						const semuagrup = await dhil.getAllChatIds();
						if(quotedMsg && quotedMsg.type == 'image'){
							const mediaData = await decryptMedia(quotedMsg)
							const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
							for(let grupnya of semuagrup){
								var cekgrup = await dhil.getChatById(grupnya)
								if(!cekgrup.isReadOnly) dhil.sendImage(grupnya, imageBase64, 'gambar.jpeg', txtbc)
							}
							dhil.reply('Broadcast sukses!')
						}else{
							for(let grupnya of semuagrup){
								var cekgrup = await dhil.getChatById(grupnya)
								if(!cekgrup.isReadOnly && isMuted(grupnya)) dhil.sendText(grupnya, txtbc)
							}
									dhil.reply('Broadcast Success!')
					}}
                        break
                        // PROTECT 
					case prefix+'antilink':{
					    if(isReg(obj)) return
					    if(cekumur(cekage)) return
					    if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
					    if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
					    if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
					    if (args[1] == 'enable') {
						var cek = antilink.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
						} else {
							antilink.push(chatId)
							fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
							dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
						}
					} else if (args[1] == 'disable') {
						var cek = antilink.includes(chatId);
						if(!cek){
							return dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
						} else {
							let nixx = antilink.indexOf(chatId)
							antilink.splice(nixx, 1)
							fs.writeFileSync('./lib/database/antilink.json', JSON.stringify(antilink))
							dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Nonaktif`, id)
						}
					} else {
						dhil.reply(from, `Pilih enable atau disable coek!`, id)
						}}
					break    
				case prefix+'antisticker':{
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
					if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
					if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
					if (args[1] == 'enable') {
						var cek = antisticker.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
						 } else {
							antisticker.push(chatId)
							fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
							dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
						}
					} else if (args[1] == 'disable') {
						var cek = antisticker.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
						} else {
							let nixx = antisticker.indexOf(chatId)
							antisticker.splice(nixx, 1)
							fs.writeFileSync('./lib/database/antisticker.json', JSON.stringify(antisticker))
							dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
							limitAdd(serial)
						}
					} else {
						dhil.reply(from, `Pilih enable atau disable coek!`, id)
				}}
					break
				case prefix+'antibadword':{
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
					if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
					if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
					if (args[1] == 'enable') {
						var cek = antibadword.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI BADWORD 」*\nSudah diaktifkan di grup ini`, id)
						} else {
							antibadword.push(chatId)
							fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
							dhil.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Elaina Akan Kick!`, id)
						}
					} else if (args[1] == 'disable') {
						var cek = antibadword.includes(chatId);
						if(!cek){
							return dhil.reply(from, `*「 ANTI BADWORD 」*\nSudah dinonaktifkan di grup ini`, id)
						} else {
							let nixx = antibadword.indexOf(chatId)
							antibadword.splice(nixx, 1)
							fs.writeFileSync('./lib/database/antibadword.json', JSON.stringify(antibadword))
							dhil.reply(from, `*「 ANTI BADWORD 」*\nPerhatian Untuk Member Grup ${name} Tercinta\nHarap Jangan Toxic Di Sini Atau Elaina Akan Kick!`, id)
						}
					} else {
						dhil.reply(from, `Pilih enable atau disable coek!`, id)
				}}
					break
			// Protect || Database
				 case prefix+'resetsticker':{
					if(isReg(obj)) return
					if(cekumur(cekage)) return
					if (!isPremi) return dhil.reply(from, mess.Pr, id)
					if (!args.length === 1) return dhil.reply(from, `Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetsticker 62852262236155 / #resetsticker @member`, id) 
					const nomebr = args[1]
					let textz = nomebr.replace(/[-\s+@c.us]/g,'')
					const cuss = textz + '@c.us'
						var found = false
						Object.keys(stickerspam).forEach((i) => {
							if(stickerspam[i].id == cuss){
								found = i
							}
						})
						if (found !== false) {
							stickerspam[found].msg = 1;
							const result = 'DB Sticker Spam has been reset'
							console.log(stickerspam[found])
							fs.writeFileSync('./lib/database/stickerspam.json',JSON.stringify(stickerspam));
							dhil.reply(from, result, from)
							limitAdd(serial)
						} else {
								dhil.reply(from, `Maaf, Nomor itu tidak terdaftar di database!`, id)
				}}
					break
                 case prefix+'resetbadword':{
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if(isLimit(serial)) return
                    if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)  
                    if (!args.length === 1) return dhil.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetbadword 6285112554122 / #resetbadword @member') 
                    const nomer = args[1]
                    let text = nomer.replace(/[-\s+@c.us]/g,'')
                    const cus = text + '@c.us'
                        var found = false
                        Object.keys(msgBadword).forEach((i) => {
                            if(msgBadword[i].id == cus){
                                found = i
                            }
                        })
                        if (found !== false) {
                            msgBadword[found].msg = 1;
                            const result = 'DB Badword Spam has been reset'
                            console.log(msgBadword[found])
                            fs.writeFileSync('./lib/database/msgBadword.json',JSON.stringify(msgBadword));
                            dhil.reply(from, result, from)
                            limitAdd(serial)
                        } else {
                                dhil.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
		                }}
                         break
                         // Group Settings
                    case prefix+'left':
                        if(isReg(obj)) return
                        if(cekumur(cekage)) return
                        if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                        if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                        if (args.length === 1) return dhil.reply(from, 'Pilih enable atau disable!', id)
                        if (args[1].toLowerCase() === 'enable') {
                            left.push(chat.id)
                            fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                            dhil.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
                        } else if (args[1].toLowerCase() === 'disable') {
                            left.splice(chat.id, 1)
                            fs.writeFileSync('./lib/database/left.json', JSON.stringify(left))
                            dhil.reply(from, 'Fitur left berhasil di nonaktifkan di group ini!', id)
                        } else {
                            dhil.reply(from, 'Pilih enable atau disable dulu jir!', id)
                        }
                        break
                    case prefix+'welcome':
                        if(isReg(obj)) return
                        if(cekumur(cekage)) return
                        if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                        if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                        if (args.length === 1) return dhil.reply(from, 'Pilih enable atau disable!', id)
                        if (args[1].toLowerCase() === 'enable') {
                            welkom.push(chat.id)
                            fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                            dhil.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
                        } else if (args[1].toLowerCase() === 'disable') {
                            welkom.splice(chat.id, 1)
                            fs.writeFileSync('./lib/database/welcome.json', JSON.stringify(welkom))
                            dhil.reply(from, 'Fitur welcome berhasil di nonaktifkan di group ini!', id)
                        } else {
                            dhil.reply(from, 'Pilih enable atau disable dulu coek!', id)
                        }
                        break
                        case prefix+'nsfw':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                            if (args.length === 1) return dhil.reply(from, 'Pilih enable atau disable!', id)
                            if (args[1].toLowerCase() === 'enable') {
                                var cek = nsfw_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                                } else {
                                nsfw_.push(chat.id)
                                fs.writeFileSync('./lib/database/nsfw.json', JSON.stringify(nsfw_))
                                dhil.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *#nsfwMenu* untuk mengetahui menu', id)
                                }
                            } else if (args[1].toLowerCase() === 'disable') {
                                var cek = nsfw_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                                } else {
                                nsfw_.splice(chat.id, 1)
                                fs.writeFileSync('./lib/database/nsfw.json', JSON.stringify(nsfw_))
                                dhil.reply(from, 'NSFW berhasil di nonaktifkan di group ini!', id)
                                }
                            } else {
                                dhil.reply(from, 'Pilih enable atau disable dulu Hangdeeh!', id)
                            }
                            break
                        case prefix+'simi':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isPremi) return dhil.reply(from, mess.Pr, id)
                            if (args.length === 1) return dhil.reply(from, 'Pilih enable atau disable!', id)
                            if (args[1].toLowerCase() === 'enable') {
                                var cek = simi_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                                } else {
                                simi_.push(chat.id)
                                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                                dhil.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *! halo*', id)
                                }
                            } else if (args[1].toLowerCase() === 'disable') {
                                var cek = simi_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                                } else {
                                simi_.splice(chat.id, 1)
                                fs.writeFileSync('./lib/database/Simsimi.json', JSON.stringify(simi_))
                                dhil.reply(from, 'Simsimi berhasil di nonaktifkan di group ini!', id)
                                }
                            } else {
                                dhil.reply(from, 'Pilih enable atau disable dulu pak!', id)
                            }
                            break
                        case prefix+'group':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                            if (!isBotGroupAdmins) return dhil.reply(from, 'Fitur ini hanya bisa di gunakan ketika bot menjadi admin', id)
                            if (args.length === 1) return dhil.reply(from, 'Pilih open atau close!', id)
                            if (args[1].toLowerCase() === 'open') {
                                dhil.setGroupToAdminsOnly(groupId, false)
                                dhil.sendTextWithMentions(from, `Group telah dibuka oleh admin @${sender.id.replace('@c.us','')}\nSekarang *semua member* dapat mengirim pesan`)
                            } else if (args[1].toLowerCase() === 'close') {
                                dhil.setGroupToAdminsOnly(groupId, true)
                                dhil.sendTextWithMentions(from, `Group telah ditutup oleh admin @${sender.id.replace('@c.us','')}\nSekarang *hanya admin* yang dapat mengirim pesan`)
                            } else {
                                dhil.reply(from, 'Pilih open atau close dulu!', id)
                            }
                            break
						
						// STICKER MAKER
					case prefix + 'sticker':
						case prefix + 'stiker':{
						if(isReg(obj)) return
						if(cekumur(cekage)) return
						if (isMedia && type === 'image') {
						 const mediaData = await decryptMedia(message, uaOverride)
						 const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
						   await dhil.sendImageAsSticker(from, imageBase64)
						} else if (quotedMsg && quotedMsg.type == 'image') {
						  const mediaData = await decryptMedia(quotedMsg, uaOverride)
						  const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
						  await dhil.sendImageAsSticker(from, imageBase64)
						} else if (args.length === 2) {
						  const url = args[1]
						  if (url.match(isUrl)) {
						  await dhil.sendStickerfromUrl(from, url, { method: 'get' })
						    .catch(err => console.log('Caught exception: ', err))
						} else {
						   dhil.reply(from, mess.error.Iv, id)
						}
						} else {
						   dhil.reply(from, mess.error.St, id)
					}}
						break
					case prefix+'stext':{
						if(isReg(obj)) return
						if(cekumur(cekage)) return
						if (isLimit(serial)) return dhil.reply(from, `Maaf ${pushname}, Kuota Limit Kamu Sudah Habis, Ketik ${prefix}limit Untuk Mengecek Kuota Limit Kamu`, id)
						if (args.length === 1) return dhil.reply(from, `Kirim perintah *${prefix}ttp2 [ Teks ]*, contoh *${prefix}ttp2 Alyx*`, id)
						const ttp2t = body.slice(7)
						const lttp2 = ["Orange","White","Green","Black","Purple","Red","Yellow","Blue","Navy","Grey","Magenta","Brown","Gold"]
						const rttp2 = lttp2[Math.floor(Math.random() * (lttp2.length))]
						await dhil.sendStickerfromUrl(from, `https://api.vhtear.com/textmaker?text=${ttp2t}&warna=${rttp2}&apikey=${vhtearkey}`)
					}
                        break
                    case prefix+'stickergif':
                    case prefix+'stikergif':
                        if(isReg(obj)) return
						if(cekumur(cekage)) return
                     if (isMedia && type === 'video' || mimetype === 'image/gif') {
                        await dhil.reply(from, mess.wait, id)
                        try {
                        const mediaData = await decryptMedia(message, uaOverride)
                        const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await dhil.sendMp4AsSticker(from, videoBase64, { fps: 24, startTime: `00:00:00.0`, endTime : `00:00:05.0`, loop: 0 })
                       .then(async () => {
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                        await dhil.sendText(from, 'Nih gan..')
                          })
                       } catch (err) {
                         console.error(err)
                         await dhil.reply(from, 'Ukuran video terlalu besar :(', id)
                        }
                             } else if (isQuotedGif || isQuotedVideo) {
                                 await dhil.reply(from, mess.wait, id)
                             try {
                              const mediaData = await decryptMedia(quotedMsg, uaOverride)
                              const videoBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                               await dhil.sendMp4AsSticker(from, videoBase64, { fps: 30, startTime: `00:00:00.0`, endTime : `00:00:03.0`, loop: 0 })
                                .then(async () => {
                                   console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                      await dhil.sendText(from, 'Nih gan..')  
                                    limitAdd(serial)
                                            })
                                    } catch (err) {
                                        console.error(err)
                                        await dhil.reply(from, 'Ukuran video terlalu besa :(', id)
                                    }
                                } else {
                                    await dhil.reply(from, 'Maaf, format penggunaan salah!', id)
                                }
                            break
                            case prefix+'stickerlightning':
                            case prefix+'slightning':
                                if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if(isLimit(serial)) return
                                if (isMedia && isImage || isQuotedImage) {
                                    await dhil.reply(from, mess.wait, id)
                                    const encryptMedia = isQuotedImage ? quotedMsg : message
                                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                    const imageLink = await uploadImages(mediaData, `lightning.${sender.id}`)
                                    stickerLight(imageLink)
                                        .then(async ({ result }) => {
                                            await dhil.sendStickerfromUrl(from, result.imgUrl)
                                                .then(async () => {
                                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                                    await dhil.sendText(from, 'Nih..')
                                                    limitAdd(serial)
                                                })
                                        })
                                        .catch(async (err) => {
                                            console.error(err)
                                            await dhil.reply(from, `Error!\n${err}`, id)
                                        })
                                } else {
                                    await dhil.reply(from, mess.error.Fo, id)
                                }
                            break
                            case prefix+'stickerfire':
                            case prefix+'sfire':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if(isLimit(serial)) return 
                                if (isMedia && isImage || isQuotedImage) {
                                    await dhil.reply(from, mess.wait, id)
                                    const encryptMedia = isQuotedImage ? quotedMsg : message
                                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                    const imageLink = await uploadImages(mediaData, `fire.${sender.id}`)
                                    stickerFire(imageLink)
                                        .then(async ({ result }) => {
                                            await dhil.sendStickerfromUrl(from, result.imgUrl)
                                                .then(async () => {
                                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                                    await dhil.sendText(from, 'Nih.')
                                                     limitAdd(serial)
                                                })
                                        })
                                        .catch(async (err) => {
                                            console.error(err)
                                            await dhil.reply(from, `Error!\n${err}`, id)
                                        })
                                } else {
                                    await dhil.reply(from, mess.error.Fo, err)
                                }
                            break
                            case prefix+'ttg':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if(isLimit(serial)) return
                                const teg = body.slice(5)
                                if (!teg) return await dhil.reply(from, mess.error.Fo, id)
                                await dhil.reply(from, mess.wait, id)
                                await dhil.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${teg}&apikey=${vhtearkey}`)
                                    .then(() => console.log('Success creating GIF!'))
                                    limitAdd(serial)
                                    .catch(async (err) => {
                                        console.error(err)
                                        await dhil.reply(from, `Error!\n${err}`, id)
                                    })
                            break
                            case prefix+'stickertoimg':
                            case prefix+'stikertoimg':
                            case prefix+'toimg':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if(isLimit(serial)) return
                                if (isQuotedSticker) {
                                    await dhil.reply(from, mess.wait, id)
                                    try {
                                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                                        await dhil.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                                        limitAdd(serial)
                                    } catch (err) {
                                        console.error(err)
                                        await dhil.reply(from, `Error!\n${err}`, id)
                                    }
                                } else {
                                    await dhil.reply(from, mess.error.Fo, id)
                                }
                            break
                            case prefix+'emojisticker':
                            case prefix+'emojistiker':
                                case prefix+'emo':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if(isLimit(serial)) return
                                if (args.length !== 2) return dhil.reply(from, mess.error.Fo, id)
                                const emoji = emojiUnicode(args[1])
                                await dhil.reply(from, mess.wait, id)
                                console.log('Creating emoji code for =>', emoji)
                                await dhil.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${vhtearkey}`)
                                    .then(async () => {
                                        await dhil.reply(from, 'Nih..', id)
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        limitAdd(serial)
                                    })
                                    .catch(async (err) => {
                                        console.error(err)
                                        await dhil.reply(from, 'Emoji itu tidak di dukung!', id)
                                    })
                            break
                            case 'triggered':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if(isLimit(serial)) return
                                try {
                                    if (isMedia && isImage) {
                                        const ppRaw = await decryptMedia(message, uaOverride)
                                        canvas.Canvas.trigger(ppRaw)
                                            .then(async (buffer) => {
                                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                                await dhil.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                                fs.unlinkSync(`${sender.id}_triggered.png`)
                                            })
                                    } else if (quotedMsg) {
                                        const ppRaw = await dhil.getProfilePicFromServer(quotedMsgObj.sender.id)
                                        canvas.Canvas.trigger(ppRaw)
                                            .then(async (buffer) => {
                                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                                await dhil.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                                fs.unlinkSync(`${sender.id}_triggered.png`)
                                            })
                                    } else {
                                        const ppRaw = await dhil.getProfilePicFromServer(sender.id)
                                        canvas.Canvas.trigger(ppRaw)
                                            .then(async (buffer) => {
                                                canvas.write(buffer, `${sender.id}_triggered.png`)
                                                await dhil.sendFile(from, `${sender.id}_triggered.png`, `${sender.id}_triggered.png`, '', id)
                                                fs.unlinkSync(`${sender.id}_triggered.png`)
                                                limitAdd(serial)
                                            })
                                    }
                                } catch (err) {
                                    console.error(err)
                                    await dhil.reply(from, `Error!\n${err}`, id)
                                }
                            break
						





default:
            //if (!isGroupMsg) return dhil.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup Elaina, Link Ada Di Bio atau Bisa Mengetik #elainagroup!\nJika Ingin Sewa Bot atau Bikin Bot Harap Ketik *#iklan*', id)
            if (command.startsWith(prefix)) {
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
