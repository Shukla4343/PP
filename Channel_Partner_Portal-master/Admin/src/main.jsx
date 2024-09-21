import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from 'react-redux';
import store from './redux/store';

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App />
// );
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path= '/' element=<App />/>
//     </Route>
//   )
// )
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router ={router}/>
//   </React.StrictMode>
// );


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

