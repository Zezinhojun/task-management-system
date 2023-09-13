function errorHandler(err, req, res, next) {
    console.error(err.stack); // Registra o erro no console para fins de depuração
    res.status(500).json({ message: 'Ocorreu um erro interno no servidor' });
}

function throwErrorIfNotFound(item, errorMessage, statusCode) {
    if (!item) {
        const error = new Error(errorMessage);
        error.statusCode = statusCode;
        throw error;
    }
}

module.exports = {
    errorHandler,
    throwErrorIfNotFound,
};
