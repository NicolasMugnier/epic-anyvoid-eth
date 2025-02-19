import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import FrameSDK from '@farcaster/frame-sdk';
import { useEffect, ReactNode } from 'react';

function FarcasterFrameProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      setTimeout(() => {
        FrameSDK.actions.ready()
      }, 500);
    };
    init();
  }, []);
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FarcasterFrameProvider>
      <App />
    </FarcasterFrameProvider>
  </StrictMode>,
)
