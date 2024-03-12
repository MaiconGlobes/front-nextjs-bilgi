import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.NEXT_PUBLIC_BASE_URL,
      changeOrigin: true,
    })
  );
}
