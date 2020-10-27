import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Error from '../components/Error'
import { getList, removeUser, draw, undraw } from '../services/board';

const BoardPage = ({ location }) => {
  const [boardName, setBoardName] = useState('');
  const [userList, setUserList] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()  =>  {
    //eslint-disable-next-line react-hooks/exhaustive-deps
    getList(lid)
    .then((data) => {
      setBoardName(data.boardName);
      setUserList(data.users);
      if(data.isDraw) {
        setIsDraw(data.isDraw);
      }
    })
    .catch(() => {
      setError(true);
    }).
    finally(() => {
      setIsLoading(false);
    })
  }, []);

  const lidMatch = location.search.match(/lid=([^&]*)/);

  if(!lidMatch) return <Error />
  const lid = lidMatch[1];

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

  if(isLoading) return null;
  if(error) return <Error />

  return (
    <Layout>
      <SEO title="Board" />
      <h1>{boardName}</h1>
      Send this link to everybody
      <Link to={"/new-member" + location.search}>{origin + '/new-member'+ location.search}</Link> [Clipboard]
      <br/>
      {userList.map((user, index) => (
        <div key={user.userId}>
        {user.name}
        {!isDraw && <button onClick={() => onRemoveUser(user.userId)}>remove</button>}
        {user.draw}
        </div>
      ))}
      {userList.length > 1 &&
      !isDraw && <button onClick={onDraw}>draw</button> ||
      isDraw && <button onClick={onUnDraw}>undraw</button>
      }
      <br/>
      Bookmark this page to have access to board
    </Layout>
  );
}

export default BoardPage
