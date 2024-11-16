/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./wines/dto/create-wine.dto"), { "CreateWineDto": {} }], [import("./wines/dto/update-wine.dto"), { "UpdateWineDto": {} }], [import("./wines/entities/wine.entity"), { "Wine": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./wines/wines.controller"), { "WinesController": { "create": { type: String }, "findAll": {}, "findDrafts": {}, "findOne": {}, "update": { type: String }, "remove": { type: String } } }]] } };
};