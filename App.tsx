import React, { useReducer, useState, ChangeEvent, MouseEvent } from 'react';
import './App.css';

// Định nghĩa kiểu cho trạng thái và hành động
interface State {
  job: string;
  jobs: string[];
}

interface Action {
  type: string;
  payload?: any;
}

const initState: State = {
  job: '',
  jobs: []
}

const SET_JOB = 'set_job';
const ADD_JOB = 'add_job';
const DELETE_JOB = 'delete_job';

const reducer = (state: State, action: Action): State => {
  console.log('Action:', action);
  console.log('Prev state:', state);

  let newState;

  switch (action.type) {
    case SET_JOB:
      newState = {
        ...state,
        job: action.payload
      };
      break;
    case ADD_JOB:
      newState = {
        ...state,
        jobs: [...state.jobs, state.job],
        job: ''
      };
      break;
    case DELETE_JOB:
      newState = {
        ...state,
        jobs: state.jobs.filter((_, index) => index !== action.payload)
      };
      break;
    default:
      throw new Error('Unknown action type');
  }

  console.log('New state:', newState);
  return newState;
};


function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_JOB, payload: e.target.value });
  };

  const handleAddJob = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: ADD_JOB });
  };

  const handleDeleteJob = (index: number) => {
    dispatch({ type: DELETE_JOB, payload: index });
  };

  return (
    <div className="App">
      <h3>Todo1 ...</h3>
      <h1>Lê Quang Vinh</h1>
      <input style={{height:"25px",borderRadius:"20px",fontSize:"20px",padding:"5px"}}
        type="text"
        placeholder="Enter todo..."
        value={job}
        onChange={handleChange}
      />
      <button style={{height:"38px",borderRadius:"20px",fontSize:"20px",width:"100px"}} onClick={handleAddJob}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li style={{fontSize:"30px"}} key={index}>
            {job}
            <button style={{height:"38px",borderRadius:"20px",fontSize:"20px",width:"100px"}} onClick={() => handleDeleteJob(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
