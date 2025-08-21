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
import { useAuth } from './Context/AuthContext';


function App() {

  const { session } = useAuth()

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <BrowserRouter>
          <NotifyProvider projectKey='LWTqYqSqwZlISK' onClear={session?.user} />
          <Toaster />
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  );
}

export default App;
