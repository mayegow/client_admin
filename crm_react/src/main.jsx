import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import NuevoCliente, {action as nuevoClienteAction} from "./pages/NuevoCliente"
import Index, {loader as clientesLoader} from "./pages/Index"
import ErrorPage from "./components/ErrorPage"
import EditarCliente, { loader as clienteLoader, action as editarClienteAction } from "./pages/EditarCliente"
import {action as eliminarCliente} from './components/Cliente'

const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout />,
      children:[
        {
          index:true,
          element:<Index />,
          loader: clientesLoader,
          errorElement: <ErrorPage/>
        },
        {
          path: "/clientes/nuevo",
          element: <NuevoCliente />,
          action: nuevoClienteAction,
          errorElement: <ErrorPage/>
        },
        //ROUTING DINAMICO
        {
          path: '/clientes/:client_id/editar',
          element:<EditarCliente />,
          loader: clienteLoader,
          action: editarClienteAction,
          errorElement: <ErrorPage/>
        },
        {
          path: 'clientes/:client_id/eliminar',
          action: eliminarCliente,
        }
      ]
    },
    
  ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
