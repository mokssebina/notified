import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Components/LayoutElements/Layout';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/Routes';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from './Context/AuthContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { NotifyProvider } from 'react-notify-sdk';


function App() {

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <NotifyProvider projectId='LWTqYqSqwZlISK' />
          <Toaster />
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
