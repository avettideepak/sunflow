import { translations, mapCountryList } from "../index"
import { navigate } from "gatsby"

const changeUrlwithLanguageChange = (langCode, entryState, location) => {
  let newUrl = location.pathname

  let logicOf404 =
    newUrl.split("/")[newUrl.split("/").length - 1] !== "" &&
    newUrl.split("/")[newUrl.split("/").length - 2] !== ""
      ? true
      : false
  console.info("new URL3", newUrl, logicOf404)
  if (logicOf404 || newUrl.split("/").length < 3) {
    if (location.pathname.includes("preview")) {
      console.info("new URL22--")
      if (mapCountryList.some((code) => newUrl.includes(`/${code}/`))) {
        mapCountryList
          .filter((code) => {
            if (newUrl.includes(`/${code}/`) && code !== "en") {
              return true
            } else {
              return false
            }
          })
          .map((code) => (newUrl = newUrl.replace(`/${code}/`, "/")))
      }
      newUrl = newUrl.replace("preview", `preview/${langCode}`)
    } else {
      console.info("new URL2", newUrl)

      if (mapCountryList.some((code) => newUrl.includes(`/${code}/`))) {
        mapCountryList
          .filter((code) => {
            if (newUrl.includes(`/${code}/`)) {
              console.info("new Url INCLUDES:", `/${code}/`)
              return true
            } else {
              return false
            }
          })
          .forEach((code) => (newUrl = newUrl.replace(`/${code}/`, "/")))
      }
      newUrl = `/${langCode}${newUrl}`
    }
    if (newUrl.includes("/en/")) {
      newUrl = newUrl.replace("/en/", "/")
    }
    navigate(newUrl)
  } else {
    navigate("/")
  }
}

export default changeUrlwithLanguageChange
