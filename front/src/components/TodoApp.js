import React, {useState, useEffect} from 'react';
import ResponsiveDrawer from './ResponsiveDrawer';
import { Card } from './Card';
import axios from "axios";
import CardList from './CardList';

export const TodoApp = () => {

    const [items, setitems] = useState([])

    const headers = {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    useEffect(() => {
        axios.get("http://localhost:8080/api/tasks")
            .then(response => {
                let result = response.data;
                setitems(result);
            }).catch(error => {
                alert("An error occurred while trying to connect to the database.");
            });
    }, [])

    const handleNewTask = (newItem) => {
        axios.post("http://localhost:8080/api/tasks", newItem, {headers:headers})
            .then(response => {
                const newItems = [...items, newItem];
                setitems(newItems);
            }).catch(error => {
                alert("An error occurred while trying to connect to the database.");
            });
    }

    return (
        <div>
            <ResponsiveDrawer></ResponsiveDrawer>
            <CardList items={items} ></CardList>
            <br></br>
            <br></br>
            <div style={{textAlign:"right"}}>
            <Card handleNewTask={handleNewTask}></Card>
            </div>
        </div>
    )
}
export default TodoApp;


