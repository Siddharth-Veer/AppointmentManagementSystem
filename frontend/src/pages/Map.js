// components/Map.js
import React from 'react';

const Map = ({ location }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d0.1!2d$35.6895!1d$139.6917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1622455541394!5m2!1sen!2sus`;

  return (
    <div className="map">
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={mapUrl}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Map;
