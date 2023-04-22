import { TodosProvider } from '../Context';

import { Header } from './Header';
import { Navbar } from './Navbar';
import { Content } from './Content';

import '../styles/styles.scss';

function App() {
  return (
    <TodosProvider>
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Navbar />
          <Content />
        </div>
      </div>
    </TodosProvider>
  );
}

export default App;
