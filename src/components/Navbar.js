import { SettingsIcon, TimeIcon } from "@chakra-ui/icons";
import { Flex, Divider, Spacer, Button, Container, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, Text, Switch, useDisclosure, Center, DrawerFooter} from "@chakra-ui/react";
import { useContext } from "react";
import { redirect, useNavigate } from 'react-router-dom';
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";

export default function Navbar() {

    const settingsInfo = useContext(SettingsContext);

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleClose = () => {
        onClose();
    }
    return (
        <Container justifyContent="center" maxWidth="stretch">
            <Flex as="nav" p="10px" alignItems="center" gap="2">
                <Button onClick={(e) => navigate("/")} leftIcon={<TimeIcon />} size="lg" as="b" variant="ghost">Sprinter</Button>
                <Spacer />
                <Button onClick={onOpen} rightIcon={<SettingsIcon />}>Settings</Button>
                <Drawer placement="right" isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerHeader borderBottomWidth='1px'>
                        <Center>Settings</Center>
                    </DrawerHeader>
                    <DrawerBody align="center" p="10px">
                        <Settings/>
                        <Button type="text" onClick={handleClose}>
                            Close
                        </Button>
                    </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
            <Divider />
        </Container>
    )
}
