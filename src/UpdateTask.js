import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { database } from "./FirebaseConfig";
import { toast } from "react-toastify";
import { IoCloseOutline } from "react-icons/io5";

function UpdateTask({
  setopeningUpdateTaskForm,
  renderingTasks,
  capturingWholeData,
}) {
  const [title, settitle] = useState(capturingWholeData.title || "");
  const [description, setdescription] = useState(
    capturingWholeData.description || ""
  );
  const [priority, setpriority] = useState(capturingWholeData.priority || "");
  const [category, setcategory] = useState(capturingWholeData.category || "");
  const currentDate = new Date();

  async function updatingTask() {
    try {
      const taskId = capturingWholeData.id;
      const taskRef = doc(database, "todo_list_details", taskId);
      await updateDoc(taskRef, {
        title: title,
        description: description,
        priority: priority,
        category: category,
      });

      setopeningUpdateTaskForm(false);
      toast.success("Task updated successfully!!");
      renderingTasks();
    } catch (error) {
      console.error("Error updating task: ", error);
      toast.error("Something went wrong!!");
    }
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white p-5 w-80 sm:w-5/12 rounded">
        <div className="flex items-center mb-5 justify-between">
          <p className="text-xl text-[#0F4C5C] font-bold">Update Task</p>
          <button
            onClick={() => {
              setopeningUpdateTaskForm(false);
            }}
          >
            <IoCloseOutline size={25} />
          </button>
        </div>
        <div className="w-full">
          <div>
            <p className="text-lg font-semibold text-[#0F4C5C]">Title:</p>
            <input
              value={title}
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
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              placeholder="Write something here..."
              className="italic border h-20 p-1.5 rounded border-gray-300 w-full"
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <select
            value={priority}
            onChange={(e) => {
              setpriority(e.target.value);
            }}
            className="border p-1.5 rounded text-[#0F4C5C] border-gray-300 w-full"
          >
            <option>select priority</option>
            <option>Urgent</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
            <option>Optional</option>
          </select>

          <select
            value={category}
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
            updatingTask();
          }}
          className="bg-[#0F4C5C] text-white py-1.5 mt-5 w-full rounded"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}

export default UpdateTask;
