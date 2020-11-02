/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import "./layout.css"
import "./styles.css"

const Layout = ({ children, footer }) => {
  const [privatePolicy , setPrivatePolicy] = useState(false);

  const onPolicy = () => {
    setPrivatePolicy(!privatePolicy);
  }
  return (
    <>
      <div className="contener">
        <main className="main">{children}</main>
        <footer>
        {footer}
        <div className="footer-mine">
          Copyrights <a href={"https://www.linkedin.com/in/piotr-borysowski-845130100/"} >Arkitekto</a> 🎅
          { privatePolicy &&
            <div>
              Every data you enter would be used only for this game and will be deleted after 3 months.
              Use it only for have fun and DON'T provide here any sensitive data.
            </div>
          }
          <button onClick={onPolicy}>Private Policy</button> <br />
          <div>btc: <b>12UUffmBhcF1C8YcxK2X5eGJEwFhzEn72R</b></div>
        </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
