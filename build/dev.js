// 参考API https://esbuild.github.io/api/
import esbuild from 'esbuild'
const ctx = await esbuild.context({
    entryPoints: ['../src/index.ts'],
    outfile: '../test/redcharts.js',
    format: 'esm',
    sourcemap: true,
    bundle: true,
    define: {
        'process.env.NODE_ENV': '"development"',
        '__DEV__': 'true'
    }
})
await ctx.watch()
await ctx.serve({
    servedir: '../test',
    port:8098
}).then(({port, host}) => {
    console.log(`dev server started. host:${host}, port: ${port}`)
})

