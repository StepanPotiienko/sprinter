"use client"

import './styles/page.css'

const AddHabitForm = () => {
  function AddNewHabit() {
    // TODO
    throw new Error("Not implemented.")
  }

  return (
    <div className="flex flex-col gap-3 w-1/4 text-center bg-gradient-to-br from-yellow-400 to-red-500 rounded-4xl p-3" id="new-habit-form">
      <label htmlFor="add-habit">Add new habit:</label>
      <input id="add-habit" placeholder="Enter the name of the habit: "/>
      <button type="submit" value={"Submit"} onSubmit={() => AddNewHabit()} className="cursor-pointer hover:underline">Submit</button>
    </div>
  )
}


export default function Home() {
  return (
    <div className='w-[100vw] h-[80vh] flex justify-center items-center flex-col'>
      <h1 className="text-4xl" style={{textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)"}}>Sprinter</h1>
      <h2 className='text-xl'>Habit tracker made easy!</h2>
      <div className='w-[100vw] h-[30vh] flex justify-center align-middle items-center'>
        <AddHabitForm />
      </div>
    </div>
  );
}
