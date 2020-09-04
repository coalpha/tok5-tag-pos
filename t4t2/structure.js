/** @typedef {import("./Entry").Whole_o} Whole_o */
/** @typedef {import("./Entry").Whole_t} Whole_t */
/** @typedef {import("./Entry").Token_o} Token_o */
/** @typedef {import("./Entry").Token_t} Token_t */
/** @typedef {import("./Entry").Pos_o} Pos_o */
/** @typedef {import("./Entry").Pos_t} Pos_t */

/**
 * @param {Whole_o} o
 * @returns {Whole_t}
 */
export function whole_o2t(o) {
   return [o.string, o.pos, o.token_type];
}

/**
 * @param {Token_t} t
 * @returns {Token_o}
 */
export function whole_t2o(t) {
   const [string, pos, token_type] = o;
   return ({ string, pos, token_type });
}

/**
 * @param {Token_o} o
 * @returns {Token_t}
 */
export function token_o2t(o) {
   return [o.string, o.token_type];
}

/**
 * @param {Token_t} t
 * @returns {Token_o}
 */
export function token_t2o(t) {
   const [string, token_type] = t;
   return ({ string, token_type });
}
