import { useEffect, useState } from "react";
import "./App.css";
import AddTasks from "./AddTasks";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./FirebaseConfig";
import { IoHeartDislikeCircleOutline, IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

function App() {
  const [openingAddTaskForm, setopeningAddTaskForm] = useState(false);
  const [gettingTasks, setgettingTasks] = useState([]);

  async function renderingTasks() {
    const taskDetails = await getDocs(
      collection(database, "todo_list_details")
    );
    let multipleArray = taskDetails.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setgettingTasks(multipleArray);
    console.log(multipleArray);
  }

  useEffect(() => {
    renderingTasks();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen h-full p-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl sm:text-3xl font-semibold text-[#333333]">Welcome User</p>
        <button
          onClick={() => {
            setopeningAddTaskForm(true);
          }}
          className="bg-[#333333] py-1 px-3 rounded font-senibold text-white"
        >
          + Create List
        </button>
      </div>

      <div>
        {gettingTasks.map((task) => (
          <div className="flex items-center justify-between my-3 p-3 border border-gray-300 rounded">
            <p>{task.title}</p>
            <div className="flex items-center space-x-2">
              <button className='text-blue-500 bg-blue-100 p-1 rounded'><IoPencil/></button>
              <button className='text-red-500 bg-red-100 p-1 rounded'><MdDelete/></button>
            </div>
          </div>
        ))}
      </div>

      {openingAddTaskForm && <AddTasks setopeningAddTaskForm = {setopeningAddTaskForm} renderingTasks = {renderingTasks} />}
    </div>
  );
}

export default App;
