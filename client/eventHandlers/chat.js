const invokeDashboard = (content = "") => {
  const messageBox = document.querySelector("#messageBox");
  const activeChat = document.querySelector("#activeChat");
  const app = document.querySelector("#app");
  app.classList.remove("none");
  app.classList.add("moveDownFadeIn");

  activeChat.classList.remove("active-chat");
  messageBox.classList.add("none");

  messageBox.replaceChildren();
};

const invokeChat = () => {
  const messageBox = document.querySelector("#messageBox");
  const activeChat = document.querySelector("#activeChat");
  const app = document.querySelector("#app");
  app.classList.add("moveUpFadeOut");
  app.classList.add("none");

  activeChat.classList = "active-chat";
  messageBox.classList.remove("none");
};

export { invokeDashboard, invokeChat };
