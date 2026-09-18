import { createRoot } from 'react-dom/client';
import App from './Appcomponents.jsx';

const rootElement = document.getElementById('react-root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}