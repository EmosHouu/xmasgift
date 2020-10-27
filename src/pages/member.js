import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from  "../components/Error"
import { getBoardDetails, getUser } from '../services/board'

const MemberPage = ({location}) => {
  const [boardName, setBoardName] = useState('');
  const [drawName, setDrawName] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDraw, setIsDraw] = useState(true);
  const [error, setError] = useState(false);
  const [lid, setLid] = useState();
  const [uid, setUid] = useState();

  useEffect(() => {
    const lidMatch = location.search.match(/lid=([^&]*)/);
    const uidMatch = location.search.match(/uid=([^&]*)/);
    if(uidMatch && lidMatch) {
      setLid(lidMatch[1]);
      setUid(uidMatch[1]);
      console.log(lidMatch[1])
      getBoardDetails(lidMatch[1])
      .then((details) => {
        setBoardName(details.name);
        setIsDraw(details.isDraw);
      })
      .then(() => getUser(lidMatch[1],uidMatch[1]))
      .then((user) => {
        if(user.draw) {
          setDrawName(user.draw);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(()=> {
        setIsPageLoading(false);
      })
    }

  }, [location]);

  if(isPageLoading) return null;
  if(!lid || !uid || error) return <Error />
  if(isDraw && !drawName) return <div>You miss it. Already draw.</div>

  return (
  <Layout>
    <SEO title="Member"/>
    <h1>{boardName}</h1>
    {!drawName && <div>waiting for rest people...</div>}
    {drawName && <div>you match {drawName}</div>}

    Bookmark this page to have access to board
  </Layout>);
}

export default MemberPage
