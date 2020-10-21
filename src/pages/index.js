import React, { useState }  from "react"

import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { createBoard } from '../services/board';

const IndexPage = () => {
  const [name, setName] = useState('');

  const onCreateBoard = () => {
    createBoard()
      .then((id) => navigate('/board/'+id));
  }

  return ( <Layout>
    <SEO title="Home" />
    {name}
    <input placeholder="Name your gift's hat" value={name} onChange={(e) => setName(e.target.value)} />
    <button disabled={name === ''} onClick={onCreateBoard}>Create your hat</button>
  </Layout>);
}

export default IndexPage
