import { useState } from "react";

function InputArea(props) {
  const [items, setItems] = useState("");

  function updateItem(event) {
    setItems(event.target.value);
  }
  return (
    <div className="form">
      <input onChange={updateItem} name="content" type="text" value={items} />
      <button
        onClick={() => {
          props.add(items);
          setItems("");
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
