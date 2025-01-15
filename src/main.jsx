import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import GlobalProvider from "./contexts/GlobalContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <App/>
            </GlobalProvider>
        </BrowserRouter>
    </StrictMode>,
)
