import React from "react"
import { Link } from "gatsby"
import Logo from "@assets/img/dkLogo.png"
import LazyLoad from "react-lazyload"

export default function MenuLogo() {
  return (
    <Link to="/">
      <LazyLoad height={43} offset={100} debounce={300} fadein={true}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            lineHeight: "auto",
          }}
        />
      </LazyLoad>
    </Link>
  )
}
