
export {
    Amp, Deamp
} from '@hamstudy/flamp';

export {
    MT63Client, initialize, setFileLocation, wasmModule, readyPromise
} from '@hamstudy/mt63-wasm';

import {
    setFileLocation, initialize as initMt63, MT63Client
} from '@hamstudy/mt63-wasm';

import {
    Compressor
} from '@hamstudy/flamp/dist/compressor';

export const wasmPath = require('@hamstudy/mt63-wasm/dist/mt63Wasm.wasm');

let rootPath = "";
let initPromise: Promise<MT63Client>;
export function init(path?: string) {
    if (!initPromise) {
        setFileLocation('mt63Wasm.wasm', path + wasmPath);
        initPromise = initMt63().then(() => {
            let mtc = new MT63Client();
            Compressor.addCompressor({
                prefix: "\u0001LZMA",
                compress: mtc.lzmaEncode,
                decompress: mtc.lzmaDecode
            });

            return mtc;
        });
    }
    return initPromise;
}

