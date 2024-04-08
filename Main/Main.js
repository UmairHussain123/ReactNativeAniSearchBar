import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import App from '../App';

const Main = () => {
  const theme = {
    // ...DefaultTheme,
    // roundness: 2,
    // colors: {
    //   ...DefaultTheme.colors,
    //   primary: '#3498db',
    //   accent: '#f1c40f',
    // },
  };
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
};

export default Main;
