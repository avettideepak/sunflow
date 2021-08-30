import { ACCOUNT_MESSAGES_LINK } from "../../../../../../redux/links.js";
import { VID } from "../../../../../../project-config.js";

export const sendMessage = (message, setMessageStatus) => {
  let form = new FormData();

  form.append("itemcode", message.code);
  form.append("vendorId", VID);
  form.append("subject", message.subject);
  form.append("filename", null);
  //form.append("target", "enquiry-146");
  form.append("content", message.content);

  let type = "&type=2";
  let statusCode = "";

  fetch(ACCOUNT_MESSAGES_LINK + type, {
    method: "POST",
    body: form,
    headers: {
      Accept: "*/*",
      credentials: "same-origin"
    },
    mimeType: "multipart/form-data",
    data: form
  })
    .then(res => res.text())
    .then(statusText => {
      console.info(statusText);
      setMessageStatus(statusText);
    })
    .catch(err => console.error(err));

  return statusCode;
};
