import React, { useRef, useState } from 'react'
import { Container, Tooltip, IconButton, Flex, Editable, EditablePreview, EditableInput, Spacer } from '@chakra-ui/react';
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons';

export default function TodoItem({todo, updateTodo, completeTodo, deleteTodo}) {
    
    // keep an old copy of todo before editing
    const [edit, setEdit] = useState(todo.text)
    
    // variable to be referenced in Controlled Input component
    const [input, setInput] = useState(todo.text)

    // update todo after editing is completed
    const submitUpdate = (newValue) => {
        if (newValue.length > 0) {
            let tmp = {
                id : todo.id, 
                text : newValue,
                completed : todo.completed
            };
            console.log("not empty text")
            updateTodo(tmp);
            setEdit(newValue)
            console.log('submitUpdate:newVal:', newValue);
        }
        else {
            setInput(edit)                   
        }
    }

    // update input field when new characters are typed in the field
    const handleChange = (e) => {
        setInput(e)
    }

    return (
        <Flex gap='1' alignItems="center">
            <IconButton  
                type="button" 
                h='1.75rem'  
                size='sm'  
                variant='outline'
                icon={todo.completed ? 
                        <CheckIcon boxSize={5} color="green.400"/> 
                        : <CheckIcon color="gray.400"/> } 
                onClick={() => completeTodo(todo.id)} 
                
            />  
            <Spacer />
            <IconButton  
                type="button" 
                h='1.75rem'  
                size='sm'  
                variant='outline'
                icon={<DeleteIcon/>} 
                onClick={() => deleteTodo(todo.id)} 
            />  
            <Container>
                <Editable 
                    submitOnBlur={true}
                    value={input}
                    isPreviewFocusable={true}
                    selectAllOnFocus={false}
                    onSubmit={(newValue) => submitUpdate(newValue )}
                    onChange={handleChange}
                    borderRadius="md"
                    border="1px"
                    borderColor='gray.100' 
                >
                    <Tooltip label="Click to edit" >
                        <EditablePreview pl="2"/>
                    </Tooltip>
                    <EditableInput />
                </Editable>
            </Container>
        </Flex>
    );


}
