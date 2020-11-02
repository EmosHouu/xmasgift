import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from  "../components/Error"
import { getBoardDetails, addUser } from '../services/board';

const NewMemberPage = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [boardName, setBoardName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isDraw, setIsDraw] = useState('');
  const [error, setError] = useState(false);
  const [lid, setLid] = useState();
  const [textAreaLines, setTextAreaLines] = useState(2);

  //TODO: getBoardDetails with isDraw functionality
  useEffect(() => {
    const lidMatch = location.search.match(/lid=([^&]*)/);
    if(lidMatch) {
      setLid(lidMatch[1])
      getBoardDetails(lidMatch[1])
      .then((details) => {
        setBoardName(details.name);
        setIsDraw(details.isDraw);
      })
      .catch(() => {
        setError(true);
      })
      .finally(()=> {
        setIsPageLoading(false);
      });
    }
  }, [location]);

  const onAddUser = () => {
    setIsLoading(true);
    addUser(lid, name, description)
    .then((uid) => navigate('/member?lid='+lid+'&uid='+uid))
    .catch(() => {
      setIsDraw(true);
      setIsLoading(false);
    })
  }

  const onSetDescription = (value) => {
    const countLine = (value.match(/\n/g) || []).length;
    if(countLine >= 1) {
      setTextAreaLines(countLine + 1);
    }
    setDescription(value);
  }

  if(isPageLoading) return null;
  if(isDraw) return <div>You cannot join. Already draw.</div>
  if(!lid || error) return <Error />;
  if(isLoading) return <div>is loading...</div>;

  return (<Layout>
    <SEO title="New Member" />
    <h1>{boardName}</h1>
    <form onSubmit={(e) => {e.preventDefault(); name !== '' && onAddUser()}}>
      <input placeholder="Your name." value={name} onChange={(e) => setName(e.target.value) } />
      <textarea
        type="text"
        rows={textAreaLines}
        placeholder="Dear Santa, I want to have..."
        value={description}
        onChange={(e) => onSetDescription(e.target.value) } />
      {name && <button disabled={name === ''} type="submit">Send letter</button>}
    </form>
  </Layout>
)}


export default NewMemberPage
