// FAQ.js

import React, { useState } from "react";
import Header from "../components/Header";


const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Dummy FAQ data related to workout tracking
  const faqData = [
    {
      question: "How do I log a new workout?",
      answer:
        "To log a new workout, navigate to the 'Log Workout' section and fill in the required details such as exercise type, duration, and intensity. Click 'Submit' to save your workout."
    },
    {
      question: "Can I edit or delete a logged workout?",
      answer:
        "Yes, you can edit or delete a logged workout. Go to the 'History' section, find the workout you want to edit or delete, and use the provided options."
    },
    {
      question: "How can I track my History?",
      answer:
        "The 'History' section provides visual representations of your workout data over time. You can track your progress in terms of duration, intensity, and more."
    },
    {
      question: "Is there a feature to set workout goals?",
      answer:
        "Yes, you can set workout goals in the 'Goals' section. Define specific goals for duration, intensity, or other metrics to stay motivated and focused."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    
    <div className="faq-container-main">
      <Header/>
    <div className="faq-container">
      <h2>Workout Tracking FAQs</h2>
      <div className="faq-list">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">{item.question}</div>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQ;
