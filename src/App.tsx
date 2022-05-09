import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import { FaPlay, FaRedo, FaStop } from "react-icons/fa";

function App() {
  const initialState = Object.fromEntries(
    Array.from({ length: 90 }, (_, i) => [i + 1, false])
  );
  const initialArrNumState = Array.from({ length: 90 }, (_, i) => i + 1);

  const [numbers, setNumbers] = useState(initialState);
  const [arrNum, setArrNum] = useState<number[]>(initialArrNumState);
  const [count, setCount] = useState(0);
  const [isStart, setIsStart] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const [number, setNumber] = useState(0);
  const [isSoundPlay, setIsSoundPlay] = useState(false);

  const getRandomNum = (): number => {
    const num = arrNum[Math.floor(Math.random() * arrNum.length)];
    return num;
  };

  const playsound = (num: number | string) => {
    const audio = document.createElement("audio");
    audio.src = `/src/audios/${num}.mp3`;
    audio.play();
  };

  const intervalRef = useRef(0);

  const printNumbers = (num: number) => {
    setNumbers((prevState) => ({ ...prevState, [num]: true }));
  };

  const removeNumOfArray = (num: number, arr: number[]) => {
    const index = arr.indexOf(num);
    if (arr.length > 1) {
      arr.splice(index, 1);
    } else {
      alert("termino");

      clearInterval(intervalRef.current);
      setArrNum(initialArrNumState);
      setNumbers(initialState);
    }
    return arr;
  };

  const handleStartClick = () => {
    if (!isStart) {
      playsound("start");
      setIsStart(true);
      const intervalId = setInterval(() => {
        const num = getRandomNum();
        printNumbers(num);
        playsound(num);
        setNumber(num);
        setHistory((prevState) => [num, ...prevState]);

        const newArr = removeNumOfArray(num, arrNum);

        setCount((prevCount) => prevCount + 1);
        setArrNum(newArr);
      }, 2300);

      intervalRef.current = intervalId;
    }
  };

  const handleStopClick = () => {
    if (isStart) {
      playsound("stop");
      clearInterval(intervalRef.current);
      setIsStart(false);
    }
  };

  const handleResetClick = () => {
    if (!isStart) {
      setIsStart(false);
      setCount(0);
      setArrNum(initialArrNumState);
      setNumbers(initialState);
      setHistory([]);
      setNumber(0);
      clearInterval(intervalRef.current);
    }
  };

  return (
    <Center minH="100vh" w="full">
      <Box
        width={["90%", "90%", "700px"]}
        p={[".6rem", "1rem"]}
        bg="red.600"
        rounded="2xl"
      >
        <VStack alignItems="stretch" spacing={3}>
          <HStack
            bg="yellow.300"
            height={["160px", "190px", "230px"]}
            justifyContent="space-between"
            alignItems="center"
            rounded="2xl"
            overflow="hidden"
            spacing={2}
            padding={2}
          >
            <VStack
              width={["35%", "35%", "40%"]}
              textAlign="center"
              alignItems="center"
            >
              {number ? (
                <>
                  <HStack
                    bg="white"
                    boxShadow="md"
                    rounded="full"
                    w={["100px", "120px", "150px"]}
                    h={["100px", "120px", "150px"]}
                    shadow="xl"
                    justifyContent="center"
                  >
                    <Box
                      outline={[
                        "8px solid #4299e1",
                        "9px solid #4299e1",
                        "10px solid #4299e1",
                      ]}
                      rounded="full"
                      w={["65px", "85px", "105px"]}
                      h={["65px", "85px", "105px"]}
                      padding={[".2rem", ".6rem", "1rem"]}
                    >
                      <Text
                        textAlign="center"
                        fontSize={["4xl", "5xl", "6xl"]}
                        fontWeight={600}
                        lineHeight={[1.8, 1.6, 1.4]}
                      >
                        {number}
                      </Text>
                    </Box>
                  </HStack>
                  <Text fontSize={["lg", "xl", "2xl"]} fontWeight={600}>
                    BOLA: {count} / 90
                  </Text>
                </>
              ) : (
                <Box
                  w={["100px", "120px", "150px"]}
                  h={["100px", "120px", "150px"]}
                >
                  <Text fontSize={["2xl", "3xl"]} fontWeight={600}>
                    Press Play
                  </Text>
                </Box>
              )}
            </VStack>
            <VStack
              flex={1}
              alignItems="stretch"
              justifyContent="space-around"
              height="full"
            >
              {/* CONTROLLS */}
              <HStack spacing={4} justifyContent="center">
                <Button
                  colorScheme="red"
                  onClick={handleStartClick}
                  padding={["2rem", "2.3rem", "2.8rem"]}
                  fontSize={["4xl", "5xl", "6xl"]}
                >
                  <Icon as={FaPlay} color="yellow.300" />
                </Button>
                {isStart ? (
                    <Button
                      colorScheme="red"
                      onClick={handleStopClick}
                      padding={["2rem", "2.3rem", "2.8rem"]}
                      fontSize={["4xl", "5xl", "6xl"]}
                    >
                      <Icon as={FaStop} color="yellow.300" />
                    </Button>
                ) : (
                  <>
                    <Button
                      colorScheme="red"
                      onClick={handleResetClick}
                      padding={["2rem", "2.3rem", "2.8rem"]}
                      fontSize={["4xl", "5xl", "6xl"]}
                    >
                      <Icon as={FaRedo} color="yellow.300" />
                    </Button>
                  </>
                )}
              </HStack>
              {/* HISTORY */}
              <HStack
                spacing={[1, 1.5, 2]}
                overflowX="scroll"
                height="55px"
                width="380px"
                p=".3rem"
                bg="red.600"
                rounded="md"
              >
                {history.map((num) => (
                  <HStack
                    key={num}
                    boxSizing="content-box"
                    padding={[0.5, 1]}
                    bg="white"
                    boxShadow="md"
                    rounded="full"
                    w={["25px", "30px", "50px"]}
                    h={["25px", "30px", "50px"]}
                    shadow="xl"
                  >
                    <Box
                      outline={["3px solid #4299e1", "4px solid #4299e1"]}
                      margin="0 auto"
                      rounded="full"
                      w={["25px", "30px", "40px"]}
                      h={["25px", "30px", "40px"]}
                      padding={[0.4, 0.8, 1]}
                    >
                      <Text
                        textAlign="center"
                        fontSize={["md", "xl", "2xl"]}
                        fontWeight={600}
                      >
                        {num}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </HStack>
            </VStack>
          </HStack>
          <Box bg="yellow.300" rounded="xl" p={[2, 2]}>
            <Grid
              templateColumns="repeat(9, 1fr)"
              gap={[1.5, 2]}
              overflow="hidden"
            >
              {Object.keys(numbers).map((number) => (
                <GridItem
                  key={number}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <HStack
                    boxSizing="content-box"
                    bg={numbers[number] ? "#4299e1" : "white"}
                    justifyContent="center"
                    boxShadow="lg"
                    padding={[1, 1.5, 2]}
                    rounded="full"
                  >
                    <Box
                      margin="0 auto"
                      rounded="full"
                      w={["25px", "28px", "40px"]}
                      h={["25px", "28px", "40px"]}
                      padding={[0.5]}
                      outline={[
                        "2.5px solid #4299e1",
                        "3px solid #4299e1",
                        "4px solid #4299e1",
                      ]}
                    >
                      <Text
                        textAlign="center"
                        fontSize={["md", "xl", "2xl"]}
                        fontWeight="bold"
                        lineHeight={[1.6, 1.4, 1.6]}
                      >
                        {number}
                      </Text>
                    </Box>
                  </HStack>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}

export default App;
