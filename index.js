"use strict";
import { Client, MessageEmbed } from "discord.js";
const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_BANS",
    "GUILD_EMOJIS_AND_STICKERS",
    "GUILD_INTEGRATIONS",
    "GUILD_WEBHOOKS",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_PRESENCES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
    "GUILD_WEBHOOKS",
    "GUILD_VOICE_STATES",
  ],
});

import { config } from "./config.js";
client.login(config.token);
import { messages } from "./launge.js";

let logChannel = {};

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
 {
    if (config.ChannelID == "") {
      console.log("로그채널을 설정해주세요");
      process.exit(0);
    } else {
      logChannel = await client.channels.fetch(`${config.ChannelID}`);
    }
  }
});

function isBan(words, text) {
  const chk = text.toLowerCase();
  for (const word of words) {
    if (chk.includes(word)) {
      return true;
    }
  }
  return false;
}

Array.prototype.replaceAll = function (find, replace) {
  var rArr = this;
  for (const value of rArr) {
    if (typeof value !== "string" && typeof value !== "object") return;
    if (value == null || value == undefined) return;
    rArr[rArr.indexOf(value)] = value.replaceAll(find, replace);
  }
  return rArr;
};

Object.prototype.replaceAll = function (find, replace) {
  var rObj = this;
  for (const [key, value] of Object.entries(rObj)) {
    if (
      typeof value !== "string" &&
      typeof value !== "object" &&
      typeof value !== "array"
    )
      return;
    if (value == null || value == undefined) return;
    rObj[key] = value.replaceAll(find, replace);
  }
  return rObj;
};

client.on("messageCreate", (message) => {
  if (isBan(config.banwords, message.content, message.channel)) {
    function placeholderReplace(text) {
      return text
        .replaceAll(`{user}`, `<@${message.author.id}>`)
        .replaceAll(`{channel}`, `<#${message.channel.id}>`)
        .replaceAll(`{guild}`, `${message.guild.name}`)
        .replaceAll(`{botAvatar}`, `${client.user.displayAvatarURL()}`)
        .replaceAll(`{guildIcon}`, `${message.guild.iconURL()}`)
        .replaceAll(`{userAvatar}`, `${message.author.displayAvatarURL()}`)
        .replaceAll(`{content}`, `${message.content}`);
    }
    message.channel.send(placeholderReplace(messages.deleteAlert)).then((m) =>
      setTimeout(function () {
        m.delete();
      }, 15000)
    );
    {
      var embed = new MessageEmbed(
        placeholderReplace(messages.logging.embeds.messageSendEmbed)
      ).setTimestamp();
      logChannel.send({ embeds: [embed] });
    }
    message.delete();
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (isBan(config.banwords, newMessage.content, newMessage.channel)) {
    function placeholderReplace(text) {
      return text
        .replaceAll(`{user}`, `<@${newMessage.author.id}>`)
        .replaceAll(`{channel}`, `<#${newMessage.channel.id}>`)
        .replaceAll(`{guild}`, `${newMessage.guild.name}`)
        .replaceAll(`{botAvatar}`, `${client.user.displayAvatarURL()}`)
        .replaceAll(`{guildIcon}`, `${newMessage.guild.iconURL()}`)
        .replaceAll(`{userAvatar}`, `${newMessage.author.displayAvatarURL()}`)
        .replaceAll(`{content}`, `${newMessage.content}`);
    }
    {
      var embed = new MessageEmbed(
        placeholderReplace(messages.logging.embeds.messageEditEmbed)
      ).setTimestamp();
      logChannel.send({ embeds: [embed] });
    }
    newMessage.delete();
  }
});
