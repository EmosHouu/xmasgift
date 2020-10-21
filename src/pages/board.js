import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BoardPage = ({ location, data }) => {
  // console.log(location);
  // if(location.search !== '') {
  //   // createBoard();
  // }
  return (
    <Layout>
      <SEO title="Board" />
      {location.search}
      Send a link to everybody
      <Link to="/page-2/">Link</Link> [Clipboard]

      members already assigned...
      [button for draw] [~hidden undraw button~]

      Send adress of this board to your email
      [email]
    </Layout>
  );
}

export default BoardPage
