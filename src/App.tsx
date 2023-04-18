import { Header } from './Header';
import { Navbar } from './Navbar';
import { Content } from './Content';
import './styles/styles.scss';

function App() {
  return (
    <div className="app-container">
      <Header />
      <div className="content-container">
        <Navbar />
        <Content />
      </div>
    </div>
  );
}

export default App;
