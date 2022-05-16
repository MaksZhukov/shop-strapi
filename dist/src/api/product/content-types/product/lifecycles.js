"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const slugify_1 = __importDefault(require("slugify"));
exports.default = {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.id && data.name) {
            data.slug = (0, slugify_1.default)(data.name, { lower: true }) + "-" + data.id;
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.id && data.name) {
            data.slug = (0, slugify_1.default)(data.name, { lower: true }) + "-" + data.id;
        }
    },
};
