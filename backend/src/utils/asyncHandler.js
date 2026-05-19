const asyncHandler = (requestHanlder) => {
    return (req, res, next) => {
        Promise.resolve(requestHanlder(req, res, next)).catch(next);
    }
}

export default asyncHandler