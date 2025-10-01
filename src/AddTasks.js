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
  const email = localStorage.getItem("email");
  const [descMode, setDescMode] = useState("para");
  const [descriptionList, setDescriptionList] = useState([""]);

  function handleDescriptionChange(index, value) {
    const newList = [...descriptionList];
    newList[index] = value;
    setDescriptionList(newList);
  }

  function addDescriptionField() {
    setDescriptionList([...descriptionList, ""]);
  }

  async function handleSubmit(e) {
    await addDoc(collection(database, "todo_list_details"), {
      title: title,
      description: descMode === "para" ? description : descriptionList,
      date: currentDate,
      priority: priority,
      category: category,
      status: "pending",
      email: email,
    });

    setopeningAddTaskForm(false);
  }

  return (
    <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
      <div className="bg-white w-80 sm:w-5/12 p-5 rounded">
        <div className="flex items-center mb-5 justify-between">
          <div className="flex items-center space-x-5">
            <p className="text-xl text-[#7C3AED]  font-bold">Add Task</p>
            <div className="flex gap-3 mb-3">
              <button
                type="button"
                className={`px-3 py-1 rounded ${
                  descMode === "para"
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDescMode("para")}
              >
                Paragraph
              </button>
              <button
                type="button"
                className={`px-3 py-1 rounded ${
                  descMode === "list"
                    ? "bg-[#7C3AED] text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDescMode("list")}
              >
                List
              </button>
            </div>
          </div>
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
            <p className="text-lg font-semibold text-[#7C3AED] ">Title:</p>
            <input
              onChange={(e) => {
                settitle(e.target.value);
              }}
              placeholder="Add Title"
              className="italic border p-1.5 rounded border-gray-300 w-full"
            ></input>
          </div>
        </div>
        <div className="my-5">
          {descMode === "para" ? (
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Write description..."
              className="w-full border p-2 rounded h-24"
            />
          ) : (
            <div>
              {descriptionList.map((desc, idx) => (
                <input
                  key={idx}
                  value={desc}
                  onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                  placeholder={`Point ${idx + 1}`}
                  className="w-full border p-2 rounded mb-2"
                />
              ))}
              <button
                type="button"
                onClick={addDescriptionField}
                className="text-[#7C3AED] text-sm"
              >
                + Add More
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <select
            onChange={(e) => {
              setpriority(e.target.value);
            }}
            className="border p-1.5  text-[#7C3AED]  rounded border-gray-300"
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
            className="border p-1.5 rounded text-[#7C3AED]  border-gray-300"
          >
            <option>select Category</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
          </select>
        </div>
        <button
          onClick={() => {
            handleSubmit();
          }}
          className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-1.5 w-full mt-5 rounded"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTasks;
