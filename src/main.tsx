import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initTaskEngineAdapter } from './store/taskAdapter';

// Initialize the task event adapter exactly once at app boot,
// decoupled from any component rendering lifecycle.
initTaskEngineAdapter();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
