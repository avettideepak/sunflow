import React from "react"
import Button from "@material-ui/core/Button"

import { PREVIEW } from "../../../../project-config"
import marketplaces from "../../../../marketplaces"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"

const Marketplaces = () => {
  const location = useLocation()
  const handleMarketplace = (marketplace) => {
    console.error("MARKETPLACE", location.pathname)
    let url = location.pathname

    if (marketplaces.some((market) => url.includes(market[1]))) {
      let marketplaceName = marketplaces.filter((market) => {
        if (url.includes(market[1])) {
          return true
        } else {
          return false
        }
      })[0][1]
      url = url.replace(`/${marketplaceName}`, "")
    }
    if (marketplace !== "default") {
      if (PREVIEW !== "") {
        navigate(`${PREVIEW}/${marketplace}${url.replace(PREVIEW, "")}`)
      } else {
        navigate(`/${marketplace}${url}`)
      }
    } else {
      navigate(url)
    }
  }
  return (
    <>
      <Button variant="outlined" onClick={() => handleMarketplace("default")}>
        Default
      </Button>
      {marketplaces.map((market) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleMarketplace(market[1])}
          >
            {market[0]}
          </Button>
        )
      })}
    </>
  )
}

export default Marketplaces
