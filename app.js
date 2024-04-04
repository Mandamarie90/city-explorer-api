import React from 'react';
import Weather from './Weather';

const App = () => {
  return (
    <div>
      <h1>Weather App</h1>
      <Weather lat={47.6062} lon={-122.3321} /> {/* Example latitude and longitude */}
    </div>
  );
};

export default App;
