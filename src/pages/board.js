import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from '../components/Error'
import { getList, removeUser, draw, undraw } from '../services/board';

const BoardPage = ({ location }) => {
  const [boardName, setBoardName] = useState('');
  const [userList, setUserList] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [error, setError] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [lid, setLid] = useState();

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

  if(isPageLoading) return null;
  if(!lid || error) return <Error />

  return (
    <Layout
    footer={<div>Bookmark this page to have access to board</div>}>
      <SEO title="Board" />
      <h1>{boardName}</h1>
      {!isDraw && <div>Send this link to everybody
      <Link to={"/new-member" + location.search}>{origin + '/new-member'+ location.search}</Link> [Clipboard]</div>  }
      {userList.map((user, index) => (
        <div key={user.userId + user.name}>
        {user.name}
        {!isDraw && <button className="remove-button" onClick={() => onRemoveUser(user.userId)}>remove</button>}
        {user.draw}
        </div>
      ))}
      {userList.length > 1 && !isDraw && <button onClick={onDraw}>draw</button>  }
      {userList.length > 1 && isDraw && <button onClick={onUnDraw}>undraw</button> }
    </Layout>
  );
}

export default BoardPage
