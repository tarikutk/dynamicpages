import { Typography, Container, Stack } from "@mui/material";
import Calculator from "../components/Calculator";

interface QueryParams {
  operation: string;
  first: string;
  second: string;
}
export default function Home(props : QueryParams) : JSX.Element {
  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator {...props}/>
      </Stack>
    </Container>
  );
}

