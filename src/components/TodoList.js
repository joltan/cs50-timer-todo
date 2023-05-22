import { VStack, Box,  Text, Divider } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";

const LOCAL_STORAGE_KEY = 'FocusTimer.todos'

export default function TodoList() {

    // todos array 

    const [todos, setTodos] = useState([]);

    // how many tasks left to be completed

    const [pendingTask, setPendingTask] = useState(0);


    // setup local storage if todos array is empty

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) {
            setTodos(storedTodos)
        }
    }, []);


    // update local storage whenever todos array changes

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))

        updatePending();
    }, [todos]);


    // add to do to the array

    const addTodo = (todo) => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
          return;
        }
    
        const newTodos = [todo, ...todos];
        setTodos(newTodos);
    };


    // update text in array if the text is not empty

    const updateTodo = (newTodo) => {
        if (!newTodo.text || /^\s*$/.test(newTodo.text)) {
          return;
        }
        setTodos(prev => prev.map(item => (item.id === newTodo.id ? newTodo : item)));
        
    };


    // delete todo and remove from array

    const deleteTodo = (todoId) => {
        let newTodos = todos.filter(todo => todo.id !== todoId)
        setTodos(newTodos);
    };


    // mark todo as complete 

    const completeTodo = (id) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    // recount the pendingTask value
    
    const updatePending = () => {
                        
        let pendingTodo = todos.filter(todo => todo.completed === false);
        if (pendingTodo.length !== pendingTask)
            setPendingTask(pendingTodo.length);
    }


    // empty todo list

    const clearList = () => {
        setTodos([]);

        return;
    };



    return (
        <VStack spacing={4}  align='stretch' justifyContent="left" maxWidth="640px" minWidth="400px">
            <Box align="center">
                <Text fontSize="xl" as="b" >You have {pendingTask} task{pendingTask > 1 ? 's' : ' '} today. </Text>
            </Box>
            <Divider />
            <TodoInput addTodo={addTodo} clearList={clearList}/>
            { todos.map((todo)=>(
                <TodoItem todo={todo} updateTodo={updateTodo} completeTodo={completeTodo} deleteTodo={deleteTodo} key={todo.id}/>
            ))};
        </VStack>
    );

};


