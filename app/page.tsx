"use client"

import { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import './styles/page.css'

import { NotesGrid } from './components/notes'

interface Habit {
  id: string;
  name: string;
  type: string;
  isCompleted: boolean;
}

const HabitCard = ({ habit }: { habit: Habit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: habit.id,
  });

  const style = {
    transform: transform ? CSS.Translate.toString(transform) : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 select-none cursor-grab"
    >
      <h3 className="text-lg font-semibold">{habit.name}</h3>
      <p className="text-sm text-gray-500">{habit.type}</p>
      {habit.isCompleted ? (
        <span className="w-fit px-2 bg-green-400 rounded-2xl shadow-2xl">Completed</span>
      ) : (
        <span className="w-fit px-2 bg-amber-400 rounded-2xl shadow-2xl">Pending</span>
      )}
    </div>
  );
};

const HabitsList = ({ habits, title, id }: { habits: Habit[]; title: string; id: string }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="w-1/2 p-4 border border-gray-300 min-h-[200px]">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <SortableContext items={habits.map((habit) => habit.id)} strategy={verticalListSortingStrategy}>
        <div className="grid grid-cols-1 gap-4">
          {habits.map((habit) => (
            <HabitCard habit={habit} key={habit.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const AddHabitForm = ({ onAddHabit }: { onAddHabit: (habit: Habit) => void }) => {
  const [currentHabit, setCurrentHabit] = useState("");
  const [currentHabitType, setCurrentHabitType] = useState("Personal");

  function handleAddHabit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentHabit.trim() || currentHabit.length > 45) {
      alert("Name cannot be empty or longer than 45 symbols.");
      return;
    }

    onAddHabit({ id: crypto.randomUUID(), name: currentHabit, type: currentHabitType, isCompleted: false });
    setCurrentHabit("");
    setCurrentHabitType("Personal");
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
        <select 
          name="type" 
          id="type" 
          value={currentHabitType} 
          onChange={(e) => setCurrentHabitType(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
        <button type="submit" className="px-4 py-2 rounded-lg transition cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completedHabits, setCompletedHabits] = useState<Habit[]>([]);

  function handleAddHabit(newHabit: Habit) {
    setHabits((prev) => [...prev, newHabit]);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    if (over.id === "completedHabits") {
      setHabits((prev) => prev.filter((habit) => habit.id !== active.id));
      setCompletedHabits((prev) => {
        const movedHabit = habits.find((h) => h.id === active.id);
        return movedHabit ? [...prev, { ...movedHabit, isCompleted: true }] : prev;
      });
    } else if (over.id === "habits") {
      setCompletedHabits((prev) => prev.filter((habit) => habit.id !== active.id));
      setHabits((prev) => {
        const movedHabit = completedHabits.find((h) => h.id === active.id);
        return movedHabit ? [...prev, { ...movedHabit, isCompleted: false }] : prev;
      });
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="w-full h-full flex justify-center items-center flex-col p-6">
        <h1 className="text-4xl font-bold" style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)" }}>Sprinter</h1>
        <h2 className='text-xl text-gray-700'>Habit tracker made easy!</h2>
        <div className='w-full flex flex-col items-center'>
          <AddHabitForm onAddHabit={handleAddHabit} />
          <div className='flex w-full gap-4'>
            <HabitsList habits={habits} title="Current Habits" id="habits" />
            <HabitsList habits={completedHabits} title="Done" id="completedHabits" />
          </div>
        </div>
        <hr className="w-3/4 my-6" />
        <NotesGrid />
      </div>
    </DndContext>
  );
}