import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import { OutlinedInput } from "@mui/material";
import Alert from '@mui/material/Alert';
import axios from "axios";

import { useState, useRef, ChangeEvent, FormEvent, FocusEvent } from "react";

const Calculator = () : JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [firstError, setFirstError] = useState("")
  const [secondError, setSecondError] = useState("")
  const [opError, setOpError] = useState("")
  const first = useRef<HTMLInputElement>();
  const second = useRef<HTMLInputElement>();
  const operationRef = useRef<HTMLSelectElement>();

  const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  const handleFocus= (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    switch(e.target) {
      case first.current:
        setFirstError("")
        break;
      case second.current:
        setSecondError("")
        break;
      case operationRef.current?.firstChild:
        setOpError("")
        break;
      default :
        setOpError("")
    }
  };

  const handleCalculate = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      operation: operation,
      first: first.current?.value,
      second: second.current?.value,
    };
    
    if(!query.first){
      setFirstError('first cannot be empty')
    }

    if(!query.second){
      setSecondError('second cannot be empty');
    }

    if(!query.operation){
      setOpError('operation cannot be empty');
    }
    
    if(firstError || secondError || opError){
    console.log('errors',{firstError, secondError, opError})
      return;
    }
    
    axios
      .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
      .then((res) => {
        setResult(res.data.result);
      })
      .catch((err) => {
        console.log('catch', err)
        setResult(err.response.data.message);
      });
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
          <TextField
              error={!!firstError}
              id="first"
              label="First Number"
              variant="outlined"
              inputRef={first}
              onFocus={handleFocus}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              error={!!opError}
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
              onFocus={handleFocus}
              ref={operationRef}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
          <TextField
              error={!!secondError}
              id="second"
              label="Second Number"
              variant="outlined"
              inputRef={second}
              onFocus={handleFocus}
            />
          </FormControl>
        </Grid2>
          { firstError ? <Alert severity="error">first cannot be empty</Alert> : ''}
          { secondError ? <Alert severity="error">second cannot be empty</Alert> : ''}
          { opError ? <Alert severity="error">operatiion cannot be empty</Alert>:""}
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
            <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;

