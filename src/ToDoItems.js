import { useState } from "react";

function ToDoItems({ id, text, onChecked, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => {
    onEdit(id, editedText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="form"
          />
          <button onClick={handleSaveClick} className="edit" >Save</button>
        </>
      ) : (
        <>
          <span>{text}</span>
          <button onClick={handleEditClick} className="edit">Edit</button>
          <button onClick={() => onChecked(id)} className="edit">Delete</button>
        </>
      )}
    </li>
  );
}

export default ToDoItems;
