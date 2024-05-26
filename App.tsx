import React, { useReducer, useState } from 'react';
import './App.css';

// Define action types
const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';

// Define state interface
interface State {
  job: string;
  jobs: string[];
}

// Define action interface
interface Action {
  type: string;
  payload: any;
}

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_JOB:
      return { ...state, job: action.payload };
    case ADD_JOB:
      return { ...state, jobs: [...state.jobs, action.payload], job: "" };
    case DELETE_JOB:
      return { ...state, jobs: state.jobs.filter((_, index) => index !== action.payload) };
    default:
      return state;
  }
};

// App component
function App() {
  const [state, dispatch] = useReducer(reducer, { job: "", jobs: [] });
  const [inputText, setInputText] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleAddJob = () => {
    dispatch({ type: ADD_JOB, payload: inputText });
  };

  const handleDeleteJob = (index: number) => {
    dispatch({ type: DELETE_JOB, payload: index });
  };

  return (
    <div className="App">
      <h3>Todo1 ...</h3>
      <h1>Lê Quang Vinh</h1>
      <input type="text" placeholder='Enter todo...' value={inputText} onChange={handleInputChange} />
      <button onClick={handleAddJob}>Add</button>
      <ul>
        {state.jobs.map((job, index) => (
          <li key={index}>
            {job}
            <button onClick={() => handleDeleteJob(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
