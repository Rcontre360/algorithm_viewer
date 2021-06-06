import React from "react"
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import grey from "@material-ui/core/colors/grey";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

import store from '@shared/redux/store'
import Page from "@modules/graph";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: purple['100'],
			main: purple['200'],
			dark: purple['300'],
		},
		secondary: {
			light:green['100'],
			main:green['200'],
			dark:green['300'],
		},
		background:{
			default:grey['900'],
			paper:grey['800'],
		},
		type:'dark'
	},
});

export default function App(){
	return (
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Provider store={store}>
				<Page />
			</Provider>
		</ThemeProvider>
  </React.StrictMode >
	)
}