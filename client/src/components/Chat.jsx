import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { format } from 'timeago.js'

function Chat({ message, own }) {
  // console.log(own)
  return (
    <div className={own ? '' : 'd-flex justify-content-start'}>
      <div className='d-flex flex-column align-items-end'>
        <div
          className={`message m-0 d-flex justify-content-between pe-2 ${
            own ? 'own' : ''
          }`}
        >
          <div className='d-flex align-items-center'>{message.text}</div>
          <img
            src='https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
            alt='msg-photo'
          />
        </div>
        <p className='text-muted sent-time'>{format(message.createdAt)}</p>
      </div>
    </div>
  )
}

export default Chat
