import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'

import { Suspense, lazy } from 'react';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

const App = lazy(() => import('./App.jsx'));
const ProductList = lazy(() => import('./components/ProductList.jsx'));
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'));
const Cart = lazy(() => import('./components/Cart.jsx'));
const Checkout = lazy(() => import('./components/Checkout.jsx'));
const ErrorPage = lazy(() => import('./components/Error.jsx'));
const Login = lazy(() => import('./components/Login.jsx'));
const Register = lazy(() => import('./components/Register.jsx'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<div>Loading...</div>}><App /></Suspense>,
    errorElement: <Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  },
  {
    path: '/product/:id',
    element: <Suspense fallback={<div>Loading...</div>}><ProductDetail /></Suspense>,
    errorElement: <Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  },
  {
    path: '/cart',
    element: <Suspense fallback={<div>Loading...</div>}><Cart /></Suspense>,
    errorElement: <Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  },
  {
    path: '/checkout',
    element: <Suspense fallback={<div>Loading...</div>}><Checkout /></Suspense>,
    errorElement: <Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  },
  {
    path:"/login",
    element:<Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
    errorElement:<Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  },
  {
    path:"/register",
    element:<Suspense fallback={<div>Loading...</div>}><Register /></Suspense>,
    errorElement:<Suspense fallback={<div>Loading...</div>}><ErrorPage /></Suspense>,
  }
]);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
