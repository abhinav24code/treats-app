import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GroupLayout from "./layouts/GroupLayout";
import GroupDashboard from "./pages/GroupDashboard";
import AddTreat from "./pages/AddTreat";
import Leaderboard from "./pages/Leaderboard";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/join-group" element={<JoinGroup />} />

        <Route path="/group/:code" element={<GroupLayout />}>
          <Route index element={<GroupDashboard />} />
          <Route path="add-treat" element={<AddTreat />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
