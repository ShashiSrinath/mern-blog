const production = {
    url: {
        API_URL: '/api/v1',
    }
};

const dev = {
    url: {
        API_URL: 'http://localhost:4000/api/v1'
    }
};
export const config = process.env.NODE_ENV === 'development' ? dev : production;