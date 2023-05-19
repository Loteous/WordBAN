const messages = {
  deleteAlert: '{user} ``` 해당 단어(문장) 는(은) 서버에서 허용되지 않습니다 ```',
  logging: {
    embeds: {
      messageSendEmbed: {
        title: `금지된단어 감지됨`,
        description: `🟥 감지된유저\n⇲ {user}\r---------------------------\n🔴 감지된채널\n⇲ {channel}\r---------------------------\n❗감지된단어\n⇲ {content}`,
        footer: {
          text: `WordBAN`,
          iconURL: `{botAvatar}`,
        },
        color: "ff0000",
      },
      messageEditEmbed: {
        title: `수정된 메세지에서 금지된단어 감지됨`,
        description: `감지된유저:\n{user}\n감지된채널:\n{channel}\n감지된단어:\n{content}`,
        footer: {
          text: `WordBAN`,
          iconURL: `{botAvatar}`,
        },
        color: "ff0000",
      },
    },
    noEmbed: `감지된유저:\n{user}\n감지된채널:\n{channel}\n감지된단어:\n{content}`,
  },
};
export { messages };
