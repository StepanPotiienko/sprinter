"use client"

import { useState } from "react";
import './styles/page.css'

import { NotesList } from "./components/notes"; 


const AddHabitForm = () => {
  const [habitNames, setHabitNames] = useState<string[]>([])
  const [currentHabit, setCurrentHabit] = useState("")

  function AddNewHabit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!currentHabit.trim()) {
      return
    }
    
    console.log(`Adding new habit: ${currentHabit}`)
    setHabitNames(prev => [...prev, currentHabit])
    setCurrentHabit("")
    console.log(habitNames)
  }

  return (
    <div className="w-1/4 text-center bg-gradient-to-br from-yellow-400 to-red-500 rounded-4xl p-3" id="new-habit-form">
      <form onSubmit={AddNewHabit} className="flex flex-col gap-3">
        <label htmlFor="add-habit">Add new habit:</label>
        <input 
          id="add-habit"
          name="add-habit"
          value={currentHabit}
          onChange={(e) => setCurrentHabit(e.target.value)}
          placeholder="Enter the name of the habit: "
        />
        <button type="submit" className="cursor-pointer hover:underline">
          Submit
        </button>
      </form>
    </div>
  )
}

export default function Home() {
  return (
    <div className='w-full h-full flex justify-center items-center flex-col'>
      <h1 className="text-4xl" style={{textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)"}}>Sprinter</h1>
      <h2 className='text-xl'>Habit tracker made easy!</h2>
      <div className='w-[100vw] h-[30vh] flex justify-center align-middle items-center'>
        <AddHabitForm />
      </div>
      <hr className="w-3/4" />
      <div>
        <NotesList />
      </div>
    </div>
  );
}
