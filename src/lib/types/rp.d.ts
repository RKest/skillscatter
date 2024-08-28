// TypeScript bindings for emscripten-generated code.  Automatically generated at compile time.
declare namespace RuntimeExports {
    let HEAPF32: any;
    let HEAPF64: any;
    let HEAP_DATA_VIEW: any;
    let HEAP8: any;
    let HEAPU8: any;
    let HEAP16: any;
    let HEAPU16: any;
    let HEAP32: any;
    let HEAPU32: any;
    let HEAP64: any;
    let HEAPU64: any;
}
interface WasmModule {
}

export type Point = {
  x: number,
  y: number
};

export type Rect = {
  lft: number,
  top: number,
  rgt: number,
  bot: number
};

export type IndexPair = {
  src: number,
  dst: number
};

export interface Bounds {
  push_back(_0: Rect): void;
  resize(_0: number, _1: Rect): void;
  size(): number;
  get(_0: number): Rect | undefined;
  set(_0: number, _1: Rect): boolean;
  delete(): void;
}

export type Polygon = {
  rects: Bounds
};

export interface FloatVec {
  push_back(_0: number): void;
  resize(_0: number, _1: number): void;
  size(): number;
  get(_0: number): number | undefined;
  set(_0: number, _1: number): boolean;
  delete(): void;
}

export interface Polygons {
  push_back(_0: Polygon): void;
  resize(_0: number, _1: Polygon): void;
  size(): number;
  get(_0: number): Polygon | undefined;
  set(_0: number, _1: Polygon): boolean;
  delete(): void;
}

export interface Indices {
  push_back(_0: IndexPair): void;
  resize(_0: number, _1: IndexPair): void;
  size(): number;
  get(_0: number): IndexPair | undefined;
  set(_0: number, _1: IndexPair): boolean;
  delete(): void;
}

export interface Points {
  push_back(_0: Point): void;
  resize(_0: number, _1: Point): void;
  size(): number;
  get(_0: number): Point | undefined;
  set(_0: number, _1: Point): boolean;
  delete(): void;
}

interface EmbindModule {
  Bounds: {new(): Bounds};
  FloatVec: {new(): FloatVec};
  Polygons: {new(): Polygons};
  Indices: {new(): Indices};
  Points: {new(): Points};
  place(_0: Polygons, _1: Indices, _2: FloatVec, _3: Point): Points;
}

export type MainModule = WasmModule & typeof RuntimeExports & EmbindModule;
export default function MainModuleFactory (options?: unknown): Promise<MainModule>;
