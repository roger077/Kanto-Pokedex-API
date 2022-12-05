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
exports.Pokemon = void 0;
const typeorm_1 = require("typeorm");
const Type_1 = require("./Type");
let Pokemon = class Pokemon extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Pokemon.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Pokemon.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "hp", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "defense", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "speed", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "attack", void 0);
__decorate([
    (0, typeorm_1.Column)("int"),
    __metadata("design:type", Number)
], Pokemon.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar"),
    __metadata("design:type", String)
], Pokemon.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Type_1.Type, (type) => type.pokemons),
    __metadata("design:type", Array)
], Pokemon.prototype, "types", void 0);
Pokemon = __decorate([
    (0, typeorm_1.Entity)('pokemons')
], Pokemon);
exports.Pokemon = Pokemon;
