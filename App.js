import React,{useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App() {
  const [isCompleteScreen,setIsCompleteScreen] = useState(false);  /* False means we are on the todo page, and true means on the completed page*/
  const [allTodos,setTodos] = useState([]);
  const [newTitle,setNewTitle] = useState(""); /*what ever user writing will store here. (Initially empty string) */  
  const [newDescription,setNewDescription] = useState("");
  const [completedTodos,setcompletedTodos] = useState([]);

  const handleAddTodo = ()=> {
    let newTodoItem = {
      title:newTitle,
      description:newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);

    // Clear the input fields after adding a todo
    setNewTitle("");
    setNewDescription("");

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))  /*Save the array as string. Not as an object. */
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];  /* Having a copy */
    reducedTodo.splice(index, 1); /* splice method use to remove items which is related to some index */

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));   /* Remove from local storage */
    setTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1 ;  /* index start from 0. Therefore increment by 1, to get real world month start from 1 */
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy +  ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setcompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);    /* Remove completed items from Todo */
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))  /*Save the array as string. Not as an object. */
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];  
    reducedTodo.splice(index, 1); 
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));   /* Remove from local storage */
    setcompletedTodos(reducedTodo);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))    /* JSON.parse is used to convert the local storage data into an array */
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'))    /* JSON.parse is used to convert the local storage data into an array */
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setcompletedTodos(savedCompletedTodo);

    }
  },[])

  return (
    <div className="App">
      <h1> My ToDos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">

          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What is the task title?"/>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What is the task description?"/>
          </div>

          <div className="todo-input-item">
           <button type="button" onClick={handleAddTodo} className="addBtn">Add</button>
          </div>
        </div>

        <div className="btnArea">
          <button
            className={`secondaryBtn ${isCompleteScreen === false ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}   /* If the isCompleteScreen is false, the condition on the left side of ? is true. It means it's active.*/
          >
           ToDo
         </button>
         {/*If isCompleteScreen is not false, the condition is false */}
         {/* When the condition is false, in the ternary expression, it uses the value on the right side of :. In this case, it's an empty string ''. */} 
                
          <button
            className={`secondaryBtn ${isCompleteScreen === true ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
             Completed
          </button>


          </div>

          <div className="todo-list">
            {isCompleteScreen === false && allTodos.map((item,index)=>{
              return(
                <div className="todo-list-item" key={index}>
                 
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <AiOutlineDelete 
                    className="icon"  
                    onClick={()=>handleDeleteTodo(index)} 
                    title="Delete?" 
                    />    {/* With this index, will be deleting item in todo. */}
                    
                    <BsCheckLg 
                    className="checkIcon" 
                    onClick={()=>handleComplete(index)} 
                    title="Complete?" />
                  </div>

                </div>
              );
              })
            }

            {isCompleteScreen === true && completedTodos.map((item,index)=>{
              return(
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p><small>Completed on:{item.completedOn}</small></p>
                  </div>

                  <div>
                    <AiOutlineDelete 
                    className="icon"  
                    onClick={()=>handleDeleteCompletedTodo(index)} 
                    title="Delete?" 
                    />    {/* With this index, will be deleting item in todo. */}
                  </div>

                </div>
              );
              })
            }

        </div>

      </div>
    </div>
  );
}

export default App;
