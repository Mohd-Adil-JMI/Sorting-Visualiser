import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  MainContainer,
  Container,
  BarChartContainer,
  Number,
  MakeBar,
} from "./components/Bar";
function App() {
  const [disable, setDisable] = useState(false);
  const [size, setSize] = useState();
  const [delay, setDelay] = useState(20);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [array, setArray] = useState([]);
  const [swapidx, setSwapidx] = useState([-1, -1]);
  const [width, setWidth] = useState(0);
  const generateArray = (size) => {
    const randomArray = [];
    for (let i = 0; i < size; i++) {
      randomArray.push(Math.floor(Math.random() * 100));
    }
    setArray(randomArray);
  };
  const handleArray = (e) => {
    setSize(e.target.value);
    setWidth(80 / e.target.value);
    generateArray(e.target.value);
  };
  function wait(delay) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, delay);
    });
  }
  const handleReset = () => {
    setDisable(false);
    generateArray(size);
  };
  async function quickSort(arr, l, h) {
    if (l < h - 1) {
      let pivot = arr[l];
      setSwapidx([l, -1]);
      await wait(delay);
      let i = l,
        j = h;
      while (i < j) {
        do {
          i++;
          setSwapidx([i, l]);
          await wait(delay);
        } while (i <= h && arr[i] <= pivot);
        do {
          j--;
          setSwapidx([j, l]);
          await wait(delay);
        } while (j >= l && arr[j] > pivot);
        if (i < j) {
          setSwapidx([i, j]);
          await wait(delay);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
        }
      }
      setSwapidx([l, j]);
      await wait(delay);
      [arr[l], arr[j]] = [arr[j], arr[l]];
      setArray([...arr]);

      await quickSort(arr, l, j);
      await quickSort(arr, j + 1, h);
    }
  }
  async function merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++) L[i] = arr[l + i];
    for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        setSwapidx([k, -1]);
        await wait(delay);
        arr[k] = L[i];
        setArray([...arr]);
        i++;
      } else {
        setSwapidx([k, -1]);
        await wait(delay);
        arr[k] = R[j];
        setArray([...arr]);
        j++;
      }
      k++;
    }
    while (i < n1) {
      setSwapidx([k, -1]);
      await wait(delay);
      arr[k] = L[i];
      setArray([...arr]);
      i++;
      k++;
    }
    while (j < n2) {
      setSwapidx([k, -1]);
      await wait(delay);
      arr[k] = R[j];
      setArray([...arr]);
      j++;
      k++;
    }
  }

  async function mergeSort(arr, l, r) {
    if (l >= r) {
      return;
    }
    var m = l + parseInt((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
  }

  const handleSubmit = async () => {
    setDisable(true);
    console.log(size, delay, algorithm);
    if (algorithm === "bubbleSort") {
      let copy = [...array];
      for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          setSwapidx([j + 1, -1]);
          if (copy[j] > copy[j + 1]) {
            [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
            setArray([...copy]);
          }
          await wait(delay);
        }
      }
    } else if (algorithm === "insertionSort") {
      let copy = [...array];
      for (let i = 1; i < copy.length; i++) {
        let key = copy[i];
        let j = i - 1;
        while (j >= 0 && copy[j] > key) {
          setSwapidx([j + 1, -1]);
          await wait(delay);
          copy[j + 1] = copy[j];
          copy[j] = key;
          j--;
          setArray([...copy]);
        }
        setArray([...copy]);
      }
    } else if (algorithm === "quickSort") {
      let copy = [...array];
      await quickSort(copy, 0, copy.length);
    } else if (algorithm === "mergeSort") {
      let copy = [...array];
      await mergeSort(copy, 0, copy.length - 1);
    } else if (algorithm === "selectionSort") {
      let copy = [...array];
      for (let i = 0; i < copy.length - 1; i++) {
        let min = i;
        for (let j = i + 1; j < copy.length; j++) {
          setSwapidx([min, j]);
          if (copy[j] < copy[min]) {
            min = j;
          }
          await wait(delay);
        }
        setSwapidx([i, min]);
        await wait(delay);
        [copy[i], copy[min]] = [copy[min], copy[i]];
        setArray([...copy]);
      }
    }
    setSwapidx([-1, -1]);
    setDisable(false);
  };
  return (
    <div className="App">
      <header>
        <h1>Sorting Visualiser</h1>
      </header>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Size"
            type="number"
            disabled={disable}
            onChange={handleArray}
            name="size"
            value={size}
          />
          <TextField
            required
            id="outlined-required"
            label="Delay"
            type="number"
            disabled={disable}
            onChange={(e) => setDelay(e.target.value)}
            name="delay"
            value={delay}
          />
          <TextField
            select
            required
            label="Algorithm"
            value={algorithm}
            disabled={disable}
            onChange={(e) => setAlgorithm(e.target.value)}
            name="algorithm"
          >
            <MenuItem value="bubbleSort">Bubble Sort</MenuItem>
            <MenuItem value="insertionSort">Insertion Sort</MenuItem>
            <MenuItem value="selectionSort">Selection Sort</MenuItem>
            <MenuItem value="quickSort">Quick Sort</MenuItem>
            <MenuItem value="mergeSort">Merge Sort</MenuItem>
          </TextField>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={disable}
        >
          Sort
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleReset}
          disabled={disable}
        >
          Reset
        </Button>
      </Box>
      <Container>
        <MainContainer>
          {array.map((height, i) => {
            return (
              <BarChartContainer key={i}>
                <Number>{height}</Number>
                <MakeBar
                  height={height}
                  width={width}
                  color={swapidx.includes(i) ? "red" : "black"}
                />
              </BarChartContainer>
            );
          })}
        </MainContainer>
      </Container>
    </div>
  );
}

export default App;
