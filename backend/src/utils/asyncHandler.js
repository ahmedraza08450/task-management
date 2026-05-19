const asyncHanlder = (requestHanlder) => {
    return (req, res, next) => {
        Promise.resolve(requestHanlder(req, res, next)).catch(next);
    }
}

export default asyncHanlder