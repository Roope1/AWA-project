import TestComponent from './components/TestComponent.tsx';
import { TopBar } from './components/TopBar.tsx';

function App() {
  return (
    <div className="App bg-background h-screen ">
      <TopBar />
      <TestComponent />
    </div>
  );
}

export default App;
