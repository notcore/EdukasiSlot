import { createBrowserRouter } from 'react-router-dom'
                                                                
// ? Page
import Home from "@/pages/home";
import Game from "@/pages/game";
import Auto from "@/pages/auto";

// !Register route!
const router = createBrowserRouter([
    {
        path : '/',
        element : <Home />
    },
    {
        path : '/game',
        element : <Game />
    },
    {
        path : '/auto',
        element : <Auto />
    },
])

export default router;