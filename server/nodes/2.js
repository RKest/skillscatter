

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BtgMkR9a.js","_app/immutable/chunks/scheduler.BbRYtTH3.js","_app/immutable/chunks/index.DDFDAkG7.js","_app/immutable/chunks/index.BuJEOqSa.js","_app/immutable/chunks/preload-helper.D6kgxu3v.js"];
export const stylesheets = ["_app/immutable/assets/2.DKYFMLMw.css"];
export const fonts = [];
