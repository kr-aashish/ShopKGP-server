const devConfig = {
    apiEndpoints : {
        product: "http://localhost:4000/product",
        productById: (id) => `http://localhost:4000/product/${id}`,
        createProduct: "http://localhost:4000/product/create",
        user: "http://localhost:4000/user",
    }
}

export default devConfig;