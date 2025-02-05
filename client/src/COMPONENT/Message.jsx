import { useState, useEffect } from "react";

export function Message() {
    const [formValues, setFormValues] = useState({
     messages:""
    });


    function handleSubmit(event) {
        event.preventDefault();
        console.log("The form values are", formValues);
    
        fetch("https://week7-assignment-f9xv.onrender.com/new-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
        console.log(formValues);
      }

      
  function handleInputChange(event) {
    setFormValues({
  
      ...formValues,
      [event.target.name]: event.target.value, 
    });
  }

  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://week7-assignment-f9xv.onrender.com/messages");
        const data = await response.json();
        console.log("data fetched successfully!");

        setItems(data);
      } catch {
        console.log(" Failed to fetch items!");
      }
    }
    fetchData();
  }, []);

  return(
<>
    <form onSubmit={handleSubmit}>
    <label htmlFor="messages">Messages: </label>
            <input
               type="text" name="messages" id="messages"
               placeholder="Write here..."
               required
              //
              value={formValues.messages}
              onChange={handleInputChange}
            />

<button type="submit">Submit</button>
    </form>
  

  <div className="datadiv">
          <h6>data fetched:</h6>

          {items.length === 0 ? (
            <p>loading data ...</p>
          ) : (
            items.map((item) => (
              <li  key={item.id} className="data">
         
                <ul>{item.messages}</ul>
              </li>
            ))
          )}
        </div>
</>
  );
}