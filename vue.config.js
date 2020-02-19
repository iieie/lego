// module.exports={
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:3200/',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     "^/api": ""
//                 }
//             }
//         }
//     }
// }
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3300/',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            },
            '/juhe_api': {
                target: 'http://v.juhe.cn/',
                changeOrigin: true,
                pathRewrite: {
                    "^/juhe_api": ""
                }
            },

        }
    }
}