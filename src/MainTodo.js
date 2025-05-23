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

function MainTodo() {
  const navigation = useNavigate();
  const [openingAddTaskForm, setopeningAddTaskForm] = useState(false);
  const [openingUpdateTaskForm, setopeningUpdateTaskForm] = useState(false);
  const [capturingWholeData, setcapturingWholeData] = useState({});
  const [gettingTasks, setgettingTasks] = useState([]);
  const [openingDeletePopup, setopeningDeletePopup] = useState(false);
  const [capturingTaskId, setcapturingTaskId] = useState(null);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const [priority, setpriority] = useState("");
  const email = localStorage.getItem("email");

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
    setgettingTasks(filteredArray);
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
  }, []);
  return (
    <div>
      <div className=" min-h-screen h-full p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-2xl capitalize sm:text-3xl font-semibold text-[#0F4C5C]">
            Welcome {email.slice(0, 6)}
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              navigation("/");
            }}
            className="border rounded px-4 py-1 border-[#0F4C5C]"
          >
            <div className="flex text-[#0F4C5C] font-semibold items-center space-x-2">
              <IoLogOut size={20} />
              Logout
            </div>
          </button>
        </div>

        <hr className="my-3 border-gray-300" />

        <div className="flex items-center justify-end space-x-3">
          <select
            onChange={(e) => {
              setpriority(e.target.value);
            }}
            className="border p-1 rounded border-gray-300 w-52"
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
              setopeningAddTaskForm(true);
            }}
            className="bg-[#0F4C5C] py-1 px-3 rounded font-senibold text-white"
          >
            + Create List
          </button>
        </div>
        <div>
          {gettingTasks.length === 0 ? (
            <p className="text-center mt-10 text-gray-400 text-lg font-semibold">
              📝 No tasks available. Start by creating one!
            </p>
          ) : (
            gettingTasks
              ?.filter(
                (task) =>
                  priority === "select priority" ||
                  priority === "" ||
                  task.priority === priority
              )
              .map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="my-3 p-3  bg-white border"
                >
                  <div className="flex space-x-2 items-center">
                    <div className="mt-2">
                      <input
                        checked={task.status === "completed"}
                        onChange={() => {
                          handleCheckbox(task.id);
                        }}
                        type="checkbox"
                        className="h-5 w-6"
                      ></input>
                    </div>
                    <div className="flex items-center w-full justify-between">
                      <p
                        className={`${
                          task.status === "completed"
                            ? "line-through text-gray-400"
                            : "text-[#0F4C5C]"
                        } font-bold  border-gray-400`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setOpenedTaskId(
                              openedTaskId === task.id ? null : task.id
                            );
                          }}
                          className="text-gray-500 bg-gray-50 border p-1 rounded"
                        >
                          {openedTaskId === task.id ? (
                            <IoIosArrowUp size={17} />
                          ) : (
                            <MdKeyboardArrowDown size={20} />
                          )}
                        </button>

                        <button
                          disabled={task.status === "completed"}
                          onClick={() => {
                            handleUpdate(task);
                          }}
                          className="text-blue-500 bg-blue-100 p-1 rounded"
                        >
                          <IoPencil />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(task.id, task);
                          }}
                          className="text-red-500 bg-red-100 p-1 rounded"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    {openedTaskId === task.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <hr className="my-2" />
                        <div className="bg-[#f0fcff] text-sm sm:text-base border border-[#c6f5ff] shadow p-2 rounded">
                          <p className="font-semibold text-gray-500">Desc:</p>
                          <p className="text-[#333333] text-justify">
                            {task.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <hr className="my-2" />
                  <div className="flex items-center text-sm sm:text-base justify-between">
                    <p
                      className={`${
                        task.status === "pending"
                          ? "text-red-500 font-bold"
                          : "text-green-500 font-bold"
                      }`}
                    >
                      {task.status}
                    </p>
                    <div className="flex text-[#0F4C5C] text-sm sm:text-base font-semibold items-center space-x-2">
                      <p>{task.priority}</p>
                      <span className="mx-1">|</span>
                      <p>{task.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))
          )}
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
