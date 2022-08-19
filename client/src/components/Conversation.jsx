import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

function Conversation({ conversation, currentUser }) {
  const [contact, setContact] = useState(null)
  useEffect(() => {
    const friendId =
      conversation.senderId === currentUser.id
        ? conversation.receiverId
        : conversation.senderId

    const getUser = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:8000/user/' + friendId
        )
        setContact(data)
      } catch (error) {
        console.log(error)
      }
    }

    getUser()
  }, [currentUser, conversation])
  return (
    <div className='p-1'>
      <img src={contact?.pic} alt='picture' />
      <span className='ms-1'>{contact?.name}</span>
    </div>
  )
}

export default Conversation
