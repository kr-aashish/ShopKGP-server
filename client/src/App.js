import './styles/App.css';
import useFetch from './hooks/useFetch';
import devConfig from './config/dev'

function App() {
    const prodApiEndpoint = devConfig.apiEndpoints.product;
    const { data, loading, error } = useFetch(prodApiEndpoint);

    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        return <>Error: {error.message}</>
    }

    console.log(data);

    return (
        <>
        {/* <ul>
            {data.map((product) => (
                <li key={product.name}>{product.description}</li>
            ))}
        </ul> */}
        </>
    );
};

export default App;