import { useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ToolWrapper } from './components/ToolWrapper';
import type { ToolId } from './types';
import { toolsList } from './toolsList';

function App() {
  const [currentTool, setCurrentTool] = useState<ToolId | null>(null);

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
