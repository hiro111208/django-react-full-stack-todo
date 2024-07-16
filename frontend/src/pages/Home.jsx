import { useState, useEffect } from "react";
import api from "../api";
import Task from "../components/Task";
import "../styles/Home.css";

function Home() {
    const [tasks, setTasks] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        api.get("/api/tasks/")
            .then((res) => res.data)
            .then((data) => {
                setTasks(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };
    const deleteTask = (id) => {
        api.delete(`/api/tasks/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    alert("Task deleted");
                } else {
                    alert("Failed to delete task.");
                }
                getTasks();
            })
            .catch((error) => alert(error));
    };
    const createTask = (e) => {
        e.preventDefault();
        api.post("/api/tasks/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Task created");
                } else {
                    alert("Failed to create task.");
                }
                getTasks();
            })
            .catch((error) => alert(error));
    };
    return (
        <div>
            <div>
                <h2>Tasks</h2>
                {tasks.map((task) => (
                    <Task task={task} onDelete={deleteTask} key={task.id} />
                ))}
            </div>
            <div>
                <h2>Create a Task</h2>
                <form onSubmit={createTask}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                        id="content"
                        name="content"
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Home;
