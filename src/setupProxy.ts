import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3005',
      changeOrigin: true,
    })
  );
}
