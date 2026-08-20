import { RouterProvider } from 'react-router';
import { router } from './routes';
import { Toaster } from 'sonner';
import { FontLoader } from './components/FontLoader';

export default function App() {
  return (
    <>
      <FontLoader />
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}
