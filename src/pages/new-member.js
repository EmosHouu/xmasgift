import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from  "../components/error"
import { getBoardDetails, addUser } from '../services/board';

const NewMemberPage = ({ location }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [boardName, setBoardName] = useState('');
  const [name, setName] = useState('');
  const [isDraw, setIsDraw] = useState('');
  const [error, setError] = useState(false);
  const lidMatch = location.search.match(/lid=([^&]*)/);

  //TODO: getBoardDetails with isDraw functionality
  useEffect(() => {
    getBoardDetails(lid)
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
  }, []);

  const onAddUser = () => {
    setIsLoading(true);
    addUser(lid, name)
    .then((uid) => navigate('/member?lid='+lid+'&uid='+uid))
    .catch(() => setIsDraw(true))
    .finally(() => setIsLoading(false))
  }

  if(isLoading) return <div>is loading...</div>;
  if(!lidMatch || error) return <Error />;
  if(isDraw) return <div>You cannot join. Already draw.</div>
  const lid = lidMatch[1];
  if(isPageLoading) return null;

  return (<Layout>
    <SEO title="New Member" />
    <h1>{boardName}</h1>
    <form onSubmit={(e) => {e.preventDefault(); name !== '' && onAddUser()}}>
      <input placeholder="your name" value={name} onChange={(e) => setName(e.target.value) } />
      <button disabled={name === ''} type="submit">Add yourself</button>
    </form>
  </Layout>
)}


export default NewMemberPage
