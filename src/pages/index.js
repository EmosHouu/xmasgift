import React, { useState }  from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { createBoard } from '../services/board';

const IndexPage = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onCreateBoard = () => {
    setIsLoading(true);
    createBoard(name)
    .then((id) => navigate('/board?lid='+id))
    .catch(() => setIsLoading(false));
  }

  if(isLoading) return <div>is loading...</div>;

  return ( <Layout>
    <SEO title="Home" />
    <form onSubmit={(e) => {e.preventDefault(); name !== '' && onCreateBoard()}}>
      <input placeholder="Your christmas roulette" value={name} onChange={(e) => setName(e.target.value)} />
      {name && <button disabled={name === ''} type="submit">Create</button> }
    </form>
  </Layout>);
}

export default IndexPage
