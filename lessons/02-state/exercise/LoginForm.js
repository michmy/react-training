import React, { useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaSignInAlt } from "react-icons/fa"
import TabsButton from "app/TabsButton"
import { login } from "app/utils"

// import LoginFormFinal from './LoginForm.final'
// export default LoginFormFinal

export default function LoginForm() {
  const [{ error, isLoading, isPasswordVisible }, setState] = useState({
    error: null,
    isLoading: false,
    isPasswordVisible: false
  })
  
  const handleLogin = async evt => {
    evt.preventDefault()

    const [emailNode, passwordNode] = evt.target.elements
    const email = emailNode.value
    const password = passwordNode.value
    if (email.length > 0 && password.length > 0) {
      setState({ isLoading: true })
      try {
        await login(email, password)
      } catch (error) {
        // error
        setState({ error: error.message, isLoading: false })
      }
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <VisuallyHidden>
        <label htmlFor="login:email">Email:</label>
      </VisuallyHidden>
      <input
        type="text"
        id="login:email"
        className="inputField"
        placeholder="you@example.com"
      />

      <VisuallyHidden>
        <label htmlFor="login:password">Password:</label>
      </VisuallyHidden>
      <input
        id="login:password"
        type={!isPasswordVisible ? "password" : "text"}
        className="inputField"
        placeholder="Password"
      />

      <div>
        <label>
          <input
            className="passwordCheckbox"
            type="checkbox"
            defaultChecked={false}
            onChange={() => {
              setState({ isPasswordVisible: !isPasswordVisible })
            }}
          />{" "}
          show password
        </label>
      </div>

      <TabsButton>
        <FaSignInAlt />
        <span>{isLoading ? "Please wait..." : "Login"}</span>
      </TabsButton>
      {error && (
        <div style={{ color: "tomato", marginTop: "16px" }}>{error}</div>
      )}
    </form>
  )
}
