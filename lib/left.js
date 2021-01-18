const fs = require('fs-extra')

module.exports = left = async (dhil, event) => {
    //console.log(event.action)
    const left = JSON.parse(fs.readFileSync('./lib/database/group/left.json'))
    const isLeft = left.includes(event.chat)
    try {
        if (event.action == 'remove' && left) {
            const gChat = await dhil.getChatById(event.chat)
            const pChat = await dhil.getContact(event.who)
            const { contact, groupMetadata, name } = gChat
            const pepe = await dhil.getProfilePicFromServer(event.who)
            const capt = `Sayonaraaa @${event.who.replace('@c.us', '')} 👋`
            if (pepe == '' || pepe == undefined) {
                await dhil.sendFileFromUrl(event.chat, 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQcODjk7AcA4wb_9OLzoeAdpGwmkJqOYxEBA&usqp=CAU', 'profile.jpg')
            } else {
                await dhil.sendFileFromUrl(event.chat, pepe, 'profile.jpg')
                dhil.sendTextWithMentions(event.chat, capt)
            }
        }
    } catch (err) {
        console.log(err)
    }
}