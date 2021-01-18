/********** MODULES **********/
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
const { spawn, exec } = require('child')
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
const toMs = require('ms')
const ms = require('parse-ms')
const canvas = require('canvacord')
/********** END OF MODULES **********/


/********** UTILS **********/
const afk = require('./functions/afk')
const premium = require('./functions/premium')
const level = require('./functions/level')
const card = require('./functions/card')
const reminder = require('./functions/reminder')



//const { getStickerMaker } = require('./lib/ttp')
//const quotedd = require('./lib/quote')
const color = require('./lib/color')
const urlShortener = require('./lib/shortener')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const cariKasar = require('./lib/kataKotor')

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
        stickerburn,
        stickerlight
        } = require('./lib/sticker')

const { 
    uploadImages, 
    custom
    } = require('./lib/fetcher')

/********** DATABASES **********/
let banned = JSON.parse(fs.readFileSync('./lib/database/user/banned.json'))
let nsfw_ = JSON.parse(fs.readFileSync('./lib/database/group/nsfw.json'))
let simi_ = JSON.parse(fs.readFileSync('./lib/database/group/simisimi.json'))
let limit = JSON.parse(fs.readFileSync('./lib/database/user/limit.json'))
let welkom = JSON.parse(fs.readFileSync('./lib/database/group/welcome.json'))
let left = JSON.parse(fs.readFileSync('./lib/database/group/left.json'))
let muted = JSON.parse(fs.readFileSync('./lib/database/group/muted.json'))
let setting = JSON.parse(fs.readFileSync('./lib/database/settings.json'))
let msgLimit = JSON.parse(fs.readFileSync('./lib/database/group/msgLimit.json'))
let premiNumber = JSON.parse(fs.readFileSync('./lib/database/user/premium.json'))
const _afk = JSON.parse(fs.readFileSync('./lib/database/user/afk.json'))
const _level = JSON.parse(fs.readFileSync('./lib/database/user/level.json'))
const _leveling = JSON.parse(fs.readFileSync('./lib/database/group/leveling.json'))
const _bg = JSON.parse(fs.readFileSync('./lib/database/user/card/background.json'))
const _reminder = JSON.parse(fs.readFileSync('./lib/database/user/reminder.json'))
let db_badword = JSON.parse(fs.readFileSync('./lib/database/katakasar.json'))

/********** END OF DATABASES **********/ 

/********** DATABASES | PROTECT  **********/
let antilink = JSON.parse(fs.readFileSync('./lib/database/group/antilink.json'))
let msgBadword = JSON.parse(fs.readFileSync('./lib/database/user/msgBadword.json'))
let antisticker = JSON.parse(fs.readFileSync('./lib/database/group/antisticker.json'))
let badword = JSON.parse(fs.readFileSync('./lib/database/group/badword.json'))
let user = JSON.parse(fs.readFileSync('./lib/database/user/reguser.json'))
let stickerspam = JSON.parse(fs.readFileSync('./lib/database/user/stickerspam.json'))
/********** END OF DATABASES | PROTECT  **********/

// Automate
premium.expiredCheck(premiNumber)


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

