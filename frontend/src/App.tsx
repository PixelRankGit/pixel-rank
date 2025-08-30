import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { MainPage } from './routes/MainPage'
import { Login } from './routes/Login'
import { AuthProvider } from "./context/authContext"; 
import { Profile } from './routes/Profile'

function App() {

    return (
        <AuthProvider>
        <>
            <BrowserRouter>
                <Routes>
                    <Route path ='/' element={<MainPage/>}/>
                    <Route path ='/login' element={<Login/>}/>
                    <Route path = '/profile' element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </>
        </AuthProvider>
    )
}

export default App
