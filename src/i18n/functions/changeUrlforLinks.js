import { countryList } from "../index"

const changeUrlforLinks = (langCode, entryState, location) => {
  let newUrl = location.pathname
  if (!entryState) {
    if (location.pathname.includes("preview")) {
      if (countryList.list.some((code) => newUrl.includes(`/${code}/`))) {
        countryList.list
          .filter((code) => {
            if (newUrl.includes(code) && code !== "en") {
              return true
            } else {
              return false
            }
          })
          .map((code) => (newUrl = newUrl.replace(`/${code}/`, "/")))
      }
      newUrl = newUrl.replace("preview", `preview/${langCode}`)
    } else {
      if (countryList.list.some((code) => newUrl.includes(`/${code}/`))) {
        countryList.list
          .filter((code) => {
            if (newUrl.includes(code) && code !== "en") {
              return true
            } else {
              return false
            }
          })
          .map((code) => (newUrl = newUrl.replace(`/${code}/`, "/")))
      }
      newUrl = `/${langCode}${newUrl}`
    }
    if (newUrl.includes("/en/")) {
      newUrl = newUrl.replace("/en/", "/")
    }
  }
  return newUrl
}

export default changeUrlforLinks
