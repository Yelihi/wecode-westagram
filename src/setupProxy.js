const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // 5000 은 서버 포트번호
      changeOrigin: true,
    })
  );
};
