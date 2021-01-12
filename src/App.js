import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import DNSOptions from "./DNSOptions";
import CNameOptions from "./CNameOptions";
import TxtOptions from "./TxtOptions";
import MXOptions from "./MXOptions";

function App() {
  return (
    <div className="App">
      <div className="container">
        <DNSOptions />
        <CNameOptions />
        <TxtOptions />
        <MXOptions />
      </div>
    </div>
  );
}

export default App;
