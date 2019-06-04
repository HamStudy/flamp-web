
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
setFileLocation('mt63Wasm.wasm', wasmPath);
initMt63().then(() => {
    let mtc = new MT63Client();
    Compressor.addCompressor({
        prefix: "\u0001LZMA",
        compress: mtc.lzmaEncode,
        decompress: mtc.lzmaDecode
    });
});
