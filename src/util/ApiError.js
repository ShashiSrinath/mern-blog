const ApiError = ({status, type, data, message}) => {
    const error = {
        status: status,
        type: type,
        message: message
    };
    if (data) {
        error.data = [];
        for (let i = 0; i < data.length; i++) {
            error.data.push({
                path: data[i].path[0],
                message: data[i].message
            })
        }
    }

    return error;
};

module.exports = ApiError;