/********* MSG HNDLR ********/
module.exports = dhil = async (dhil, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chatId, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const serial = sender.id
        const { name, formattedTitle } = chat
        let { pushname, verifiedName } = sender
        pushname = pushname || verifiedName
        const commands = caption || body || ''
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        
        const argx = commands.toLowerCase()
        const args =  commands.split(' ')
        const command = commands.toLowerCase().split(' ')[0] || ''
		
        const argz = body.trim().split(/ +/).slice(1)
        const ar = argz.map((v) => v.toLowerCase())

        global.prefix
        
        const time = moment(t * 1000).format('DD/MM HH:mm:ss')
        const botNumber = await dhil.getHostNumber()
        const blockNumber = await dhil.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await dhil.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const SN = GenerateSerialNumber("000000000000000000000000")

        
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        const url = args.length !== 0 ? args[0] : ''

        /******* VALIDATOR  *******/
        const isBanned = banned.includes(sender.id)
        const isBlocked = blockNumber.includes(sender.id)
        const isNsfw = isGroupMsg ? nsfw_.includes(chat.id) : false
        const isSimi = isGroupMsg ? simi_.includes(chat.id) : false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isImage = type === 'image'

    
        const arg = body.substring(body.indexOf(' ') + 1)
  

       
        const isDetectorLink = antilink.includes(chatId)
        const AntiStickerSpam = antisticker.includes(chatId)
        const isBadword = badword.includes(chatId)
        const isPrivate = sender.id === chat.contact.id
        const stickermsg = message.type === 'sticker'
        const isCmd = command.startsWith(prefix)

        const ownerNumber = '62821****@c.us'
        const isOwner = ownerNumber.includes(sender.id)
        const isAfkOn = afk.checkAfkUser(sender.id, _afk)
        const isPremi = premium.checkPremiumUser(sender.id, premiNumber)
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        

        const isKasar = await cariKasar(chats)
        /******* END OF VALIDATOR  *******/
        
        const tms = (Date.now() / 1000) - (timeStart);
        const cts = waktu(tms)


        
        

                // ROLE (Change to what you want, or add) and You can change the role sort based on XP
                const levelRole = level.getLevelingLevel(sender.id, _level)
                var role = 'Culun V'
                if (levelRole <= 5) {
                    var role = 'Culun IV'
                } else if (levelRole <= 10) {
                    var role = 'Culun III'
                } else if (levelRole <= 15) {
                    var role = 'Culun II'
                } else if (levelRole <= 20) {
                    var role = 'Culun I'
                } else if (levelRole <= 25) {
                    var role = 'Amatir V'
                } else if (levelRole <= 30) {
                    var role = 'Amatir IV'
                } else if (levelRole <= 35) {
                    var role = 'Amatir III'
                } else if (levelRole <= 40) {
                    var role = 'Amatir II'
                } else if (levelRole <= 45) {
                    var role = 'Amatir I'
                } else if (levelRole <= 50) {
                    var role = 'Pro V'
                } else if (levelRole <= 55) {
                    var role = 'Pro IV'
                } else if (levelRole <= 60) {
                    var role = 'Pro III'
                } else if (levelRole <= 65) {
                    var role = 'Pro II'
                } else if (levelRole <= 70) {
                    var role = 'Pro I'
                } else if (levelRole <= 75) {
                    var role = 'Legend V'
                } else if (levelRole <= 80) {
                    var role = 'Legend IV'
                } else if (levelRole <= 85) {
                    var role = 'Legend III'
                } else if (levelRole <= 90) {
                    var role = 'Legend II'
                } else if (levelRole <= 95) {
                    var role = 'Legend I'
                } else if (levelRole <= 100) {
                    var role = 'Myth'
                }
        
                // Leveling [BETA] by Slavyan | BIG THANKS TO HIM
                if (isGroupMsg && isReg && !isBanned && isLevelingOn) {
                    const currentLevel = level.getLevelingLevel(sender.id, _level)
                    const checkId = level.getLevelingId(sender.id, _level)
                    const checkBg = card.getBg(sender.id, _bg)
                    try {
                        if (currentLevel === undefined && checkId === undefined) level.addLevelingId(sender.id, _level)
                        if (checkBg === undefined) card.addBg(sender.id, _bg)
                        const amountXp = Math.floor(Math.random() * 10) + 150
                        const requiredXp = 200 * (Math.pow(2, currentLevel) - 1)
                        const getLevel = level.getLevelingLevel(sender.id, _level)
                        level.addLevelingXp(sender.id, amountXp, _level)
                        if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                            level.addLevelingLevel(sender.id, 1, _level)
                            const fetchXp = 200 * (Math.pow(2, level.getLevelingLevel(sender.id, _level)) - 1)
                            await dhil.reply(from, `*「 LEVEL UP 」*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${getLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*\n\nCongrats!! 🎉🎉`, id)
                        }
                    } catch (err) {
                        console.error(err)
                    }
                }
                if(chats.match("curhat")){
                    dhil.reply(from, 'Bot gabisa diajak curhat ya dik! Karna bot bukan manusia :)', id)
                }
		
        

       

        
        
        // [BETA] Avoid Spam Message
        //if (isCmd && isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        //if (isCmd && isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // AKTIFKAN APABILA TIDAK INGIN TERKENA SPAM!!
    
        
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
                return dhil.reply(from, `Kamu belum cukup umur untuk menggunakan BOT ini, min 16 tahun\n\nKamu bisa mendaftar ulang dengan cara donasi terlebih dahulu, bales ${prefix}donasi\nHubungi Owner : wa.me/6281311850715`, id) //if user is not registered
            }
        }

        // AFK by Slavyan
        const jirafk = JSON.parse(fs.readFileSync('./lib/database/user/afk.json'))
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                for(let af of jirafk){
                    if(af.id === ment){
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await dhil.sendTextWithMentions(from, `🔴 @${af.id.replace(/[@c.us]/g, '')} Sedang AFK!!\n *├ Alasan :* ${getReason}\n *├ Waktu :* ${getTime}`, id)
                }
            }
        }}
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./lib/database/user/afk.json', JSON.stringify(_afk))
                await dhil.sendTextWithMentions(from, `✅ @${sender.id.replace(/[@c.us]/g, '')} _Sudah tidak AFK!_`, id)
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
            if (isOwner) {return false;}
            let found = false;
            for (let i of stickerspam){
                if(i.id === id){
                    if (i.msg >= 13) {
                        found === true 
                        dhil.reply(from, '*[ANTI STICKER SPAM]*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh bot', message.id).then(() => {
                            dhil.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if(stickerspam[i].id == cus){
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const result = '✅ DB Sticker Spam has been reset'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./lib/database/user/stickerspam.json',JSON.stringify(stickerspam));
                                dhil.sendText(from, result)
                            } else {
                                    dhil.reply(from, `${monospace(`Di database ngga ada nomer itu kak`)}`, id)
                            }
                        })
                        return true;
                    }else{
                        found === true
                        return false;
                    }   
                }
            }
            if (found === false){
                let obj = {id: `${id}`, msg:1};
                stickerspam.push(obj);
                fs.writeFileSync('./lib/database/user/stickerspam.json',JSON.stringify(stickerspam));
                return false;
            }  
        }
        function addStickerCount(id){
            if (isOwner) {return;}
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if(stickerspam[i].id == id){
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./lib/database/user/stickerspam.json',JSON.stringify(stickerspam));
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
                        fs.writeFileSync('./lib/database/group/msgLimit.json',JSON.stringify(msgLimit));
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
                        fs.writeFileSync('./lib/database/groupmsgLimit.json',JSON.stringify(msgLimit));
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
                        fs.writeFileSync('./lib/database/user/limit.json',JSON.stringify(limit));
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
                        fs.writeFileSync('./lib/database/user/limit.json',JSON.stringify(limit));
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
     
        
        if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isOwner){
            if(stickermsg === true){
                if(isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }
       
        

        if(!isCmd && isGroupMsg && isBadword && !isGroupAdmins && isKasar) { 
            console.log(color('[BADWORD]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
            if(isBadwordMsg(serial)) return
                addBadCount(serial)
        }
        if (isGroupMsg && isDetectorLink && !isGroupAdmins && !isOwner){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                const check = await dhil.inviteInfo(chats);
                if (!check) {
                    return
                } else {
                    dhil.reply(from, '*[GROUP LINK DETECTOR]*\nKamu mengirimkan link grup chat, maaf kamu di kick dari grup :(', id).then(() => {
                        console.log(color('[ANTI-LINK]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${argx}`), 'from', color(pushname), 'in', color(name || formattedTitle)) 
                        dhil.removeParticipant(groupId, sender.id)
                    })
                }
            }
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
                        fs.writeFileSync('./lib/database/group/muted.json', JSON.stringify(muted, null, 2))
                        dhil.reply(from, `Bot telah di mute pada chat ini! ${prefix}unmute untuk unmute!`, id)
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        muted.push(chatId)
                        fs.writeFileSync('./lib/database/group/muted.json', JSON.stringify(muted, null, 2))
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
                        fs.writeFileSync('./lib/database/group/muted.json', JSON.stringify(muted, null, 2))
                        dhil.reply(from, 'Bot telah di unmute!', id)         
                    }else{
                        if(isMsgLimit(serial)){
                            return
                        }else{
                            addMsgLimit(serial)
                        }
                        let index = muted.indexOf(chatId);
                        muted.splice(index,1)
                        fs.writeFileSync('./lib/database/group/muted.json', JSON.stringify(muted, null, 2))
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
			
			/****** DAFTAR *******/
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
                    /******** END OF DAFTAR  ********/

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
                        // Group ENABLE | DISABLE
					case prefix+'antilink':{
					    if(isReg(obj)) return
					    if(cekumur(cekage)) return
					    if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
					    if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
					    if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
					    if (args[1] == 'on') {
						var cek = antilink.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah Aktif`, id) //if number already exists on database
						} else {
							antilink.push(chatId)
							fs.writeFileSync('./lib/database/group/antilink.json', JSON.stringify(antilink))
							dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Aktif`, id)
						}
					} else if (args[1] == 'off') {
						var cek = antilink.includes(chatId);
						if(!cek){
							return dhil.reply(from, `*「 ANTI GROUP LINK 」*\nStatus : Sudah DiNonaktif`, id) //if number already exists on database
						} else {
							let nixx = antilink.indexOf(chatId)
							antilink.splice(nixx, 1)
							fs.writeFileSync('./lib/database/group/antilink.json', JSON.stringify(antilink))
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
					if (args[1] == 'on') {
						var cek = antisticker.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
						 } else {
							antisticker.push(chatId)
							fs.writeFileSync('./lib/database/group/antisticker.json', JSON.stringify(antisticker))
							dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
						}
					} else if (args[1] == 'off') {
						var cek = antisticker.includes(chatId);
						if(cek){
							return dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
						} else {
							let nixx = antisticker.indexOf(chatId)
							antisticker.splice(nixx, 1)
							fs.writeFileSync('./lib/database/group/antisticker.json', JSON.stringify(antisticker))
							dhil.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
							limitAdd(serial)
						}
					} else {
						dhil.reply(from, `Pilih enable atau disable coek!`, id)
				}}
					break
                    case prefix + 'antibadword':
                        if(isReg(obj)) return
                        if(cekumur(cekage)) return
                        if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                        //if (!isGroupAdmins) return dhil.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                        if (!isBotGroupAdmins) return dhil.reply(from, 'Wahai admin, jadikan saya sebagai admin grup dahulu :)', id)
                        if (args[1] == 'on') {
                            var cek = badword.includes(chatId);
                            if(cek){
                                return dhil.reply(from, '*Anti Badword Detector* sudah aktif di grup ini', id) //if number already exists on database
                            } else {
                                badword.push(chatId)
                                fs.writeFileSync('./lib/database/group/badword.json', JSON.stringify(badword))
                                dhil.reply(from, '*[Anti BadWord]* telah di aktifkan\n\nMohon para member grup sekalian untuk tidak berkata kasar sebanyak 5x atau akan di kick secara otomatis!', id)

                            }
                        } else if (args[1] == 'off') {
                            var cek = badword.includes(chatId);
                            if(!cek){
                                return dhil.reply(from, '*Anti Badword Detector* sudah non-aktif di grup ini', id) //if number already exists on database
                            } else {
                                let nixx = badword.indexOf(chatId)
                                badword.splice(nixx, 1)
                                fs.writeFileSync('./lib/database/group/badword.json', JSON.stringify(badword))
                                dhil.reply(from, '*[Anti BadWord]* telah di nonaktifkan', id)
                                limitAdd(serial)
                            }
                        } else {
                            dhil.reply(from, `pilih on / off\n\n*[Anti BadWord]*\nSetiap member grup yang mengirim pesan mengandung badword lebih dari 10x akan di kick oleh bot!`, id)
                        }
                        break  
                case prefix + 'leveling':
                     if(isReg(obj)) return
                     if(cekumur(cekage)) return
                     if (!isGroupMsg) return await dhil.reply(from, mess.Gr, id)
                     if (!isGroupAdmins) return await dhil.reply(from, mess.Ga, id)
                     if (ar[0] === 'on') {
                    if (isLevelingOn) return await dhil.reply(from, 'Fitur leveling telah diaktifkan sebelumnya.', id)
                    _leveling.push(groupId)
                    fs.writeFileSync('./lib/database/group/leveling.json', JSON.stringify(_leveling))
                    await dhil.reply(from, 'Fitur leveling berhasil *diaktifkan*!', id)
                } else if (ar[0] === 'off') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./lib/database/group/leveling.json', JSON.stringify(_leveling))
                    await dhil.reply(from, 'Fitur leveling berhasil *dinonaktifkan*!', id)
                } else {
                    await dhil.reply(from, mess.Fo, id)
                }
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
							fs.writeFileSync('./lib/database/group/stickerspam.json',JSON.stringify(stickerspam));
							dhil.reply(from, result, from)
							limitAdd(serial)
						} else {
								dhil.reply(from, `Maaf, Nomor itu tidak terdaftar di database!`, id)
				}}
                    break
                 case prefix +'addbadword':{
                    //if (!isPremium) return dhil.reply(from, 'Untuk menghindari penyalahgunaan, fitur ini hanya tersedia untuk user premium', id)
                    if(isReg(obj)) return
                    if(cekumur(cekage)) return
                    if (!args.length >= 1) return dhil.reply(from, 'Masukkan kata kasar yang akan di blacklist ', id) 
                    const word = body.slice(12)
                    var cek = db_badword.includes(word);
                    if(cek){
                    return dhil.reply(from, 'Badword sudah ada di database', id) //if number already exists on database
                     } else { 
                    db_badword.push(word)
                         fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(db_badword))
                         dhil.reply(from, `Sukses memblacklist kata kasar\nTotal data badword sekarang : *${db_badword.length - 1}*`, id)
                            }
                        }
                    break      
                case prefix +'listbadword': {
                    const bad = fs.readFileSync('./lib/database/katakasar.json')
                    const liste = JSON.parse(bad)
                    let list = '☠️ *Daftar Badword* ☠️\nJika filter anti badword di aktifkan, setiap member yang mengirimkan pesan mengandung badword lebih dari 10x maka akan di kick oleh bot\n'
                        list += `*Total (${liste.length})*\n`
                        let nomre = 1
                          for (let i = 0; i < liste.length; i++){
                             list += `\n*${nomre}.* ${liste[i]}`
                              nomre++
                        }
                        dhil.sendText(from, list) 
                          }
                        break          
                
                case prefix+'delbadword':
                        if (!isOwner) return dhil.reply(from, mess.Own, id)
                            const delbd = dbbadword.indexOf(body.slice(12))
                            dbbadword.splice(delbd, 1)
                            fs.writeFileSync('./lib/database/katakasar.json', JSON.stringify(dbbadword))
                            dhil.reply(from, `Success Menghapus Badword!`, id)
                        break
                 case prefix +'resetbadword':{
                     if(isLimit(serial)) return
                     if(isReg(obj)) return
                     if(cekumur(cekage)) return
                     //if (!isGroupAdmins) return dhil.reply(from, 'Command ini hanya dapat digunakan oleh admin grup')  
                     if (!args.length >= 1) return dhil.reply(from, 'Masukkan nomornya, *GUNAKAN AWALAN 62*\ncontoh: #resetbadword 6285112554122 / #resetbadword @member', id) 
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
                                 fs.writeFileSync('./lib/database/user/msgBadword.json',JSON.stringify(msgBadword));
                                dhil.reply(from, result, id)
                                limitAdd(serial)
                             } else {
                             dhil.reply(from, `${monospace(`Di database ngga ada nomer itu dik`)}`, id)
                             }
                         }
                        break
                 
                         // Group Settings
                    case prefix+'left':
                        if(isReg(obj)) return
                        if(cekumur(cekage)) return
                        if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                        if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                        if (args.length === 1) return dhil.reply(from, 'Pilih enable atau disable!', id)
                        if (args[1].toLowerCase() === 'on') {
                            left.push(chat.id)
                            fs.writeFileSync('./lib/database/group/left.json', JSON.stringify(left))
                            dhil.reply(from, 'Fitur left berhasil di aktifkan di group ini!', id)
                        } else if (args[1].toLowerCase() === 'off') {
                            left.splice(chat.id, 1)
                            fs.writeFileSync('./lib/database/group/left.json', JSON.stringify(left))
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
                        if (args[1].toLowerCase() === 'on') {
                            welkom.push(chat.id)
                            fs.writeFileSync('./lib/database/group/welcome.json', JSON.stringify(welkom))
                            dhil.reply(from, 'Fitur welcome berhasil di aktifkan di group ini!', id)
                        } else if (args[1].toLowerCase() === 'off') {
                            welkom.splice(chat.id, 1)
                            fs.writeFileSync('./lib/database/group/welcome.json', JSON.stringify(welkom))
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
                            if (args[1].toLowerCase() === 'on') {
                                var cek = nsfw_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `NSFW Sudah diaktifkan di grup ini`, id)
                                } else {
                                nsfw_.push(chat.id)
                                fs.writeFileSync('./lib/database/group/nsfw.json', JSON.stringify(nsfw_))
                                dhil.reply(from, 'NSFW berhasil di aktifkan di group ini! kirim perintah *#nsfwMenu* untuk mengetahui menu', id)
                                }
                            } else if (args[1].toLowerCase() === 'off') {
                                var cek = nsfw_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `NSFW Sudah dinonaktifkan di grup ini`, id)
                                } else {
                                nsfw_.splice(chat.id, 1)
                                fs.writeFileSync('./lib/database/group/nsfw.json', JSON.stringify(nsfw_))
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
                            if (args[1].toLowerCase() === 'on') {
                                var cek = simi_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                                } else {
                                simi_.push(chat.id)
                                fs.writeFileSync('./lib/database/group/Simsimi.json', JSON.stringify(simi_))
                                dhil.reply(from, 'Simsimi berhasil di aktifkan di group ini! Kirim perintah *# [teks]*\nContoh : *! halo*', id)
                                }
                            } else if (args[1].toLowerCase() === 'off') {
                                var cek = simi_.includes(chatId);
                                if(cek){
                                    return dhil.reply(from, `Simsimi Sudah diaktifkan di grup ini`, id)
                                } else {
                                simi_.splice(chat.id, 1)
                                fs.writeFileSync('./lib/database/group/Simsimi.json', JSON.stringify(simi_))
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
                        case prefix + 'resetlinkgroup':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                            if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
                            if (isGroupMsg) {
                                await dhil.revokeGroupInviteLink(groupId);
                                dhil.sendTextWithMentions(from, `Link group telah direset oleh admin @${sender.id.replace('@c.us', '')}`)
                            }
                            break
                        case prefix + 'setgcname':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                            if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
                            const namagrup = body.slice(11)
                            let sebelum = chat.groupMetadata.formattedName
                            let halaman = global.page ? global.page : await dhil.getPage()
                            await halaman.evaluate((chatId, subject) =>
                            Store.WapQuery.changeSubject(chatId, subject),groupId, `${namagrup}`)
                            dhil.sendTextWithMentions(from, `Nama group telah diubah oleh admin @${sender.id.replace('@c.us','')}\n\n• Before: ${sebelum}\n• After: ${namagrup}`)
                            break
                        case prefix + 'setgcpp':
                            if(isReg(obj)) return
                            if(cekumur(cekage)) return
                            if (!isGroupMsg) return dhil.reply(from, mess.Gr, id)
                            if (!isGroupAdmins) return dhil.reply(from, mess.Ga, id)
                            if (!isBotGroupAdmins) return dhil.reply(from, mess.Ba, id)
                            if (isMedia) {
                                const mediaData = await decryptMedia(message)
                                const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                                await dhil.setGroupIcon(from, imageBase64)
                                dhil.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
                            } else if (quotedMsg && quotedMsg.type == 'image') {
                                const mediaData = await decryptMedia(quotedMsg)
                                const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                                await dhil.setGroupIcon(from, imageBase64)
                                dhil.sendTextWithMentions(from, `Profile group telah diubah oleh admin @${sender.id.replace('@c.us','')}`)
                            } else {
                                dhil.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}setgroupicon`, id)
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
                            case prefix + 'stickerlightning':
                            case prefix + 'slightning':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                dhil.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
                                if (isMedia && type === 'image') {
                                    const mediaData = await decryptMedia(message, uaOverride)
                                    const getUrle = await uploadImages(mediaData, false)
                                    const imgnye = await stickerlight(getUrle)
                                    const Slight = imgnye.result.imgUrl
                                    await dhil.sendStickerfromUrl(from, Slight)
                                } else if (quotedMsg && quotedMsg.type == 'image') {
                                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                                    const getUrle = await uploadImages(mediaData, false)
                                    const imgnye = await stickerlight(getUrle)
                                    const Slight = imgnye.result.imgUrl
                                    await dhil.sendStickerfromUrl(from, Slight)
                                } else {
                                    await dhil.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}stickerlightning`, id)
                                }
                                break
                            case prefix + 'stickerfire':
                            case prefix + 'sfire':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                dhil.reply(from, `[WAIT] Sedang di proses⏳ silahkan tunggu ± 1 min!`, id)
                                if (isMedia && type === 'image') {
                                    const mediaData = await decryptMedia(message, uaOverride)
                                    const getUrli = await uploadImages(mediaData, false)
                                    const imgnya = await stickerburn(getUrli)
                                    const Sfire = imgnya.result.imgUrl
                                    await dhil.sendStickerfromUrl(from, Sfire)
                                } else if (quotedMsg && quotedMsg.type == 'image') {
                                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                                    const getUrli = await uploadImages(mediaData, false)
                                    const imgnya = await stickerburn(getUrli)
                                    const Sfire = imgnya.result.imgUrl
                                    await dhil.sendStickerfromUrl(from, Sfire)
                                } else {
                                    await dhil.reply(from, `Wrong Format!\n⚠️ Harap Kirim Gambar Dengan ${prefix}stickerfire`, id)
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
                            // Owner Tools
                            case prefix + 'premium':
                                if (!isOwner) return dhil.reply(from, mess.Own, id)
                                var cek = premiNumber.includes(ar[1]);
                                if(cek){
                                    return dhil.reply(from, `Nomor itu Sudah Ada Di Database`, id)
                                }
                               else if (ar[0] === 'add') {
                                    if (mentionedJidList.length !== 0) {
                                        for (let benet of mentionedJidList) {
                                            if (benet === botNumber) return await dhil.reply(from, ind.wrongFormat(), id)
                                            const since = moment(t * 1000).format('DD/MM/YYYY')
                                            const exp = moment(t * 1000).add(`${args[3].replace(/d/g, '')}`, 'days').calendar()
                                            premium.addPremiumUser(benet, args[3], since, exp, premiNumber)
                                            await dhil.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${benet}\n➸ *From*: ${since}\n➸ *Exipired*: ${exp}\n➸ *Status Expired*: ${ms(toMs(args[3])).days} day(s) ${ms(toMs(args[3])).hours} hour(s) ${ms(toMs(args[3])).minutes} minute(s)`, id)
                                        }
                                    } else {
                                        const since = moment(t * 1000).format('DD/MM/YYYY')
                                            const exp = moment(t * 1000).add(`${args[3].replace(/d/g, '')}`, 'days').calendar()
                                        premium.addPremiumUser(args[2] + '@c.us', args[3], since, exp, premiNumber)
                                        await dhil.reply(from, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: ${args[2]}@c.us\n➸ *From*: ${since}\n➸ *Exipired*: ${exp}\n➸ *Status Expired*: ${ms(toMs(args[3])).days} day(s) ${ms(toMs(args[3])).hours} hour(s) ${ms(toMs(args[3])).minutes} minute(s)`, id)
                                    }
                                } else if (ar[0] === 'del') {
                                    if (mentionedJidList.length !== 0) {
                                        if (mentionedJidList[0] === botNumber) return await dhil.reply(from, ind.wrongFormat(), id)
                                        premiNumber.splice(premium.getPremiumPosition(mentionedJidList[0], premiNumber), 1)
                                        fs.writeFileSync('./lib/database/user/premium.json', JSON.stringify(premiNumber))
                                        await dhil.reply(from, 'Done Bos!', id)
                                    } else {
                                        premiNumber.splice(premium.getPremiumPosition(args[1] + '@c.us', premiNumber), 1)
                                        fs.writeFileSync('./lib/database/user/premium.json', JSON.stringify(premiNumber))
                                        await dhil.reply(from, 'Done Bos!', id)
                                    }
                                } else {
                                    await dhil.reply(from, mess.Fo, id)
                                }
                            break

                            case prefix + 'premiumcheck':
                            case prefix + 'cekpremium':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if (!isPremi) return await dhil.reply(from, 'Maaf, anda tidak terdaftar sebagai user Premium!', id)
                                for(let p of premiNumber){
                                    if(p.id === sender.id){
                                        let start = p.start
                                        let end = p.end
                                    const cekExp = ms(premium.getPremiumExpired(sender.id, premiNumber) - Date.now())
                                    await dhil.reply(from, `*「 PREMIUM EXPIRE 」*\n\n➸ *ID*: ${sender.id.replace(/[@c.us]/g, '')}\n➸ *From*: ${start}\n➸ *Exipired*: ${end}\n➸ *Status Expired*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
                                    }}
                                    break
                            case prefix + 'premiumlist':
                            case prefix + 'listpremium':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                 let listPremi = '「 *PREMIUM USER LIST* 」\n\n'
                                 let nomorList = 0
                                 const arrayPremi = []
                                 for (let i = 0; i < premium.getAllPremiumUser(premiNumber).length; i++) {
                                        arrayPremi.push(await dhil.getContact(premium.getAllPremiumUser(premiNumber)[i]))
                                        nomorList++
                                        listPremi += `${nomorList}. ${premium.getAllPremiumUser(premiNumber)[i]}\n➸ *Name*: ${arrayPremi[i].pushname}\n\n`
                                    }
                                    await dhil.reply(from, listPremi, id)
                                break

                            // MISC
                            case prefix + 'afk':{
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if (!isGroupMsg) return await dhil.reply(from, mess.Gr, id)
                                    if (isAfkOn) return await dhil.reply(from, 'Anda sudah AFK!', id)
                                    const q = args[1]
                                    const nom = sender.id
                                    const reason = q ? q : 'Nothing.'
                                    afk.addAfkUser(sender.id, time, reason, _afk)
                                    await dhil.sendTextWithMentions(from, `🔺 @${nom.replace(/[@c.us]/g, '')} Sekarang AFK\nAlasan: ${reason}\nWaktu: ${time}`, id)
                            }
                                break   
                             case prefix +'reminder':{ // by Slavyan
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if (!isPremi) return dhil.reply(from, mess.Pr, id)
                                if (args.length === 1) return dhil.reply(from, `Format salah!`, id)
                                if (argz.length === 1){
                                    const arg = body.substring(body.indexOf(' ') + 1)
                                const timeRemind = arg.split('|')[0]
                                const messRemind = arg.split('|')[1]
                                const parsedTime = ms(toMs(timeRemind))
                                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                                await dhil.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                                const intervRemind = setInterval(async () => {
                                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                                        await dhil.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nDing Dong~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${reminder.getReminderMsg(sender.id, _reminder)}`)
                                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                                        fs.writeFileSync('./lib/database/user/reminder.json', JSON.stringify(_reminder))
                                        clearInterval(intervRemind)
                                    }
                                }, 1000)
                            }}
                            break
                            case prefix + 'limit':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                //if (isOwner) return dhil.reply(from, `Sisa limit request anda tersisa : *99999983*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                                if (isPremi) return dhil.reply(from, 'Anda adalah member *PREMIUM*, sisa limit request anda adalah *UNLIMITED/TAK TERBATAS*', id)
                                    var found = false
                                    const limidat = JSON.parse(fs.readFileSync('./lib/database/user/limit.json'))
                                    for(let lmt of limidat){
                                        if(lmt.id === serial){
                                            let limitCounts = limitCount-lmt.limit
                                            if(limitCounts <= 0) return dhil.reply(from, `Limit request anda sudah habis\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                                            dhil.reply(from, `Sisa limit request anda tersisa : *${limitCounts}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                                            found = true
                                        }
                                    }
                                    //console.log(limit)
                                //console.log(limidat)
                                    if (found === false){
                                        let obj = {id: `${serial}`, limit:1};
                                        limit.push(obj);
                                        fs.writeFileSync('./lib/database/user/limit.json',JSON.stringify(limit, 1));
                                        dhil.reply(from, `Sisa limit request anda tersisa : *${limitCount}*\n\n_Note : Limit akan direset setiap jam 21:00!_`, id)
                                    }
                                    break 

                            // Level [BETA] by Slavyan
                            case prefix + 'level':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                if (!isLevelingOn) return await dhil.reply(from, 'Sistem Level belum diaktifkan di grup ini!', id)
                                if (!isGroupMsg) return await dhil.reply(from, mess.Gr, id)
                                const userLevel = level.getLevelingLevel(sender.id, _level)
                                const userXp = level.getLevelingXp(sender.id, _level)
                                if (userLevel === undefined && userXp === undefined) return await dhil.reply(from, 'Kamu belum memiliki Level!', id)
                                const ppLink = await dhil.getProfilePicFromServer(sender.id)
                                if (ppLink === undefined) {
                                 var pepe = errorImg
                                  } else {
                                 var pepe = ppLink
                                  }
                                 const bege = card.getBg(sender.id, _bg)
                                 const requiredXp = 200 * (Math.pow(2, userLevel) - 1)
                                 const randomHexs = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                                 const randomHex = `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`
                                 const rank = new canvas.Rank()
                                       .setAvatar(pepe)
                                       .setLevel(userLevel)
                                       .setRank(1, `${role}`, false) // Set value to true if you want to display user's roles
                                       .setCurrentXP(userXp)
                                       .setRequiredXP(requiredXp)
                                       .setProgressBar([randomHexs, randomHex], 'GRADIENT')
                                       .setBackground('IMAGE', bege)
                                       .setUsername(pushname)
                                       .setDiscriminator(sender.id.substring(6, 10))
                                        rank.build()
                                            .then(async (buffer) => {
                                                canvas.write(buffer, `${pushname}_card.png`)
                                                await dhil.sendFile(from, `${pushname}_card.png`, `${pushname}_card.png`, '', id)
                                                fs.unlinkSync(`${pushname}_card.png`)
                                            })
                                            .catch(async (err) => {
                                                console.error(err)
                                                await dhil.reply(from, 'Error!', id)
                                            })
                                    break
                            case prefix + 'leaderboard':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                 if (!isLevelingOn) return await dhil.reply(from, 'Sistem Level belum diaktifkan di grup ini!', id)
                                 if (!isGroupMsg) return await dhil.reply(from. mess.Gr, id)
                                  _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                                   let leaderboard = '-----[ *LEADERBOARD* ]----\n\n'
                                   let nom = 0
                                     try {
                                       for (let i = 0; i < 10; i++) {
                                        nom++
                                         leaderboard += `${nom}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n\n`
                                        }
                                        await dhil.reply(from, leaderboard, id)
                                      } catch (err) {
                                           console.error(err)
                                            await dhil.reply(from, 'Perlu setidaknya *10* user yang memiliki level di database!', id)
                                        }
                                    break
                            case prefix + 'setbackground':
                            case prefix +'setbg':
                                if(isReg(obj)) return
                                if(cekumur(cekage)) return
                                 if (!isLevelingOn) return await dhil.reply(from, 'Sistem Level belum diaktifkan di grup ini!', id)
                                 if (!isGroupMsg) return await dhil.reply(from, mess.Gr, id)
                                 let linke = args[1].match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
                                 if (!linke)  return await dhil.reply(from, mess.Fo, id)
                                 const levels = level.getLevelingLevel(sender.id, _level)
                                  const xps = level.getLevelingXp(sender.id, _level)
                                   if (levels === undefined && xps === undefined) return await dhil.reply(from, 'Kamu belum memiliki Level!', id)
                                    card.replaceBg(sender.id, args[1], _bg)
                                  await dhil.reply(from, 'Success set new background!', id)
                                   break                        
                                                    
                           
						





default:
            //if (!isGroupMsg) return dhil.reply(from, 'Jika Ingin Menggunakan Bot Harap Masuk Ke Dalam Grup BOT, Link Ada Di Bio atau Bisa Mengetik !groupbot!', id)
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
