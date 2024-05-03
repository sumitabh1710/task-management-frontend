import React, { useEffect, useState } from "react";
import "./Home.css";
import api from "../../api";
import Popup from "../Popup/Popup";

const Home = () => {
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    description: "",
  });

  async function fetchData() {
    try {
      const data = await api.getTasks("/task/all");
      console.log(data);
      setTaskList(data);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (taskList.length == 0) {
      fetchData();
    }
  }, [taskList]);

  const handleAddTask = async () => {
    try {
      await api.addTask("/task/add", newTask);
      setNewTask({
        title: "",
        description: "",
      });
      setShowAddPopup(false);
      setTaskList([]);
    } catch (error) {
      console.error("Error adding Task:", error);
    }
  };

  const handleEditTask = async (id) => {
    try {
      await api.editTask(`/task/edit/${id}`, newTask);
      setNewTask({
        title: "",
        description: "",
      });
      setShowEditPopup(false);
      setTaskList([]);
    } catch (error) {
      console.error("Error adding Task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(`/task/delete/${id}`);
      setTaskList([]);
    } catch (error) {
      console.error("Error adding Task:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    setShowEditPopup(true);
    setNewTask(taskList.filter((each) => each.id === id)[0]);
  };

  const handleAdd = () => {
    setShowAddPopup(true);
  };

  const handleDelete = (id) => {
    handleDeleteTask(id);
  };

  return (
    <div className="home_container">
      <div className="home_main_container">
        <div className="home_title_add_container">
          <h1>Task Management</h1>
          <button
            style={{
              width: "80px",
              height: "40px",
              margin: "5px 0px",
              fontFamily: "cursive",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            onClick={() => handleAdd()}
          >
            Add
          </button>
        </div>
        <div className="main_table_container">
          <div className="table_container">
            <table>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {taskList.map((task, index) => (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td
                      style={{
                        wordWrap: "break-word",
                        padding: "10px 10px",
                      }}
                    >
                      {task.title}
                    </td>
                    <td
                      style={{
                        maxWidth: "250px",
                        wordWrap: "break-word",
                        padding: "10px 10px",
                      }}
                    >
                      {task.description}
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(task.id)}
                        style={{
                          width: "60px",
                          height: "30px",
                          margin: "5px 0px",
                          fontFamily: "cursive",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(task.id)}
                        style={{
                          width: "60px",
                          height: "30px",
                          margin: "5px 0px",
                          fontFamily: "cursive",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAddPopup && (
        <Popup setShow={setShowAddPopup}>
          <div className="main_form_container">
            <h3 className="title">Add Task!</h3>
            <p className="title">Title</p>
            <input
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
            ></input>
            <p className="description">Description</p>
            <input
              name="description"
              value={newTask.age}
              onChange={handleInputChange}
            ></input>
            <button
              onClick={() => handleAddTask()}
              style={{
                width: "60px",
                height: "30px",
                margin: "30px 0px",
                fontFamily: "cursive",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Add
            </button>
          </div>
        </Popup>
      )}
      {showEditPopup && (
        <Popup setShow={setShowEditPopup}>
          <div className="main_form_container">
            <h3 className="title">Edit Task!</h3>
            <p className="title">Title</p>
            <input
              onChange={(e) =>
                setNewTask((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              value={newTask.title}
            ></input>
            <p className="description">Description</p>
            <input
              onChange={(e) =>
                setNewTask((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              value={newTask.description}
            ></input>
            <button
              onClick={() => handleEditTask(newTask.id)}
              style={{
                width: "60px",
                height: "30px",
                margin: "30px 0px",
                fontFamily: "cursive",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Home;
