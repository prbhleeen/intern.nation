import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DriveCard from "../components/DriveCard";

const SD_PlacementDrives = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/drives")
      .then(res => res.json())
      .then(data => {
        setPlacements(data.filter(d => d.postType === "Job"));
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Active Placement Drives</h2>

        <div className="opportunities-grid">
          {placements.map(p => (
            <DriveCard key={p.id} drive={p} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SD_PlacementDrives;
