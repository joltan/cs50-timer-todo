import { Center, Wrap, WrapItem } from "@chakra-ui/react";
import SprintTimer from "../components/SprintTimer";
import TodoList from "../components/TodoList";


export default function Dashboard() {
    return (
        <Center >
            <Wrap p="40px">
                <WrapItem>
                    <SprintTimer />
                </WrapItem>
                <WrapItem>
                    <TodoList />
                </WrapItem>
            </Wrap>
        </Center>
    )
}
