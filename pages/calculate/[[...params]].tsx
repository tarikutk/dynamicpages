import { Typography, Container, Stack } from "@mui/material";
import Calculator from "../../components/Calculator";
import { GetServerSideProps } from "next";
const operationTypes = ["add", "subtract", "multiply", 'divide']

export const getServerSideProps: GetServerSideProps = async (context) => {
  const params = context.query.params;
  if(
    !params || 
    params.length < 3 || 
    params.length > 3 ||
    !(operationTypes.includes(params[0])) ||
    isNaN(parseInt(params[1])) ||
    isNaN(parseInt(params[2]))
    ){ 
    return { notFound: true };
  }
  return {
    props: {
        operation: params[0],
        first: params[1],
        second: params[2]
    }
  }
  };
  interface QueryParams {
    operation: string;
    first: string;
    second: string;
  }
export default function Calculate(props : QueryParams) : JSX.Element {
    const { operation, first, second} = props;
  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator operation={operation} first={first} second={second}/>
      </Stack>
    </Container>
  );
}

