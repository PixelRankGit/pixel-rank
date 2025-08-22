import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { MainPage } from './routes/MainPage'
import { Login } from './routes/Login'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path ='/login' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
