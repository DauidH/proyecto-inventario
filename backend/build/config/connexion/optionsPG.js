"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsPG = void 0;
const connexionFunction_1 = require("./connexionFunction");
exports.optionsPG = {
    receive(e) {
        (0, connexionFunction_1.camelizeColumns)(e.data);
    },
};
