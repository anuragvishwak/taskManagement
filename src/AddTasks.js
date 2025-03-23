import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { database } from "./FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

function AddTasks({ renderingTasks, setopeningAddTaskForm }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [priority, setpriority] = useState("");
  const [category, setcategory] = useState("");
  const currentDate = new Date();

  async function creatingTask() {
    try {
      await addDoc(collection(database, "todo_list_details"), {
        title: title,
        description: description,
        date: currentDate,
        priority: priority,
        category: category,
        status: "pending",
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
      <div className="bg-white w-80 sm:w-5/12 p-5 rounded">
        <div className="flex items-center mb-5 justify-between">
          <p className="text-xl text-[#0F4C5C] font-bold">Add Task</p>
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
            <p className="text-lg font-semibold text-[#0F4C5C]">Title:</p>
            <input
              onChange={(e) => {
                settitle(e.target.value);
              }}
              placeholder="Add Title"
              className="italic border p-1.5 rounded border-gray-300 w-full"
            ></input>
          </div>
          <div className="my-3">
            <p className="font-semibold text-lg text-[#0F4C5C]">Description:</p>
            <textarea
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              placeholder="Write something here..."
              className="italic border h-20 p-1.5 rounded border-gray-300 w-full"
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <select
            onChange={(e) => {
              setpriority(e.target.value);
            }}
            className="border p-1.5  text-[#0F4C5C] rounded border-gray-300"
          >
            <option>select priority</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Optional</option>
          </select>

          <select
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            className="border p-1.5 rounded text-[#0F4C5C] border-gray-300"
          >
            <option>select Category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
          </select>
        </div>
        <button
          onClick={() => {
            creatingTask();
          }}
          className="bg-[#0F4C5C] text-white py-1.5 w-full mt-5 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTasks;
