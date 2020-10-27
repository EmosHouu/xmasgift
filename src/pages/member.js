import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from  "../components/error"
import { getBoardDetails, getUser } from '../services/board'

const MemberPage = ({location}) => {
  const [boardName, setBoardName] = useState('');
  const [drawName, setDrawName] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDraw, setIsDraw] = useState(true);
  const [error, setError] = useState(false);
  const lidMatch = location.search.match(/lid=([^&]*)/);
  const uidMatch = location.search.match(/uid=([^&]*)/);

  useEffect(() => {
    getBoardDetails(lid)
    .then((details) => {
      setBoardName(details.name);
      setIsDraw(details.isDraw);
    })
    .then(() => getUser(lid,uid))
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
  }, []);

  if(!lidMatch || !uidMatch || error) return <Error />
  const lid = lidMatch[1];
  const uid = uidMatch[1];

  if(isPageLoading) return null;
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
