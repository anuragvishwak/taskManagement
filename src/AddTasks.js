import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { database } from "./FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

function AddTasks({ renderingTasks, setopeningAddTaskForm }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("");
  const currentDate = new Date();

  async function creatingTask() {
    try {
      await addDoc(collection(database, "todo_list_details"), {
        title: title,
        description: description,
        date: currentDate,
        priority: priority,
      });
      setopeningAddTaskForm(false);
      toast.success("Task added successfully!!");
      renderingTasks();
    } catch (error) {
      console.error("Error adding task: ", error);
      toast.error("Something went wrong!!");
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center mb-5 justify-between">
          <p className="text-xl text-[#333333] font-bold">Add Task</p>
          <button
            onClick={() => {
              setopeningAddTaskForm(false);
            }}
          >
            <IoCloseOutline size={25} />
          </button>
        </div>
        <div className="w-full">
          <div>
            <p className="text-lg font-semibold text-[#333333]">Title:</p>
            <input
              onChange={(e) => {
                settitle(e.target.value);
              }}
              placeholder="Add Title"
              className="italic border p-1.5 rounded border-gray-300 w-full"
            ></input>
          </div>
          <div className="my-3">
            <p className="font-semibold text-lg text-[#333333]">Description:</p>
            <textarea
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              placeholder="Write something here..."
              className="italic border h-20 p-1.5 rounded border-gray-300 w-80"
            ></textarea>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <select
            onChange={(e) => {
              setpriority(e.target.value);
            }}
            className="border p-1.5 rounded border-gray-300 w-52"
          >
            <option>select priority</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Optional</option>
          </select>
          <button
            onClick={() => {
              creatingTask();
            }}
            className="bg-[#333333] text-white py-1.5 ml-2 px-5 rounded"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTasks;
