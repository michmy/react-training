import React, { Fragment, useState } from "react"
import VisuallyHidden from "@reach/visually-hidden"
import { FaDumbbell } from "react-icons/fa"
import { DateFields, MonthField, DayField, YearField } from "app/DateFields"
// import SignupForm from "./SignupForm.final"
// export default SignupForm

const TabButton = ({ children }) => (
  <button className="TabsButton icon_button cta" type="submit">
    {children}
  </button>
)

const TextInput = ({ label, type = "text" }) => (
  <div>
    <input type={type} placeholder={label} required={true} />
  </div>
)

export default function SignupForm() {
  return (
    <form className="SignupForm">
      <TextInput label="Display name" />
      <TextInput label="Avatar URL" />
      <TextInput label="Email" />
      <TextInput label="Password" />
      <label>Start: </label>
      <DateFields value={new Date()}>
        <MonthField />
        <DayField />
        <YearField start={2019} end={2020} />
      </DateFields>
      <TabButton>
        <FaDumbbell /> Sign up
      </TabButton>
    </form>
  )
}
