/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"
import "./layout.css"
import "./styles.css"
import { useIntl, changeLocale } from "gatsby-plugin-intl"

const Layout = ({ children, footer }) => {
  const intl = useIntl();
  const [privacePolicy , setPrivacePolicy] = useState(false);

  const onPolicy = () => {
    setPrivacePolicy(!privacePolicy);
  }

  const onChangeLocale = () => {
    if(intl.locale === 'en') {
      changeLocale('pl');
    } else if(intl.locale === 'pl') {
      changeLocale('en');
    }
  }

  const localeChange = intl.locale === 'en' ? 'pl' : 'en'

  return (
    <>
      <div className="contener">
        <header><button onClick={onChangeLocale}>{localeChange}</button></header>
        <main className="main">{children}</main>
        <footer>
        {footer}
        <div className="footer-mine">
          Copyrights <a href={"https://www.linkedin.com/in/piotr-borysowski-845130100/"} >Arkitekto</a>
          { privacePolicy &&
            <div>
              {intl.formatMessage({ id: "c_privacy_text" })}
            </div>
          }
          <button onClick={onPolicy}>{intl.formatMessage({ id: "c_privacy" })}</button>
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
