const promptButton = document.querySelector("#promptButton");
const promptChat = document.querySelector("#promptChat");

const createMessage = (content, messageType) => {
  const messageContainer = document.createElement("article");
  const message = document.createElement("p");

  message.classList.add(`${messageType}-message-content`);
  message.innerHTML = content;

  messageContainer.classList.add(`${messageType}-message`);
  messageContainer.append(message);

  return messageContainer;
};

export const handlePrompt = () => {
  const messageBox = document.querySelector("#messageBox");
  const activeChat = document.querySelector("#activeChat");
  const app = document.querySelector("#app");

  app.classList.add("moveUpFadeOut");
  app.classList.add("none");

  activeChat.classList = "active-chat";
  messageBox.classList.remove("none");

  messageBox.append(createMessage(promptChat.innerHTML, "user"));
  messageBox.scrollTop = messageBox.scrollHeight;

  console.log(promptChat.innerHTML);
  promptChat.replaceChildren();
  console.log(promptChat.innerHTML);
};
