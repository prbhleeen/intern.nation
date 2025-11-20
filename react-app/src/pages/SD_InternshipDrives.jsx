import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DriveCard from "../components/DriveCard";

const SD_InternshipDrives = () => {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/drives")
      .then(res => res.json())
      .then(data => {
        setInternships(data.filter(d => d.postType === "Internship"));
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <h2>Active Internship Drives</h2>

        <div className="opportunities-grid">
          {internships.map(i => (
            <DriveCard key={i.id} drive={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SD_InternshipDrives;
