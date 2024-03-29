import React, { useRef, useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


/* Importamos los componentes Routes, Route y BrowserRouter al cual asignamos el alias Router */
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Loading from './Components/Loading.jsx';
const Header = lazy(() => import('./Components/Header'));
const Slider = lazy(() => import('./Components/Slider'));
const Body = lazy(() => import('./Components/Body'));
const Footer = lazy(() => import('./Components/Footer'));
const Error404 = lazy(() => import('./Components/Error404'));
const Signup = lazy(() => import('./Components/Signup'));
const Register = lazy(() => import('./Components/Register'));
const Compras = lazy(() => import('./Components/Compras'));

function App() {
  /* Declaramos la constante allproducts para almacenar los productos del carrito y le asignamos como valor una matriz vacia */
  const [allProducts, setAllProducts] = useState([]);
  /* Declaramos la constante total para almacenar el monto total de la suma de los productos del carrito y le asignamos el valor 0 */
  const [total, setTotal] = useState(0);
  /* Declaramos la constante countProducts para almacenar la cantidad total de productos del carrito y le asignamos el valor 0 */
  const [countProducts, setCountProducts] = useState(0);
  /* Declaramos la constante categorias para almacenar la categoria de productos que se debe mostrar y le asignamos el valor 'OFERTAS' para que sea la primera categoria que se muestre */
  const [categorias, setCategorias] = useState('OFERTAS');

  // let product = (data.filter((dato) =>
  //   dato.categoria.toLowerCase().includes('oferta'.toLocaleLowerCase())))

  let product = {};
  const [response, setResponse] = useState(null);

  /* Declaramos la constante products para almacenar los productos que se deben mostrar y le asignamos como valor el contenido de la variable product */
  const [products, setProducts] = useState(product);
  /* Declaramos la constante animate para indicar si se debe mostrar una animacion y le asignamos el valor 0 */
  const [animate, setAnimate] = useState(0);
  /* Declaramos la constante contacto para indicar si se debe mostrar el formulario de contacto y le asignamos el valor false*/
  const [contacto, setContacto] = useState(false);

  const sectionProductos = useRef(null),
  sectionInicio = useRef(null);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        // En caso de querer que funcione en el telefono cambiar 192.168.58.199 por la ip de la Pc de la siguiente manera:
        // let dataResponse = await axios.get('http://193.158.3.10:5000/productos')
        let dataResponse = await axios.get('http://localhost:5000/productos')
          setProducts(product = (dataResponse.data.filter((dato) =>
            dato.categoria.toLowerCase().includes('ofertas'.toLocaleLowerCase()))))
        setResponse(dataResponse.data)
      } catch (error) {
        alert('Ocurrió un error inesperado.\nPor favor intente mas tarde')
      }
    };

    fetchData();
  }, []);


  return (
    <div className="App">
      {/* Utilizamos el alias Router que hace referencia al componente BrowserRouter para proveer de rutas a la aplicación */}
      <Router>
        <Suspense fallback={<Loading/>}>
        {/* Iniciamos el componente Header y le pasamos los parametros necesarios */}
        <Header allProducts = {allProducts} setAllProducts = {setAllProducts} 
        total = {total} setTotal = {setTotal} 
        countProducts = {countProducts} setCountProducts = {setCountProducts}
        setProducts = {setProducts}
        setCategorias = {setCategorias}
        animate = {animate} setAnimate = {setAnimate}
        contacto = {contacto} setContacto = {setContacto}
        sectionProductos = {sectionProductos}
        sectionInicio = {sectionInicio}
        data = {response}/>

        {/* Utilizamos el componente Routes que se encarga de renderizar el componente Route cuya ruta coincida con la URL ingresada por el usuario */}
        <Routes>
            {/* Utilizamos el componente Route para llamar a los componentes que necesitamos cargar en caso de que el usuario ingrese una ruta especifica */}
            <Route path="/" element={<>
              <Suspense fallback={<Loading/>}>
                {/* Iniciamos el componente Slider */}
                <Slider/>
                {/* Iniciamos el componente Body y le pasamos los parametros necesarios */}
                <Body allProducts = {allProducts} setAllProducts = {setAllProducts} 
                total = {total} setTotal = {setTotal} 
                countProducts = {countProducts} setCountProducts = {setCountProducts}
                products = {products}
                categorias = {categorias}
                setAnimate = {setAnimate}
                sectionProductos = {sectionProductos}
                sectionInicio = {sectionInicio}/>
              </Suspense>
              </>} />
              <Route path='/login' element={
              <Suspense fallback={<Loading/>}><Signup/></Suspense>}/>
              
              <Route path='/register' element={
              <Suspense fallback={<Loading/>}><Register/></Suspense>}/>
              
              <Route path='/compras' element={
              <Suspense fallback={<Loading/>}><Compras/></Suspense>}/>

              {/* en caso de que la URL ingresada por el usuario no coincida con la ruta de ningun Route Mostramos el Error 404 colocando un asterisco como valor en la ruta del Route */}
              <Route path='*' element={<Suspense fallback={<Loading/>}><Error404/></Suspense>}/>
        </Routes>
        {/* Iniciamos el componente Header y le pasamos los parametros necesarios */}
        <Footer
        setProducts = {setProducts}
        setCategorias = {setCategorias}
        setContacto = {setContacto}
        sectionProductos = {sectionProductos}
        sectionInicio = {sectionInicio}
        data = {response}/>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
