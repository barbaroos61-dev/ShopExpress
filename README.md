# EshopVista Frontend

This is a frontend-only version of EshopVista, ready for deployment to Vercel.

## Features

- React-based e-commerce frontend
- Responsive design with Tailwind CSS
- Product browsing and filtering
- Shopping cart functionality
- Mock API for demonstration purposes

## Deployment to Vercel

1. Create a new project on Vercel
2. Connect your Git repository
3. Set the following configuration:
   - Framework Preset: Vite
   - Root Directory: client
   - Build Command: `npm run build`
   - Output Directory: dist
4. Deploy!

## Development

To run locally:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Notes

This frontend uses a mock API service instead of a real backend, making it perfect for static hosting platforms like Vercel.