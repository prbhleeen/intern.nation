import React from "react";

const DriveCard = ({ drive }) => {
  return (
    <article className={`card ${drive.postType === "Job" ? "fresher-job" : "internship"}`}>
      <div className="card-top">
        <span className="status-tag">Actively hiring</span>
        <img
          src={`/assets/${drive.companyName.toLowerCase()}.png`}
          alt="Company Logo"
          className="company-logo"
        />
      </div>

      <h4 className="job-title">{drive.jobTitle}</h4>
      <p className="company-name">{drive.companyName}</p>

      <div className="card-details">
        <p className="detail">📍 {drive.locationType}</p>
        <p className="detail">{drive.salary}</p>
        <p className="detail">📅 {drive.duration}</p>
      </div>

      <div className="card-footer">
        <span className="type-tag">{drive.postType}</span>
        <a className="view-details-link">View Details &gt;&gt;</a>
      </div>
    </article>
  );
};

export default DriveCard;
