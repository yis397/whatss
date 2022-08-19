"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressValidator = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const expressValidator = (req, res = express_1.response, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false
        });
    }
    next();
};
exports.expressValidator = expressValidator;
//# sourceMappingURL=validator.js.map