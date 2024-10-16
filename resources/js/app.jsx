import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-notifications/lib/notifications.css';
import 'react-toastify/dist/ReactToastify.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';


createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    return pages[`./Pages/${name}.jsx`];
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
  
});


