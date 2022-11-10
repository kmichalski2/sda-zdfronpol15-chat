import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";

export const initChat = (db) => {
  const messagesCollection = collection(db, "messages");
  const chat = document.querySelector("#chat");

  if (chat) {
    handleSendMessage(messagesCollection);

    const messagesBySentDate = query(messagesCollection, orderBy("sentAt"));
    onSnapshot(messagesBySentDate, (result) => {
      const messages = result.docs.map((doc) => {
        const message = doc.data();
        message.sentAt = message.sentAt.toDate().toLocaleDateString();
        return message;
      });

      renderChat(chat, messages);
    });
  }
};

const renderChat = (chat, messages) => {
  chat.innerHTML = "";

  messages.forEach((message) => {
    const template = `<li class="list-group-item">
            <div class="author">${message.sentBy} ${message.sentAt}</div>
            <div class="message">${message.content}</div>
            </li>`;

    chat.innerHTML += template;
  });
};

const handleSendMessage = (messagesCollection) => {
  const form = document.querySelector("#sendMessageForm");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);

      const message = {
        content: formData.get("content"),
        sentBy: formData.get("sentBy"),
        sentAt: Timestamp.now(),
      };

      addDoc(messagesCollection, message).then((result) => {
        console.info(result);
        form.reset();
      });
    });
  }
};
