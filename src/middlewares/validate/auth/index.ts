import { Request, Response, NextFunction } from 'express';

import { check, validationResult } from 'express-validator';

const validateCredentials = [
    check('email')
        .isEmail()
        .withMessage('Invalid email address'),
    check('password')
    .notEmpty()
    .withMessage('Password is required'),
    (
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        next();
    }
];

export { validateCredentials };
