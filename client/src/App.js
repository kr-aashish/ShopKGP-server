import './styles/App.css';
import useFetch from './hooks/useFetch';
import devConfig from './config/dev';
import { useState, useEffect } from 'react';

function App() {
    const prodApiEndpoint = devConfig.apiEndpoints.product;
    const { data, loading, error } = useFetch(prodApiEndpoint);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if (data) {
            setAllProducts(data);
            console.log(data);
        }
    }, [data]);

    if (loading) {
        return <>Loading...</>
    }

    if (error) {
        return <>Error: {error.message}</>
    }

    return (
        <>
        </>
    );
};

export default App;
