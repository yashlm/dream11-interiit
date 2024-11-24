import React from "react";

const ProgressBar = ({ currentStep, steps }) => {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <section className="progress-container">
      <div className="barmarker-container">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`barmarker ${i <= currentStep ? "active" : ""}`}
          >
            {/* Step Icon */}
            <div className="icon-container">{step.icon}</div>
            {/* Step Name */}
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      <progress className="progress" max="100" value={progress}></progress>
    </section>
  );
};

export default ProgressBar;
