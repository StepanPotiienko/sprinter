"use client"

import { useState } from "react";
import './styles/page.css'

import { NotesGrid } from './components/notes'

interface Habit {
  name: string;
  type: string;
}

const HabitCard = ({ name, type }: Habit) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{type}</p>
    </div>
  );
};

const HabitsList = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="w-full mt-4 p-4">
      <h3 className="text-xl font-bold mb-2">Current Habits:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {habits.map((habit, index) => (
          <HabitCard name={habit.name} type={habit.type} key={index} />
        ))}
      </div>
    </div>
  );
};

const AddHabitForm = ({ onAddHabit }: { onAddHabit: (habit: Habit) => void }) => {
  const [currentHabit, setCurrentHabit] = useState("");

  function handleAddHabit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentHabit.trim()) {
      alert("The name of the habit cannot be empty.");
      return;
    }

    onAddHabit({ name: currentHabit, type: "Personal" });
    setCurrentHabit("");
  }

  return (
    <div className="w-1/4 text-center bg-gradient-to-br from-yellow-400 to-red-500 rounded-4xl p-3">
      <form onSubmit={handleAddHabit} className="flex flex-col gap-3">
        <label htmlFor="add-habit" className="font-semibold">Add new habit:</label>
        <input 
          id="add-habit"
          name="add-habit"
          value={currentHabit}
          onChange={(e) => setCurrentHabit(e.target.value)}
          placeholder="Enter the name of the habit"
          className="p-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 rounded-lg transition cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function handleAddHabit(newHabit: Habit) {
    setHabits(prev => [...prev, newHabit]);
  }

  return (
    <div className='w-full h-full flex justify-center items-center flex-col p-6'>
      <h1 className="text-4xl font-bold" style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)" }}>Sprinter</h1>
      <h2 className='text-xl text-gray-700'>Habit tracker made easy!</h2>
      <div className='w-full flex flex-col items-center'>
        <AddHabitForm onAddHabit={handleAddHabit} />
        <HabitsList habits={habits} />
      </div>
      <hr className="w-3/4 my-6" />
      <NotesGrid />
    </div>
  );
}
