import { BrowserRouter, Routes, Route } from "react-router-dom";

import SD_PlacementDrives from "../pages/SD_PlacementDrives";
import SD_InternshipDrives from "../pages/SD_InternshipDrives";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/placements" element={<SD_PlacementDrives />} />
        <Route path="/internships" element={<SD_InternshipDrives />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
