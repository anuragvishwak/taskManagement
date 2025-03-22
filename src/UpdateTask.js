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
  const currentDate = new Date();

  async function updatingTask() {
    try {
      const taskId = capturingWholeData.id;
      const taskRef = doc(database, "todo_list_details", taskId);
      await updateDoc(taskRef, {
        title: title,
        description: description,
        priority: priority,
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
      <div className="bg-white p-5 rounded-lg">
        <div className="flex items-center mb-5 justify-between">
          <p className="text-xl text-[#333333] font-bold">Update Task</p>
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
            <p className="text-lg font-semibold text-[#333333]">Title:</p>
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
            <p className="font-semibold text-lg text-[#333333]">Description:</p>
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
        <div className="flex items-center justify-between">
          <select
          value={priority}
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
              updatingTask();
            }}
            className="bg-[#333333] text-white py-1.5 ml-2 px-5 rounded"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateTask;
