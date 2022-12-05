"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const typeorm_1 = require("typeorm");
const Pokemon_1 = require("./Pokemon");
let Type = class Type extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Type.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Type.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Type.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Pokemon_1.Pokemon, (pokemon) => pokemon.types),
    (0, typeorm_1.JoinTable)({
        name: "poke_types",
        joinColumn: {
            name: "type_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "poke_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Type.prototype, "pokemons", void 0);
Type = __decorate([
    (0, typeorm_1.Entity)("types")
], Type);
exports.Type = Type;
