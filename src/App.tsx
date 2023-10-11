import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string
    title: string
    // filter: FilterValuesType
}
type TasksType = {
    [key: string]: InTasksType
}
type InTasksType = {
    data: TaskType[]
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to buy'},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true}
            ],
            filter: 'all'
        },
        [todolistID2]: {
            data: [
                {id: v1(), title: "HTML&CSS2", isDone: true},
                {id: v1(), title: "JS2", isDone: true}
            ],
            filter: 'all'
        }
    });

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: {...tasks[todolistID], data:tasks[todolistID].data.filter(el=> el.id!==todolistID)}})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
        // setTasks({...tasks,[todolistID]:tasks[todolistID].filter(el=>el.id!==taskId)})
    }

    function addTask(todolistID: string, title: string) {
          let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistID]:{...tasks[todolistID], data:[ newTask,...tasks[todolistID].data]}})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks,[todolistID]:{...tasks[todolistID],data:tasks[todolistID].data.map(el=>el.id===taskId? {...el,isDone}:el )}})
        // setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el,isDone:isDone}:el)})
    }

    const removeTodolist = (todolistID: string) => {
        //     setTodolists(todolists.filter(el=>el.id!==todolistID))
        // delete tasks[todolistID]
    }

    function changeFilter(todolistID: string, filter: FilterValuesType) {
        setTasks({...tasks,[todolistID]:{...tasks[todolistID],filter}})

    }

    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id].data;
                if (tasks[el.id].filter === "active") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === false);
                }
                if (tasks[el.id].filter === "completed") {
                    tasksForTodolist = tasks[el.id].data.filter(t => t.isDone === true);
                }
                return (
                    <Todolist key={el.id}
                              todolistID={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tasks[el.id].filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
