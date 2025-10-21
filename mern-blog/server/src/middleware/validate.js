export const validate = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.validateAsync(req.body, { abortEarly: false });
        req.body = parsed;
        next();
    } catch (err) {
        const details = err.details?.map(d => d.message) || ['Invalid input'];
        res.status(422).json({ errors: details });
    }
};
