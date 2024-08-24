import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.DMCmkgBx.js","_app/immutable/chunks/scheduler.BbRYtTH3.js","_app/immutable/chunks/index.DDFDAkG7.js"];
export const stylesheets = ["_app/immutable/assets/0.jVa1_VDW.css"];
export const fonts = [];
