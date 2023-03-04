const devConfig = {
    apiEndpoints : {
        product: "http://localhost:3001/product",
        productById: (id) => `http://localhost:3001/product/${id}`,
        createProduct: "http://localhost:3001/product/create",
        user: "http://localhost:3001/user",
    }
}

export default devConfig;