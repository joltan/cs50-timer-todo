import { Flex, VStack, Box, Text, Button, CircularProgress,CircularProgressLabel, Wrap, WrapItem, Center, useToast } from "@chakra-ui/react";
import { PauseFill, PlayFill, SkipForwardFill } from "react-bootstrap-icons";
import { useState, useEffect, useContext } from "react";
import { getSecond, getMinute } from "./CountdownUtil"
import { getDateToday } from "./DateToday"
import SettingsContext from "./SettingsContext";


const _sec = 100;
const _min = 60;


export default function SprintTimer() {
    
    // load program settings

    const settingsInfo = useContext(SettingsContext);
    
    // initialize timer settings 
    const [modeStatus, setModeStatus] = useState([{
        name: 'sprint',
        length: settingsInfo.sprintMin,
        completed: false
    },{
        name: 'short',
        length: settingsInfo.shortMin,
        completed: false
    },{
        name: 'long',
        length: settingsInfo.longMin,
        completed: false

    }])

    // array that tracks the sequence of timer modes within a sprint program

    const [program, setProgram] = useState([]);

    // track number of modes to be executed

    const [programLength, setProgramLength] = useState(0);

    // track which mode is the program running now
    const [programIndex, setProgramIndex] = useState(0);


    // initialize variables for time 

    const [clockTime, setClockTime] = useState({
        minute: getMinute(settingsInfo.sprintMin * _min),
        second: getSecond(settingsInfo.sprintMin * _min)
    })

    // number of seconds left
    const [secondsLeft, setSecondsLeft] = useState(settingsInfo.sprintMin * _min)

    // total seconds to be counted
    const [totalSeconds, setTotalSeconds] = useState(settingsInfo.sprintMin * _min)
    
    // chosen mode
    const [mode, setMode] = useState('sprint')
    
    // track the timer start/pause
    const [isCounting, setIsCounting] = useState(false)

    // track if the sprint program is completed
    const [isSprinting, setIsSprinting] = useState(false)

    // return date today in string
    const dateToday = getDateToday();

    // initialize toast for acknowledging completion of each sprint cycle
    const toast = useToast();

    // track percentage of completion of each session and update the circular progress bar accordingly
    const [percentage, setPercentage] = useState(0)

    // track which sprint cycle i'm in
    const [cycleCount, setCycleCount] = useState(0)

    // initialize the program array when program is loaded for the first time

    useEffect(() => {
        let p = [settingsInfo.totalCycles * 2]
        for (var i = 0; i < settingsInfo.totalCycles - 1; i+=2){
            if(i % 2 === 0){
                p[i] = 0;
            }
            if( (i + 2 ) % (settingsInfo.longFrequency * 2) === 0 ){
                p[i + 1] = 2;
            }
            else{
                p[i + 1] = 1;
            }
        }
        setProgram(p);
        setProgramLength(p.length)
    }, [])

    // update the app after settings is updated

    useEffect(() => {
        let newMode = [{
            name: 'sprint',
            length: settingsInfo.sprintMin,
            completed: false
        },{
            name: 'short',
            length: settingsInfo.shortMin,
            completed: false
        },{
            name: 'long',
            length: settingsInfo.longMin,
            completed: false
    
        }];
        setModeStatus(newMode);

        setClockTime({
            minute: getMinute(settingsInfo.sprintMin * _min),
            second: getSecond(settingsInfo.sprintMin * _min)
        })
        let p = [settingsInfo.totalCycles * 2]
        for (var i = 0; i < settingsInfo.totalCycles -1 ; i+=2){
            for (var i = 0; i < settingsInfo.totalCycles - 1; i+=2){
                if(i % 2 === 0){
                    p[i] = 0;
                }
                if( (i + 2 ) % (settingsInfo.longFrequency * 2) == 0 ){
                    p[i + 1] = 2;
                }
                else{
                    p[i + 1] = 1;
                }
            }
        }
        setIsCounting(false);
        setPercentage(0);
        setProgram(p);
        setProgramLength(p.length)
        setSecondsLeft(settingsInfo.sprintMin * _min)
        setTotalSeconds(settingsInfo.sprintMin * _min)
        console.log(p)
    }, [settingsInfo]);

    // update the clock

    useEffect(() => {
        if (isCounting && isSprinting){
            const interval = setInterval(() => {

                let newPercentage = Math.floor(((totalSeconds - secondsLeft)/totalSeconds) * 100); 
                if ( newPercentage > percentage + 1 && newPercentage <= 100){
                    setPercentage(newPercentage);
                }  
                setSecondsLeft(secondsLeft - 1);
                setClockTime({
                    minute: getMinute(secondsLeft - 1),
                    second: getSecond(secondsLeft - 1)
                });
            
    
            }, _sec);
            if (secondsLeft <= 0){
                if(programIndex + 1< programLength && programIndex >= 0){
                    nextMode();
                    resetClock();
                    console.log("after calling nextMode:pIndex",programIndex)
                    console.log("after calling nextMode:program",program[programIndex])
                }
                else {

                    resetProgram();
                    toast({
                        description: "Congratulations! You've completed all your sprints!",
                        status: 'success',
                        duration: 2000,
                        isClosable: true,
                    })
                    console.log("final program index",programIndex)
                }

                if((programIndex + 1) % 2 === 0){
                    setCycleCount(cycleCount + 1)
                }

            } 
            return () => clearInterval(interval);


        }

    }, [secondsLeft, isCounting]);

    // update the mode

    const updateMode = (chosenMode) => {

        if(isSprinting){
            setPercentage(0)
        }
        setMode(modeStatus[chosenMode].name)
        setClockTime({
            minute: getMinute(modeStatus[chosenMode].length *_min),
            second: getSecond(modeStatus[chosenMode].length *_min)
        });
        setSecondsLeft(modeStatus[chosenMode].length * _min);
        setTotalSeconds(modeStatus[chosenMode].length * _min);

    }

    // reset clock after finishing each mode

    const resetClock = () => {
        setPercentage(0)
        setClockTime({
            minute: getMinute(secondsLeft * _min),
            second: getSecond(secondsLeft * _min)
        });
        setSecondsLeft(modeStatus[0].length * _min);
        setTotalSeconds(modeStatus[0].length * _min);

    }

    // reset whole program if all sprint cycles are completed

    const resetProgram = () => {
        setIsCounting(false)
        setProgramIndex(0)
        setPercentage(0)
        setMode(modeStatus[0].name)
        setClockTime({
            minute: getMinute(modeStatus[0].length * _min),
            second: getSecond(modeStatus[0].length * _min)
        });
        setSecondsLeft(modeStatus[0].length * _min);
        setTotalSeconds(modeStatus[0].length * _min);

    }

    // option to skip to the next mode

    const nextMode = () => {
        updateMode(program[programIndex+1])
        setProgramIndex(programIndex +1);
    }

    // start the clock when play button is clicked

    const handlePlay = (e) => {
        setIsCounting(true);

        if(!isSprinting){
            setIsSprinting(true);
        }
    }

    // stop counting when pause button is clicked
    const handlePause = (e) => {
        setIsCounting(false);
    }

    return (
        <Center>
                <VStack justifyContent="center" maxWidth="max-content" p="6">
                    <Box alignItems="center">
                        <Text fontSize="md" as="b">Today is { dateToday }</Text>

                    </Box>
                        <Wrap justify="center" >
                            <WrapItem>
                                <Button 
                                    onClick={(e) => updateMode(0)} 
                                    value='sprint' 
                                    bg={mode === 'sprint' ? "green.500" : "gray.300" }>
                                        Sprint
                                </Button>
                            </WrapItem>
                            <WrapItem>
                                <Button 
                                    onClick={(e) => updateMode(1)} 
                                    value='short' 
                                    bg={mode === 'short' ? "green.500" : "gray.300"}>
                                        Short Break
                                    </Button>
                            </WrapItem>
                            <WrapItem>
                                <Button 
                                    onClick={(e) => updateMode(2)} 
                                    value='long' 
                                    bg={mode === 'long' ? "green.500" : "gray.300"}>
                                        Long Break
                                </Button>
                            </WrapItem>
                        </Wrap>
                    <VStack as="nav" p="10px" alignItems="center" gap="2" borderRadius="md">
                        <CircularProgress hasStripe isAnimated value={20}  size="300px" trackColor="gray.300" thickness="2px" value={percentage} color="green.500"> 
                            <CircularProgressLabel as="b" fontSize="6xl" >{clockTime.minute}:{clockTime.second}</CircularProgressLabel>
                        </CircularProgress>
                        {!isCounting ? 
                            <Button   
                                leftIcon={<PlayFill />} 
                                onClick={(e) => handlePlay(e)}>
                                Play 
                            </Button> 
                            :
                            <Flex gap="2" p="1">
                                <Button  
                                    leftIcon={<PauseFill /> } 
                                    onClick={(e) => handlePause(e)} >
                                    Pause 
                                </Button> 
                                <Button  
                                    leftIcon={<SkipForwardFill/>} 
                                    onClick={nextMode} >
                                    Skip Mode 
                                </Button> 
                            </Flex> 
                        }
                        <Text fontSize="sm"># of Completed Sprints: { cycleCount }</Text>
                    </VStack>
                </VStack> 
        </Center>
    );
};