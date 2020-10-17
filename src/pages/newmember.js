import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const NewMemberPage = () => (
  <Layout>
    <SEO title="New Member" />
    board name
    your name
    addition information
    <Link to="/member/?hash">Add yourself</Link>
  </Layout>
)


export default NewMemberPage
