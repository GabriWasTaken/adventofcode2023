import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DayList from "./DayList";
import ProblemOfTheDay from "./ProblemOfTheDay";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DayList />} />
            <Route path="/:id" element={<ProblemOfTheDay />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
