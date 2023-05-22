import { VStack, Text, Slider, SliderFilledTrack, Container, SliderTrack, SliderThumb, Box, Tooltip } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { MdGraphicEq } from "react-icons/md";
import SettingsContext from "./SettingsContext";

export default function Settings (){
  // load settings from settingsProvider
  const settingsInfo = useContext(SettingsContext);

  // toggle function for showing tooltips over slider
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <Container align="center">
      <VStack justifyContent="center" p="5">
        <Text as="b">Minutes per Sprint : </Text>
        <Text>{settingsInfo.sprintMin} min</Text>
        <Slider 
           defaultValue={settingsInfo.sprintMin} 
           min={5} 
           max={60} 
           step={5} 
           onChange={(val) => settingsInfo.setSprintMin(val)}
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
          >
          <SliderTrack bg='green.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green' />
          </SliderTrack>
          <Tooltip 
            hasArrow 
            bg='green.500' 
            color='white' 
            placement='top' 
            isOpen={showTooltip}  
            label={settingsInfo.sprintMin}
          >
            <SliderThumb boxSize={6} >
              <Box color='green' as={MdGraphicEq} />
            </SliderThumb>
          </Tooltip>
        </Slider>
        
        <Text as="b">Minutes per Short Break:</Text>
        <Text>{settingsInfo.shortMin} min</Text>
        <Slider 
           defaultValue={settingsInfo.shortMin} 
           min={5} 
           max={30} 
           step={5} 
           onChange={(val) => settingsInfo.setShortMin(val)}
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
          >
          <SliderTrack bg='green.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green' />
          </SliderTrack>
          <Tooltip 
            hasArrow 
            bg='green.500' 
            color='white' 
            placement='top' 
            isOpen={showTooltip}  
            label={settingsInfo.shortMin}
          >
            <SliderThumb boxSize={6} >
              <Box color='green' as={MdGraphicEq} />
            </SliderThumb>
          </Tooltip>
        </Slider>


        <Text as="b">Minutes per Long Break: </Text>
        <Text>{settingsInfo.longMin} min</Text>
        <Slider 
           defaultValue={settingsInfo.longMin} 
           min={5} 
           max={60} 
           step={5} 
           onChange={(val) => settingsInfo.setLongMin(val)}
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
          >
          <SliderTrack bg='green.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green' />
          </SliderTrack>
          <Tooltip 
            hasArrow 
            bg='green.500' 
            color='white' 
            placement='top' 
            isOpen={showTooltip}  
            label={settingsInfo.longMin}
          >
            <SliderThumb boxSize={6} >
              <Box color='green' as={MdGraphicEq} />
            </SliderThumb>
          </Tooltip>
        </Slider>

        <Text as="b">Long Break frequency: </Text>
        <Text> Every {settingsInfo.longFrequency} cycle(s)</Text>
        <Slider 
           defaultValue={settingsInfo.longFrequency} 
           min={1} 
           max={10} 
           step={1} 
           onChange={(val) => settingsInfo.setLongFrequency(val)}
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
          >
          <SliderTrack bg='green.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green' />
          </SliderTrack>
          <Tooltip 
            hasArrow 
            bg='green.500' 
            color='white' 
            placement='top' 
            isOpen={showTooltip}  
            label={settingsInfo.longFrequency}
          >
            <SliderThumb boxSize={6} >
              <Box color='green' as={MdGraphicEq} />
            </SliderThumb>
          </Tooltip>
        </Slider>

        <Text as="b">Total Sprint cycles:</Text>
        <Text> {settingsInfo.totalCycles} cycle(s)</Text>
        <Slider 
           defaultValue={settingsInfo.totalCycles} 
           min={2} 
           max={20} 
           step={1} 
           onChange={(val) => settingsInfo.setTotalCycles(val)}
           onMouseEnter={() => setShowTooltip(true)}
           onMouseLeave={() => setShowTooltip(false)}
          >
          <SliderTrack bg='green.100'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='green' />
          </SliderTrack>
          <Tooltip 
            hasArrow 
            bg='green.500' 
            color='white' 
            placement='top' 
            isOpen={showTooltip}  
            label={settingsInfo.totalCycles}
          >
            <SliderThumb boxSize={6} >
              <Box color='green' as={MdGraphicEq} />
            </SliderThumb>
          </Tooltip>
        </Slider>

      </VStack>
    </Container>
  )
}
