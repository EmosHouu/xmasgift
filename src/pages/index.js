import React, { useState }  from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loading from  "../components/Loading"
import { createBoard } from '../services/board';

const IndexPage = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInstruction, setIsInstruction] = useState(true);

  const onCreateBoard = () => {
    setIsLoading(true);
    createBoard(name)
    .then((id) => navigate('/board?lid='+id))
    .catch(() => setIsLoading(false));
  }

  const onInstructionClick = () => {
    setIsInstruction(!isInstruction);
  }

  if(isLoading) return <Loading />

  return ( <Layout>
    <SEO title="Home" />
    <form onSubmit={(e) => {e.preventDefault(); name !== '' && onCreateBoard()}}>
      <h1>Christmas draw</h1>
      <input placeholder="Title" value={name} onChange={(e) => setName(e.target.value)} />
      <button className={name ? '' : 'create-btn-hide'} disabled={name === ''} type="submit">Continue</button>
    </form>
    <button onClick={onInstructionClick}>
    How it works?
    </button>
    <div className={`instruction-view ${isInstruction ? 'instruction-show' : ''}`}>
    <li>You are creating members list and send address for everyone to sign in.</li>
    <li>After draw each member has to buy a gift to picked person. </li>
    <li>Rest rules are yours, how many money you want to spend and so on...</li></div>
  </Layout>);
}

export default IndexPage
