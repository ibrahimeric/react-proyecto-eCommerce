import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
/* Importamos todos los componentes */
import Header from './Header';
import Slider from './Slider';
import Body from './Body';
import Footer from './Footer';
import Error404 from './Error404';
import Signup from './Signup';
/* Importamos el hook useState */
import { useState } from 'react';
/* Importamos el archivo data.js que contiene los productos */
import {data} from '../Js/data.js'
/* Importamos los componentes Routes, Route y BrowserRouter al cual asignamos el alias Router */
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { About } from './About';

function App() {
  /* Declaramos la constante allproducts para almacenar los productos del carrito y le asignamos como valor una matriz vacia */
  const [allProducts, setAllProducts] = useState([]);
  /* Declaramos la constante total para almacenar el monto total de la suma de los productos del carrito y le asignamos el valor 0 */
  const [total, setTotal] = useState(0);
  /* Declaramos la constante countProducts para almacenar la cantidad total de productos del carrito y le asignamos el valor 0 */
  const [countProducts, setCountProducts] = useState(0);
  /* Declaramos la constante categorias para almacenar la categoria de productos que se debe mostrar y le asignamos el valor 'OFERTAS' para que sea la primera categoria que se muestre */
  const [categorias, setCategorias] = useState('OFERTAS');

  let product = (data.filter((dato) =>
    dato.categoria.toLowerCase().includes('oferta'.toLocaleLowerCase())))
  /* Declaramos la constante products para almacenar los productos que se deben mostrar y le asignamos como valor el contenido de la variable product */
  const [products, setProducts] = useState(product);
  /* Declaramos la constante animate para indicar si se debe mostrar una animacion y le asignamos el valor 0 */
  const [animate, setAnimate] = useState(0);
  /* Declaramos la constante contacto para indicar si se debe mostrar el formulario de contacto y le asignamos el valor false*/
  const [contacto, setContacto] = useState(false);

  return (
    <div className="App">
      {/* Utilizamos el alias Router que hace referencia al componente BrowserRouter para proveer de rutas a la aplicación */}
      <Router>
        {/* Iniciamos el componente Header y le pasamos los parametros necesarios */}
        <Header allProducts = {allProducts} setAllProducts = {setAllProducts} 
        total = {total} setTotal = {setTotal} 
        countProducts = {countProducts} setCountProducts = {setCountProducts}
        setProducts = {setProducts}
        setCategorias = {setCategorias}
        animate = {animate} setAnimate = {setAnimate}
        contacto = {contacto} setContacto = {setContacto}/>

        {/* Utilizamos el componente Routes que se encarga de renderizar el componente Route cuya ruta coincida con la URL ingresada por el usuario */}
        <Routes>
          {/* Utilizamos el componente Route para llamar a los componentes que necesitamos cargar en caso de que el usuario ingrese una ruta especifica */}
          <Route path="/" element={<>
          {/* Iniciamos el componente Slider */}
            <Slider/>
            {/* Iniciamos el componente Body y le pasamos los parametros necesarios */}
            <Body allProducts = {allProducts} setAllProducts = {setAllProducts} 
            total = {total} setTotal = {setTotal} 
            countProducts = {countProducts} setCountProducts = {setCountProducts}
            products = {products}
            categorias = {categorias}
            setAnimate = {setAnimate}/>
            </>} />
            <Route path='/login' element={<Signup/>}/>
            <Route path='/about' element={<About></About>}/>  
            {/* en caso de que la URL ingresada por el usuario no coincida con la ruta de ningun Route Mostramos el Error 404 colocando un asterisco como valor en la ruta del Route */}
            <Route path='*' element={<Error404/>}/>
            
        </Routes>

        {/* Iniciamos el componente Header y le pasamos los parametros necesarios */}
        <Footer
        setProducts = {setProducts}
        setCategorias = {setCategorias}
        setContacto = {setContacto}/>
      </Router>
    </div>
  );
}

export default App;
