import React, { useEffect, useState, useRef, useContext } from "react"
import { shallowEqual, useSelector } from "react-redux"
import { setHTMLElementFixedPosition } from "../../../../../../functions/Utilities.js"
import { sendMessage } from "./EnquiryMessageHandler.js"
import { I18nContext } from "../../../../../../i18n/index.js"
import { PREVIEW } from "../../../../../../project-config.js"
import classes from "../../Styles/EnquiryModal.module.css"
import { navigate } from "gatsby"

export default function EnquiryModal({
  isLoggedIn,
  enquiryModalState,
  setEnquiryModalState,
}) {
  const { translate, langCode } = useContext(I18nContext)
  const [uploadOptionAvailable, setUploadOptionAvailable] = useState(true)
  const [messageInput, setMessageInput] = useState("")
  const [messageStatus, setMessageStatus] = useState("")

  const messageInputEl = useRef()

  const itemCodeState = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  )

  useEffect(() => {
    return () => {
      setMessageStatus("") // Empty it on unmount
    }
  }, [])

  useEffect(() => {
    const TIMEOUT_MESSAGE_STATUS = 3000
    setMessageInput("")
    setTimeout(() => {
      setMessageStatus("")
    }, TIMEOUT_MESSAGE_STATUS)
  }, [messageStatus])

  useEffect(() => {
    if (enquiryModalState && isLoggedIn) {
      messageInputEl.current.focus()
    }
    setHTMLElementFixedPosition(enquiryModalState)
    return () => {
      setHTMLElementFixedPosition(false)
    }
  }, [enquiryModalState])

  const handleSendMessageClicked = () => {
    let message = {
      code: itemCodeState,
      subject: `Enquiry about product ${itemCodeState} from xxx`,
      content: messageInput,
    }
    sendMessage(message, setMessageStatus)
    console.info("enquiry2", messageStatus)
  }

  const renderMessageStatus = () => {
    let statusText = ""
    let messageClass = ""
    if (messageStatus.includes("success")) {
      statusText = translate("enquiry.messageSendSuccess")
      messageClass = classes.messageSendSuccess
    } else {
      statusText = translate("enquiry.messageSendFailure")
      messageClass = classes.messageSendFailure
    }
    console.info(messageClass)
    return <p className={messageClass}>{statusText}</p>
  }

  const renderActions = () => (
    <div className={classes.actions}>
      {/*   {uploadOptionAvailable ? (
        <p
          className={classes.skipFileUploadBtn}
          onClick={event => {
            event.stopPropagation();
            setUploadOptionAvailable(false);
          }}
        >
          {translate(`enquiry.skipFileUpload`)}
        </p>
      ) : (
        <p
          onClick={() => setUploadOptionAvailable(true)}
          className={classes.backToFileUploadBtn}
        >
          {translate(`enquiry.backToFileUpload`)}
        </p>
      )} */}
      {messageStatus == "" ? (
        <button
          onClick={event => handleSendMessageClicked(event)}
          className={classes.sendMessageBtn}
        >
          {translate(`enquiry.sendMessage`)}
        </button>
      ) : (
        renderMessageStatus()
      )}
    </div>
  )

  const handleLoginBtnClicked = () => {
    let lang = langCode == "en" ? "" : "/" + langCode
    navigate(PREVIEW + lang + "/shop/login")
  }

  const renderEnquiryModalContent = () => {
    if (isLoggedIn) {
      return (
        <React.Fragment>
          <div className={classes.title}>
            <h3>{`${translate(`enquiry.title`)} ${itemCodeState}`}</h3>
            <i
              onClick={() => setEnquiryModalState(false)}
              className="material-icons"
            >
              close
            </i>
          </div>
          <div className={classes.content}>{renderContent()}</div>
          <div className={classes.actionsWrapper}>{renderActions()}</div>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <div className={classes.loginTitle}>
            <h6>{translate("enquiry.pleaseLogin")}</h6>
            <i
              onClick={() => setEnquiryModalState(false)}
              className="material-icons"
            >
              close
            </i>
          </div>
          <div className={classes.loginContent}>
            <small>{translate("enquiry.needToLoginToSendMessage")}</small>
            <div>
              <button
                className={classes.loginBtn}
                onClick={handleLoginBtnClicked}
              >
                {translate(`Login`)}
              </button>
            </div>
          </div>
        </React.Fragment>
      )
    }
  }

  const renderContent = () => (
    <React.Fragment>
      <h6 className={classes.contentTitle}>{translate(`enquiry.message`)}:</h6>
      <div className={classes.messageInputWrapper}>
        <textarea
          onChange={event => {
            setMessageInput(event.target.value)
          }}
          value={messageInput}
          ref={messageInputEl}
          className={classes.messageInput}
        ></textarea>
      </div>
      {/*    {uploadOptionAvailable && (
        <input type="file" className={classes.fileInput} />
      )} */}
    </React.Fragment>
  )

  return (
    enquiryModalState && (
      <div
        onClick={event => {
          console.info(event.target)
          event.stopPropagation()
          setEnquiryModalState(false)
        }}
        className={classes.container}
      >
        <div
          onClick={event => {
            event.stopPropagation()
          }}
          className={classes.wrapper}
        >
          {renderEnquiryModalContent()}
        </div>
      </div>
    )
  )
}
