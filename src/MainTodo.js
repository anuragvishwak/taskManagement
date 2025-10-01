import { useEffect, useState } from "react";
import AddTasks from "./AddTasks";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
import { IoClose, IoLogOut, IoPencil } from "react-icons/io5";
import UpdateTask from "./UpdateTask";
import { toast } from "react-toastify";
import { IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img1 from "./dev logo.png";
import { FaPencilAlt } from "react-icons/fa";

function MainTodo() {
  const navigation = useNavigate();
  const [openingAddTaskForm, setopeningAddTaskForm] = useState(false);
  const [openingUpdateTaskForm, setopeningUpdateTaskForm] = useState(false);
  const [capturingWholeData, setcapturingWholeData] = useState({});
  const [gettingTasks, setgettingTasks] = useState([]);
  const [openingDeletePopup, setopeningDeletePopup] = useState(false);
  const [capturingTaskId, setcapturingTaskId] = useState(null);
  const [search, setsearch] = useState("");
  const [priority, setpriority] = useState("");
  const email = localStorage.getItem("email");

  const colors = [
    "border-red-300",
    "border-yellow-300",
    "border-purple-300",
    "border-orange-300",
    "border-green-300",
    "border-blue-300",
  ];

  console.log("finding tasks", gettingTasks);

  function handleCheckbox(taskId) {
    setgettingTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  }

  function handleUpdate(task) {
    setopeningUpdateTaskForm(true);
    setcapturingWholeData(task);
  }

  function handleDelete(taskId, task) {
    setopeningDeletePopup(true);
    setcapturingTaskId(taskId);
    setcapturingWholeData(task);
  }

  async function renderingTasks() {
    const taskDetails = await getDocs(
      collection(database, "todo_list_details")
    );

    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const filteredArray = multipleArray.filter((task) => task.email === email);

    if (search) {
      setgettingTasks(filteredArray.filter((task) => task.title === search));
    } else {
      setgettingTasks(filteredArray);
    }
  }

  async function deletingTask(taskId) {
    try {
      const taskRef = doc(database, "todo_list_details", taskId);
      await deleteDoc(taskRef);

      setopeningUpdateTaskForm(false);
      toast.success("Task deleted successfully!");
      renderingTasks();
      setopeningDeletePopup(false);
    } catch (error) {
      console.error("Error deleting task: ", error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    renderingTasks();
  }, [search]);
  return (
    <div>
      <div className=" min-h-screen bg-gray-100 h-full p-4 sm:p-4">
        <div className="sm:flex bg-white p-3 rounded border border-gray-300 shadow items-center justify-between">
          <p className="text-2xl capitalize sm:text-3xl font-semibold text-[#7C3AED]">
            Welcome {email.slice(0, 6)}
          </p>
          <div className="sm:flex items-center mt-2 space-x-3">
            <input
              onChange={(e) => {
                setsearch(e.target.value);
              }}
              placeholder="Search tasks....."
              className="border p-1 rounded border-gray-400 w-full sm:w-80"
            ></input>
            <div className="flex items-center justify-end mt-2 sm:mt-0 space-x-2">
              <button
                onClick={() => {
                  setopeningAddTaskForm(true);
                }}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-sm sm:text-base py-1.5 sm:py-1 px-3 rounded font-senibold text-white"
              >
                + Create List
              </button>

              <button
                onClick={() => {
                  localStorage.clear();
                  navigation("/");
                }}
                className="border-2 rounded p-1 border-[#7C3AED]"
              >
                <IoLogOut className="text-[#7C3AED]" size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3  gap-5">
          {gettingTasks
            ?.filter(
              (task) =>
                priority === "select priority" ||
                priority === "" ||
                task.priority === priority
            )
            .map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`shadow-md bg-white rounded-t rounded-b rounded-r flex flex-col justify-between border-l-8 ${
                  colors[index % colors.length]
                }`}
              >
                <div
                  style={{ minHeight: "260px" }}
                  className="border-t border-r border-b rounded-t rounded-b rounded-r border-gray-300 p-3"
                >
                  <div>
                    <div className="flex space-x-2 items-center">
                      <div className="mt-2">
                        <input
                          checked={task.status === "completed"}
                          onChange={() => handleCheckbox(task.id)}
                          type="checkbox"
                          className="h-5 w-6"
                        />
                      </div>
                      <div className="flex items-center w-full justify-between">
                        <p
                          className={`${
                            task.status === "completed"
                              ? "line-through text-gray-300"
                              : "text-[#7C3AED]"
                          } font-bold`}
                        >
                          {task.title}
                        </p>
                        <div className="flex items-center space-x-1">
                          <button
                            disabled={task.status === "completed"}
                            onClick={() => handleUpdate(task)}
                            className="text-blue-500"
                          >
                            <FaPencilAlt size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id, task)}
                            className="text-red-500"
                          >
                            <MdDelete size={24} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="font-semibold text-gray-500">Desc:</p>

                      {task.descMode === "para" ? (
                        <p className="text-[#333333] whitespace-pre-line">
                          {task.description}
                        </p>
                      ) : (
                        <ul className="list-disc ml-5 text-[#333333]">
                          {task.description.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 border-t pt-2 flex justify-between text-sm sm:text-base items-center">
                    <p
                      className={`${
                        task.status === "pending"
                          ? "text-red-500 font-bold"
                          : "text-green-500 font-bold"
                      }`}
                    >
                      {task.status}
                    </p>
                    <div className="flex text-blue-500 font-semibold items-center space-x-3">
                      <p>Priority: {task.priority}</p>
                      <p>Category: {task.category}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {openingAddTaskForm && (
          <AddTasks
            setopeningAddTaskForm={setopeningAddTaskForm}
            renderingTasks={renderingTasks}
          />
        )}

        {openingDeletePopup && (
          <div className="bg-black z-50 flex flex-col justify-center items-center fixed inset-0 bg-opacity-70">
            <div className="bg-white sm:mx-0 mx-5 p-4 rounded">
              <p className="mb-3 sm:text-lg">
                Are you want to delete{" "}
                <strong>'{capturingWholeData.title}'</strong>
              </p>

              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => {
                    setopeningDeletePopup(false);
                  }}
                  className="bg-[#333333] py-1 px-3 rounded text-white"
                >
                  <div className="flex items-center space-x-1">
                    <IoClose />
                    Cancel
                  </div>
                </button>
                <button
                  onClick={() => {
                    deletingTask(capturingTaskId);
                  }}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  <div className="flex items-center space-x-1">
                    <MdDelete />
                    Delete
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {openingUpdateTaskForm && (
          <UpdateTask
            setopeningUpdateTaskForm={setopeningUpdateTaskForm}
            renderingTasks={renderingTasks}
            capturingWholeData={capturingWholeData}
          />
        )}
      </div>
      <div className="flex fixed z-10 right-0 bottom-0 m-3 items-center space-x-2">
        <p className="text-gray-400 text-sm font-semibold">Developed by:</p>
        <img src={img1} className="h-4" />
      </div>
    </div>
  );
}

export default MainTodo;
