import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ToolWrapper } from './components/ToolWrapper';
import type { ToolId } from './types';
import { toolsList } from './toolsList';

function App() {
  const [currentTool, setCurrentToolState] = useState<ToolId | null>(null);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/tool/')) {
        const toolId = hash.replace('#/tool/', '') as ToolId;
        // Verify toolId is valid
        if (toolsList.some(t => t.id === toolId)) {
          setCurrentToolState(toolId);
          return;
        }
      }
      setCurrentToolState(null);
    };

    // Run on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setCurrentTool = (toolId: ToolId | null) => {
    if (toolId) {
      window.location.hash = `#/tool/${toolId}`;
    } else {
      window.location.hash = '';
    }
  };

  // Find tool configurations
  const activeToolConfig = currentTool 
    ? toolsList.find((t) => t.id === currentTool) 
    : null;

  return (
    <Layout currentTool={currentTool} setCurrentTool={setCurrentTool}>
      {activeToolConfig ? (
        <ToolWrapper 
          toolConfig={activeToolConfig} 
          setCurrentTool={setCurrentTool} 
        />
      ) : (
        <Home setCurrentTool={setCurrentTool} />
      )}
    </Layout>
  );
}

export default App;
