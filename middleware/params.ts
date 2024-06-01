export const grab_params = (req, res, next) => {
    for (const [key, value] of Object.entries(req.params)) {
        req[key] = value
    }
    next()
}