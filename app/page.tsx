"use client"

const AddHabitForm = () => {
  function AddNewHabit() {
    // TODO
    throw new Error("Not implemented.")
  }

  return (
    <div className="flex flex-col gap-3 w-1/4 text-center bg-amber-300">
      <label htmlFor="add-habit">Add new habit:</label>
      <input id="add-habit" placeholder="Enter the name of the habit: "/>
      <button type="submit" value={"Submit"} onSubmit={() => AddNewHabit()} className="cursor-pointer">Submit</button>
    </div>
  )
}


export default function Home() {
  return (
    <div>
      <h1 className="text-2xl">Sprinter</h1>
      <p>Habit tracker made easy!</p>
      <AddHabitForm />
    </div>
  );
}
