// import "../styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type { AppProps } from 'next/app'

// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('../mocks')
// }

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function MyApp({ Component, pageProps } : AppProps): JSX.Element {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

