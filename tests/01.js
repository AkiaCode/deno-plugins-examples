//deno run --unstable --allow-plugin ./tests/01.js

const filenameBase = "deno_plugins_examples";

let filenameSuffix = ".so";
let filenamePrefix = "lib";

if (Deno.build.os === "windows") {
  filenameSuffix = ".dll";
  filenamePrefix = "";
}
if (Deno.build.os === "darwin") {
  filenameSuffix = ".dylib";
}

const filename = `../target/debug/${filenamePrefix}${filenameBase}${filenameSuffix}`;

const rid = Deno.openPlugin(filename);

const { testSync } = Deno.core.ops();

const textDecoder = new TextDecoder();

const response = Deno.core.dispatch(
    testSync,
    new Uint8Array([116, 101, 115, 116]),
    new Uint8Array([49, 50, 51]),
    new Uint8Array([99, 98, 97]),
);

console.log(textDecoder.decode(response))