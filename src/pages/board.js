import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from '../components/Error'
import Loading from  "../components/Loading"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useIntl } from "gatsby-plugin-intl"
import {
  faUserTimes,
} from '@fortawesome/free-solid-svg-icons'
import { getList, removeUser, draw, undraw } from '../services/board';

const BoardPage = ({ location }) => {
  const intl = useIntl();
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
    footer={<div>{intl.formatMessage({ id: "b_bookmark" })}</div>}>
      <SEO title={intl.formatMessage({ id: "board" })} />
      <h1 className="break-word">{boardName}</h1>
      {!isDraw &&
        <div className="copyWrapper">
          <div>{intl.formatMessage({ id: "b_send_santa" })}</div>
          <CopyToClipboard text={origin +'/' + intl.locale + '/new-member'+ location.search}><button onClick={onCopy} className="copy-link">{origin +'/'+ intl.locale + '/new-member'+ location.search}</button></CopyToClipboard>
          <div className="copy-info">
            {isCopied && <span>{intl.formatMessage({ id: "b_copied" })}</span>}
            {!isCopied && <span>{intl.formatMessage({ id: "b_copy" })}</span>}
          </div>
        </div>  }
        <hr />
        { userList.length === 0 && <div>{intl.formatMessage({ id: "b_none" })}</div>}
      {userList.map((user, index) => (
        <div key={user.userId + user.name}>
        {!isDraw && <button aria-label="remove-button" className="remove-button" onClick={() => onRemoveUser(user.userId)}><FontAwesomeIcon icon={faUserTimes} size="1x"/></button>}
        <span className="break-word">{user.name}</span>
        {user.draw}
        </div>
      ))}
      {userList.length > 1 && !isDraw && <button onClick={onDraw}>{intl.formatMessage({ id: "b_draw" })}</button>  }
      {userList.length > 1 && isDraw && <button onClick={onUnDraw}>{intl.formatMessage({ id: "b_undraw" })}</button> }
    </Layout>
  );
}

export default BoardPage
