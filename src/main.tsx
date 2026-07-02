import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "./i18n"
import {Bounce, ToastContainer} from "react-toastify"
createRoot(document.getElementById('root')!).render(
    <>
    <StrictMode>
    <App />

    </StrictMode>
<ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>

</>
)
