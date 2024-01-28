import React, { useState } from 'react'

export const WaitingRoom = ({ joinChatRoom }) => {
    const [username, setUsername] = useState();
    const [chatroom, setChatroom] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        joinChatRoom(username, chatroom);
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input type="text" placeholder="chatroom" onChange={e => setChatroom(e.target.value)} />
        <button type="submit">Join</button>
    </form>
  )
}
