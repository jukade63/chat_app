import React, { useRef } from 'react'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Conversation from '../components/Conversation'
import Chat from '../components/Chat'
import { io } from 'socket.io-client'

function Home() {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(null)
  const [conversations, setConversations] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const socket = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.senderId &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit('addUser', currentUser?.id)
    socket.current.on('getUsers', (users) => {
      console.log(users)
    })
  }, [currentUser])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    } else {
      setCurrentUser(jwtDecode(token))
    }
  }, [])

  useEffect(() => {
    const fetchConversations = async () => {
      if (currentUser) {
        const { data } = await axios.get(
          'http://localhost:8000/conversation/' + currentUser.id
        )
        setConversations(data)
      }
    }

    fetchConversations()
  }, [currentUser])

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8000/message/' + currentChat?.id
        )
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
  }, [currentChat])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const message = {
      senderId: currentUser.id,
      text: newMessage,
      conversationId: currentChat.id,
    }

    socket.current.emit('sendMessage', {
      senderId: currentUser?.id,
      receiverId: currentChat?.receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post('http://localhost:8000/message', message)
      setMessages([...messages, res.data])
      setNewMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }, [messages])

  return (
    <div
      className='d-flex flex-column justify-content-between mx-auto'
      style={{ maxWidth: '750px' }}
    >
      <h1 className='text-center m-2 border-bottom mb-2 py-3'>Private Chat</h1>
      <div className='d-flex m-3'>
        <div className='contacts border-end me-3'>
          <h4>Contacts</h4>
          {conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)} className='current-contact'>
              <Conversation
                conversation={c}
                currentUser={currentUser}
                key={c.id}
              />
            </div>
          ))}
        </div>
        <div className='flex-grow-1'>
          {messages.map((m) => {
            return (
              <div ref={scrollRef}>
                <Chat
                  message={m}
                  own={m.senderId === currentUser.id}
                  key={m.id}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='d-flex justify-content-end mb-5'>
        <form className='d-flex' onSubmit={handleSendMessage}>
          <div className='form-group'>
            <textarea
              style={{ resize: 'none' }}
              className='form-control'
              rows='2'
              cols='50'
              placeholder='write a message...'
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>
          <button className='btn btn-primary ms-1'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Home
