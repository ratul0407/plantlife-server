"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.Division = exports.Role = void 0;
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["STAFF"] = "STAFF";
    Role["ADMIN"] = "ADMIN";
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
})(Role || (exports.Role = Role = {}));
var Division;
(function (Division) {
    Division["DHAKA"] = "DHAKA";
    Division["CHITTAGONG"] = "CHITTAGONG";
    Division["KHULNA"] = "KHULNA";
    Division["RAJSHAHI"] = "RAJSHAHI";
    Division["SYLHET"] = "SYLHET";
    Division["BARISAL"] = "BARISAL";
    Division["RANGPUR"] = "RANGPUR";
    Division["MYMENSINGH"] = "MYMENSINGH";
})(Division || (exports.Division = Division = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["INACTIVE"] = "INACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
