import { useRef, useState } from "react";

const Home = () => {
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

  const getRandomNum = (): number => {
    const num = arrNum[Math.floor(Math.random() * arrNum.length)];
    return num;
  };

  const playsound = (num: number | string) => {
    const audio = document.createElement("audio");
    audio.src = `/src/audios/${num}.mp3`;
    audio.play();
  };

  const intervalRef = useRef<number>(0);

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
      const intervalId: number = setInterval(() => {
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
      clearInterval(intervalRef.current);
      playsound("stop");
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 w-11/12 sm:w-96 bg-red-700 rounded-lg p-4">
        <div className="w-full bg-yellow-400 rounded-lg overflow-hidden">
          <div className="flex p-4 gap-2">
            <div className="flex flex-col justify-center items-center">
              <div className="w-20 h-20 bg-white p-3 rounded-full">
                <div className="w-14 h-14 bg-blue-400 p-2 rounded-full">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <h3 className="text-2xl font-bold">{number}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-md font-bold">BOLA:</p>
                <p className="-mt-1 text-md font-bold">{count} / 90</p>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex max-w-prose flex-col">
                <div className="flex justify-around">
                  <div
                    onClick={handleStartClick}
                    className="cursor-pointer select-none flex w-14 h-14 justify-center py-2 bg-red-700 rounded-md transition-all duration-75 border-b-4 border-r-4 border-red-800 active:translate-y-1 active:border-none"
                  >
                    play
                  </div>
                  <div
                    onClick={handleStopClick}
                    className="cursor-pointer select-none flex w-14 h-14 justify-center py-2 bg-red-700 rounded-md transition-all duration-75 border-b-4 border-r-4 border-red-800 active:translate-y-1 active:border-none"
                  >
                    stop
                  </div>
                  {!isStart && (
                    <div
                      onClick={handleResetClick}
                      className="cursor-pointer select-none flex w-14 h-14 justify-center py-2 bg-red-700 rounded-md transition-all duration-75 border-b-4 border-r-4 border-red-800 active:translate-y-1 active:border-none"
                    >
                      reset
                    </div>
                  )}
                </div>
                <div className="mt-4 h-14  bg-red-700 rounded-md">
                  <div className="h-full px-1 flex items-center overflow-x-auto gap-1">
                    {history.map((num) => (
                      <div
                        key={num}
                        className="w-10 h-10 bg-white p-1 rounded-full"
                      >
                        <div className="w-8 h-8 bg-blue-400 p-1 rounded-full">
                          <div className="w-6 h-6  bg-white rounded-full flex items-center justify-center">
                            <h3 className="text-md font-bold">{num}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-yellow-400 rounded-lg">
          <div className="p-1 grid grid-cols-9 gap-x-1 gap-y-2">
            {Object.keys(numbers).map((number) => {
              if (numbers[number]) {
                return (
                  <div
                    key={number}
                    className="flex justify-center items-center"
                  >
                    <div className="w-8 h-8 bg-blue-400 p-1 rounded-full">
                      <div className="w-6 h-6 bg-blue-400 p-1 rounded-full">
                        <div className="w-4 h-4  bg-blue-400 rounded-full flex items-center justify-center">
                          <h3 className="text-sm font-bold">{number}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key={number} className="flex justify-center items-center">
                  <div className="w-8 h-8 bg-white p-1 rounded-full">
                    <div className="w-6 h-6 bg-blue-400 p-1 rounded-full">
                      <div className="w-4 h-4  bg-white rounded-full flex items-center justify-center">
                        <h3 className="text-sm font-medium">{number}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
