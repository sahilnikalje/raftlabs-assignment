import {render, screen, waitFor} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/CartContext'
import Menu from '../pages/Menu'
import * as api from '../services/api'

test("renders menu items", async()=>{
    jest.spyOn(api, "getMenu").mockResolvedValue([
        {
         _id: "1",
         name: "Pizza",
         description: "Cheese pizza",
         price: 299         
        }
    ])
    render(
        <BrowserRouter>
             <CartProvider>
                  <Menu/>
             </CartProvider>
        </BrowserRouter>
    )

    await waitFor(()=>{
        expect(screen.getByText("Pizza")).toBeInTheDocument()
    })
})