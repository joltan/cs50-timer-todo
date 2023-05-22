# Sprinter App
#### Video Demo:  <https://youtu.be/MbV5Mrmf32Q>
#### Description:

## Scope
**Build a one-page web application to help me organize my day.**
**Main features:**
1. Pomodoro-style countdown timer
- Sprint session with short/long breaks
- Short break after every sprint 
- Long break after X number of sprints
- Show progress during each phase
- Automatically moves on to next program upon completion
- Allows skipping forward to next program
- Allows customizing the timer settings

2. 	To-do list
- Add, delete, edit all tasks
- Remove all tasks 
- Mark tasks as complete
- Show number of outstanding tasks

## Out of Scope
1. Integration with third party note-taking or writing tools eg: Medium, Google Task
2. Database integration

## What did I learn to use
1. React JS
- Router
- Use Hooks
2. ChakraUI
- Drawer
- CircularProgress
- Grid & SimpleGrid
- Editable

## Lesson Learn

1. Learn about a framework from scratch
2. Manage design scope
3. Stop and ship.


## Solution ideas
1. Pomodoro timer 
- The timer uses useEffect hook to get the latest Settings values whenever it's updated.
- The timer has a program variable to know what mode the timer needs to act on
- Whenever timer is up, the useEffect hook will check if it should move to the next mode or it's completed

2. Task/todo list
- A todos array is stored in localStorage and the locally stored copy is updated whenever useEffect detects changes in the todos
- The todo list will be updated whenever changes are detected to the todos array eg: new todo, deleted todo, editied todo.