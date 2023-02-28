import './styles/App.css';
import useFetch from './hooks/useFetch';
import devConfig from './config/dev';
import { useState, useEffect } from 'react';

import { useState, useEffect} from 'react';
import axios from 'axios';

function Home() {
    // const [data, setData] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const prodApiEndpoint = devConfig.apiEndpoints.product;

    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.get(prodApiEndpoint).then((response) => {
                    setAllProducts(response.data);
                });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    if (loading) {
        return <>Loading...</>
    }

    if (error) {
        return <>Error: {error.message}</>
    }

    return (
        <> 
            {allProducts.map((value, key) => {
                return <>{value.name}</>;
            })}
        </>
    );
}


export default Home;
