import { useState } from 'react';

function App() {
  const [inputData, setInputData] = useState('');
  const [formattedData, setFormattedData] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const formatData = () => {
    const lines = inputData.split('\n');
    let formatted = "";
    let isValid = true;

    for (const line of lines) {
      const parts = line.split('\t').map(part => part.split(' '));
      if (parts.length !== 3) {
        isValid = false;
        setFormattedData(''); // Clear formatted data if input is not valid
        setAlertMessage("Input format is not valid. Please use the format: `field_name its_description data_type`.");
        return; // Exit the loop on the first invalid input
      }
      const fieldName = parts[0][0];
      const descriptionParts = parts[1];
      const description = descriptionParts[0] + " " + descriptionParts.slice(1).join(' ');
      const dataType = parts[2][0];
      formatted += `| ${fieldName} | ${description} | ${dataType} |\n`;
    }

    if (isValid) {
      setAlertMessage(""); // Clear any previous error message
      setFormattedData(formatted);
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-screen">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-500 mt-[50px]">SCR API DOC FORMATTER</h1>
      <div className='flex flex-col items-center mt-[50px]'>
        <p className="mb-2 text-2xl">Enter your data in the format:  <span className='text-red-500'>`field_name its_description data_type`</span>, one entry per line.</p>
        <textarea
          className="h-32 p-2 rounded border border-gray-400 focus:outline-none focus:via-amber-400 w-[60%] focus:ring-blue-500"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        ></textarea>
      </div>
      <br />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-cyan-600 cursor-pointer mx-[375px]"
        onClick={formatData}
      >
        Format Data
      </button>

      <div className="mt-4 flex flex-col items-center">
        {alertMessage && (
          <div className="text-red-600 text-xl">{alertMessage}</div>
        )}
        {formattedData && !alertMessage && (
          <div className='w-[60%] mt-[30px]'>
            <h2 className="text-2xl text-green-700 font-bold mb-2">Formatted Data:</h2>
            <pre className="bg-gray-200 p-2 rounded">
              {formattedData}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
