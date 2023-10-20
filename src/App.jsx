import { useState } from 'react';

function App() {
  const [inputData, setInputData] = useState('');
  const [formattedData, setFormattedData] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const formatData = () => {
    const lines = inputData.split('\n');
    let formatted = "| field_name | its_description | data_type |\n";
    let isValid = true; // Flag to check the validity of the input data

    for (const line of lines) {
      const parts = line.split('\t').map(part => part.split(' '));
      if (parts.length !== 3) {
        isValid = false;
        break;
      }
      const fieldName = parts[0][0];
      const descriptionParts = parts[1];
      console.log(descriptionParts)
      const description = descriptionParts[0] + " " + descriptionParts.slice(1).join(' ');
      const dataType = parts[2][0];
      formatted += `| ${fieldName} | ${description} | ${dataType} |\n`;
    }

    if (!isValid) {
      setAlertMessage("Input format is not valid. Please use the format: `field_name its_description data_type`.");
    } else {
      setAlertMessage(""); // Clear any previous alert message
      setFormattedData(formatted);
    }
  };

  return (
    <div>
      <h1>Input Formatter</h1>
      <p>Enter your data in the format: `field_name its_description data_type`, one entry per line.</p>
      <textarea
        rows="10"
        cols="50"
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      ></textarea>
      <br />
      <button onClick={formatData}>Format Data</button>
      <div>
        <h2>Formatted Data:</h2>
        {alertMessage ? (
          <div className="alert">{alertMessage}</div>
        ) : (
          <pre>{formattedData}</pre>
        )}
      </div>
    </div>
  );
}

export default App;
