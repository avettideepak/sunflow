import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import { PROJECT_LINK, PREVIEW, VID } from "../../project-config"
import Logo from "../../assets/img/footerLogo.jpg"
import FooterContentFunc from "./footerContent"
import AnchorElement from "../../functions/AnchorElement.jsx"

import { I18nContext } from "../../i18n/index"
function Footer() {
  const { translate } = React.useContext(I18nContext)

  const langState = useSelector((state) => state.mainReducer.lang, shallowEqual)

  const isMobileState = useSelector(
    (state) => state.mainReducer.isMobile,
    shallowEqual
  )

  const loginNameState = useSelector(
    (state) => state.loginReducer.loginName,
    shallowEqual
  )

  const [footerContent, setFooterContent] = useState({})

  useEffect(() => {
    setFooterContent(FooterContentFunc(langState, loginNameState))
    return () => {
      setFooterContent({})
    }
  }, [langState])

  const [activeFooterSection, setActiveFooterSection] = useState("")

  const renderLinks = (arrContent) => {
    return arrContent.map((content, i) => (
      <li {...content.parent.attributes} key={i}>
        {content.children.map((childContent, i) => {
          return <AnchorElement {...childContent} key={i} />
        })}
      </li>
    ))
  }

  const finePrint = (
    <small>
      Copyright &copy; 2020 Avetti.com Corporation. All Rights Reserved
    </small>
  )
  if (footerContent && Object.keys(footerContent).length > 0) {
    if (isMobileState) {
      const handleOnClickFooterSection = (e) => {
        const { target: clickedFooterSectionTarget } = e.target.dataset
        setActiveFooterSection(
          activeFooterSection !== clickedFooterSectionTarget &&
            clickedFooterSectionTarget
        )

        console.info(
          "activeFooterSection",
          activeFooterSection,
          clickedFooterSectionTarget
        )
      }

      const handleWhatIconToDisplay = (footerSectionName) => {
        return activeFooterSection === footerSectionName
          ? `remove_circle`
          : `add_circle`
      }
      return (
        <footer id="footer">
          <div
            className="new-footer"
            style={{
              maxWidth: "100%",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <div className="columns " style={{ maxWidth: "100%" }}>
              <div id="finePrint">{finePrint}</div>
            </div>
          </div>
        </footer>
      )
    } else {
      return (
        <footer id="footer">
          <div
            className="new-footer"
            style={{
              maxWidth: "100%",
              marginBottom: "0px",
              paddingBottom: "0px",
            }}
          >
            <div className="columns " style={{ maxWidth: "100%" }}>
              <div id="finePrint">{finePrint}</div>
            </div>
          </div>
        </footer>
      )
    }
  } else {
    return null
  }
}

export default Footer
