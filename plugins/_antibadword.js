let { GroupSettingChange } = require('@adiwajshing/baileys')

let fs = require('fs')

let handler = m => m

let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|පකයා|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|hunton|asshole/i // tambahin sendiri

handler.before = function (m, { isOwner, isBotAdmin }) {

let img = fs.readFileSync('src/donasi.jpg')

if (m.isBaileys && m.fromMe) return !0

let chat = global.db.data.chats[m.chat]

let user = global.db.data.users[m.sender]

let isBadword = badwordRegex.exec(m.text)

if (!chat.antiBadword && !chat.isBanned && isBadword) {

user.warning += 1

this.send2Loc(m.chat, img, `*Badword terdeteksi!*

Warning: ${user.warning} / 2

“😑(done).`, global.footer, ' Antibadword', ',1 antibadword', 'Astaghfirullah', ',maaf', m)

if (user.warning >= 2) {

user.banned = true

if (m.isGroup) {

if (isBotAdmin) {

this.groupSettingChange(m.chat, GroupSettingChange.messageSend, true)

}

}

}

}

return !0

}

module.exports = handler
