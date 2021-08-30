import React from "react"
import { Link } from "gatsby"

import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"

import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

import changeUrlforLinks from "../../../../functions/changeUrlforLinks"
import { useLocation } from "@reach/router"

const LanguageDialogBox = ({
  onClose,
  translations,
  open,
  entryState,
  changeLang,
  countryCode,
  close,
}) => {
  const location = useLocation()
  const handleClose = () => {
    onClose()
  }

  const handleListItemClick = (value) => {
    onClose(value)
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Choose Country{" "}
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <List>
        {translations.map((lang, index) => {
          let country = lang !== "en" ? lang : "ca"
          const images = require.context(
            "../../../../../assets/icons/country",
            true
          )
          let bgImage = images("./" + country + ".png")
          return (
            <ListItem
              button
              autoFocus
              key={index}
              onClick={() => {
                changeLang({ lang: lang, country: country })
                handleClose()
                close()
              }}
              style={{ display: "flex", justifyContent: "center" }}
              selected={countryCode === country ? true : false}
            >
              <Link to={changeUrlforLinks(country, entryState, location)}>
                <img src={bgImage} />
              </Link>
            </ListItem>
          )
        })}
      </List>
    </Dialog>
  )
}

export default LanguageDialogBox
