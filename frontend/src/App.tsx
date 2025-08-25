import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { MainPage } from './routes/MainPage'
import { Login } from './routes/Login'
import { AuthProvider } from "./context/authContext";

function App() {

    return (
        <AuthProvider>
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path ='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
        </AuthProvider>
    )
}

export default App
