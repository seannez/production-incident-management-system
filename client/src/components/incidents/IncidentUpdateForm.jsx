// Placeholder for incident update form component.

import { useState } from "react";

export default function IncdentUpdateForm({onCreateUpdate}){
    const [message, setMessage] = useState("")

    async function handleSubmit(event){
        event.preventDefault()

        if(!message.trim()){
            return;
        }

        await onCreateUpdate({message,})
        setMessage("")
    }


    return (
        //When clicking submit: calls handleSubmit which calls onCreateUpdate
        //which is passed as prop
    <form className="incident-update-form" onSubmit={handleSubmit}>
      <textarea
        className="incident-update-input"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Add incident update..."
      />

      <button className="incident-update-button" type="submit">
        + Add Update
      </button>
    </form>
  );
}
