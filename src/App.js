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
        <div className="row">
          <div className="col-md-3">Navigation Items</div>
          <div className="col-md-9">
            <DNSOptions/>
            <CNameOptions/>
            <TxtOptions/>
            <MXOptions/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
