import React, { useState, useEffect, useRef } from "react"
import { FaDumbbell } from "react-icons/fa"

import { useAppState } from "app/app-state"
import { formatDate, DATE_FORMAT } from "app/utils"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const MAX_MESSAGE_LENGTH = 200

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState()

  const key = makeNewPostKey(date)
  const initialMsg = getLocalStorageValue(key) || ""
  const [message, setMessage] = useState(initialMsg)
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH

  const messageRef = useRef()

  function handleMessageChange(event) {
    setMessage(event.target.value)
  }

  useEffect(() => {
    if (takeFocus) {
      messageRef.current.focus()
    }
  }, [message, takeFocus])

  useEffect(() => {
    setLocalStorage(key, message)
  }, [key, message])

  return (
    <div className={"NewPost" + (messageTooLong ? " NewPost_error" : "")}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          className="NewPost_input"
          onChange={handleMessageChange}
          onFocus={e => {
            const val = e.target.value
            e.target.value = ""
            e.target.value = val
          }}
          placeholder="Tell us about your workout!"
          ref={messageRef}
          value={message}
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={setMessage} />
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function makeNewPostKey(date) {
  return `newPost:${formatDate(date, DATE_FORMAT)}`
}

function getLocalStorageValue(key) {
  const value = localStorage.getItem(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch (e) {
    return null
  }
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
