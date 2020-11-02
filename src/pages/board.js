import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from '../components/Error'
import Loading from  "../components/Loading"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons'
import { getList, removeUser, draw, undraw } from '../services/board';

const BoardPage = ({ location }) => {
  const [boardName, setBoardName] = useState('');
  const [userList, setUserList] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [error, setError] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [lid, setLid] = useState();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(()  =>  {
    const lidMatch = location.search.match(/lid=([^&]*)/);
    if(lidMatch) {
      setLid(lidMatch[1])
      getList(lidMatch[1])
      .then((data) => {
        setBoardName(data.boardName);
        setUserList(data.users);
        if(data.isDraw) {
          setIsDraw(data.isDraw);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsPageLoading(false);
      })
    }
  }, [location]);

  const onRemoveUser = (userId) => {
    removeUser(lid, userId)
    .then(()=> {
      const newUserList = userList.filter((user) => user.userId !==  userId);
      setUserList(newUserList);
    })
  }

  const onDraw = () => {
    draw(lid)
    .then(() => setIsDraw(true));
  }

  const onUnDraw = () => {
    undraw(lid)
    .then(() => setIsDraw(false));
  }

  const onCopy = () => {
    setIsCopied(true);
    setInterval(() => {
      setIsCopied(false);
    }, 2000)
  }

  if(isPageLoading) return <Loading />
  if(!lid || error) return <Error />

  return (
    <Layout
    footer={<div>Bookmark this page to have access to board</div>}>
      <SEO title="Board" />
      <h1 className="break-word">{boardName}</h1>
      {!isDraw &&
        <div className="copyWrapper">
          <div>Send Santa address to every kind people, including you (if you was kind this year)</div>
          <CopyToClipboard text={origin + '/new-member'+ location.search}><button onClick={onCopy} className="copy-link">{origin + '/new-member'+ location.search}</button></CopyToClipboard>
          <div className="copy-info">
            {isCopied && <span>Copied to clipboard</span>}
            {!isCopied && <span>Click to copy</span>}
          </div>
        </div>  }
        <hr />
        { userList.length === 0 && <div> Nobody is signed yet.</div>}
      {userList.map((user, index) => (
        <div key={user.userId + user.name}>
        {!isDraw && <button className="remove-button" onClick={() => onRemoveUser(user.userId)}><FontAwesomeIcon icon={faUserTimes} size="1x"/></button>}
        <span className="break-word">{user.name}</span>
        {user.draw}
        </div>
      ))}
      {userList.length > 1 && !isDraw && <button onClick={onDraw}>draw</button>  }
      {userList.length > 1 && isDraw && <button onClick={onUnDraw}>undraw</button> }
    </Layout>
  );
}

export default BoardPage
