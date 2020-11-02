import React, { useState }  from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loading from  "../components/Loading"
import { createBoard } from '../services/board'
import { useIntl, navigate } from "gatsby-plugin-intl"

const IndexPage = () => {
  const intl = useIntl();
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
    <SEO title={intl.formatMessage({ id: "home" })} />
    <form onSubmit={(e) => {e.preventDefault(); name !== '' && onCreateBoard()}}>
      <h1>{intl.formatMessage({ id: "christmas_draw" })}</h1>
      <input placeholder={intl.formatMessage({ id: "title" })} value={name} onChange={(e) => setName(e.target.value)} />
      <button className={name ? '' : 'create-btn-hide'} disabled={name === ''} type="submit">{intl.formatMessage({ id: "continue" })}</button>
    </form>
    <button onClick={onInstructionClick}>
    {intl.formatMessage({ id: "how_it_works" })}
    </button>
    <div className={`instruction-view ${isInstruction ? 'instruction-show' : ''}`}>
    <li>{intl.formatMessage({ id: "rule1" })}</li>
    <li>{intl.formatMessage({ id: "rule2" })}</li>
    <li>{intl.formatMessage({ id: "rule3" })}</li></div>
  </Layout>);
}

export default IndexPage
