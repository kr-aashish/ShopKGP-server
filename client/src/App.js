import './styles/App.css';
import useFetch from './hooks/useFetch';
import devConfig from './config/dev'
import { useState, useEffect } from 'react';

function App() {
    const [allProducts, setAllProducts] = useState([]);

    const prodApiEndpoint = devConfig.apiEndpoints.product;
    const { data, loading, error } = useFetch(prodApiEndpoint);

    useEffect(() => {
        if (data) {
            setAllProducts(data);
        }
    }, [data]);

    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        return <>Error: {error.message}</>
    }

    console.log(allProducts);

    return (
        <>
        </>
    );
};

export default App;
