import React, { useState } from 'react';
import {v4 as uuid} from 'uuid';
import { Input, Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AddIcon, RepeatIcon } from '@chakra-ui/icons';
import { Form } from 'react-router-dom'
import { getDateToday } from './DateToday';

export default function TodoInput({addTodo, clearList}) {

    // variable to be referenced in Controlled Input component
    const [input, setInput] = useState('');

    // handle change for onChange() in Input field
    const handleChange = e => {
        setInput(e.target.value);
    };

    // add new todo to todos array upon submission

    const handleSubmit = e => {
        e.preventDefault();
        let todo = {
            id: uuid(),
            text: input,
            completed: false
        };

        addTodo(todo);
        setInput('');
    };

    // reset the list by emptying array
    
    const handleReset = e => {
        e.preventDefault();
        clearList();
    };


    return (
        <Form onSubmit={handleSubmit}>  
            <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Add new task'
                    className="todo-input"
                    onChange={handleChange}
                    name='text'
                    value={input}
                />
                <InputRightElement width='5.5rem'>
                    <Flex p='2' gap='2'>
                        <IconButton  type="submit" h='1.75rem'  size='sm' icon={<AddIcon />} onClick={handleSubmit} />
                        <IconButton  type="submit" h='1.75rem'  size='sm' icon={<RepeatIcon />} onClick={handleReset} />
                    </Flex>
                </InputRightElement>
            </InputGroup>                               
        </Form>
    )
}
