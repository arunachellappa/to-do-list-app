import { useState } from "react";
import "./App.css";
import ToDoItems from "./ToDoItems";
import InputArea from "./InputArea";
import { useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3001/notes";
  const [list, setList] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //getting the input content i.e., items that are to be adding

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received");
        const items = await response.json();
        setList(items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000);
  }, []);
  //adding new items from input to list array
  const handleAddItems = async (itemText) => {
    if (itemText.trim() === "") return; // Prevent empty entries

    const newItem = { text: itemText };


    const postOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    };
   const result = await apiRequest(API_URL, postOption);
if (!result) {
  const response = await fetch(API_URL);
  const updatedList = await response.json();
  setList(updatedList);
}
  };

const handleEditItems = async (id, newText) => {
  const updatedItem = { text: newText };
  const updateOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedItem),
  };
  const reqUrl = `${API_URL}/${id}`;
  const result = await apiRequest(reqUrl, updateOptions);

  if (!result) {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      )
    );
  } else {
    setFetchError(result);
  }
};
  const deleteItems = async (id) => {
    setList((prevList) => {
      return prevList.filter((item) => {
        return item.id !== id;
      }); 
    });
    const deleteOptions ={method: 'DELETE'}
    const reqUrl = `${API_URL}/${id}`
    const result =await apiRequest(reqUrl,deleteOptions)
    if (result) setFetchError(result)
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea add={handleAddItems} />

      <div>
        {isLoading && <p>Loading Notes...</p>}
        {fetchError && <p>{`Error:${fetchError}`}</p>}
        {!isLoading && !fetchError && (
          <ul>
            {list.map((listItems) => (
              <ToDoItems
                key={listItems.id}
                id={listItems.id}
                text={listItems.text}
                onChecked={deleteItems}
                onEdit={handleEditItems}

              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

//CHALLENGE: Make this app work by applying what you've learnt.
//1. When new text is written into the input, its state should be saved.
//2. When the add button is pressed, the current data in the input should be
//added to an array.
//3. The <ul> should display all the array items as <li>s
