import { useState } from 'react'
import CryptoJS from 'crypto-js';
import axios from 'axios';

import './App.css'

function App() {
  const [result, setResult] = useState('');
  const [decrypted, setDecrypted]=useState('');
  const [encryptedString, setEncryptedString]=useState('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')
  const [apiUrl, setApiUrl] = useState('https://kmurg3d16m.execute-api.eu-west-1.amazonaws.com/prod/search');
  const [httpMethod, setHttpMethod] = useState('POST');

  const decryptionKey = "~~~~####Adr1anA####~~~~";
  
  const makeApiCall = () => {
    const requestData = {
      // Include any request data as per the API's requirements
    };
    axios({
      method: httpMethod,
      url: apiUrl,
      // data: { data: requestData },
    })
      .then(response => {
        // Use response.data instead of response.json()
        const data = response.data;
    
        // Decrypt the response data
        const decryptedData = CryptoJS.AES.decrypt(data, decryptionKey).toString(CryptoJS.enc.Utf8);
        setResult(decryptedData);
        
      })
      .catch(error => {
        console.error(error);
        setResult("Error Calling API");
      });
  };

  const decryptText = () => {
    // Decrypt the string using CryptoJS
    const decryptedText = CryptoJS.AES.decrypt(encryptedString, decryptionKey).toString(CryptoJS.enc.Utf8);
    setDecrypted(decryptedText);
  };

  return (
    <>
      <div>
      <h1>Crypto App</h1>
      <select value={httpMethod} onChange={e => setHttpMethod(e.target.value)}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>

      <input
        type="text"
        value={apiUrl}
        onChange={e => setApiUrl(e.target.value)}
        placeholder="Enter API URL"
      />
      <br />
      <button onClick={makeApiCall}>Make API Call</button>
      <div>
        <h2>Response:</h2>
        <div  style={{ border: '1px solid #CCC' }}>{result}</div>
      </div>

      <br />
      <p><b>Decrypt Manually</b></p>
      <textarea
        value={encryptedString}
        onChange={e => setEncryptedString(e.target.value)}
        placeholder="Enter encrypted string"
        className="textarea-style"
      ></textarea>
      <br />

      <button onClick={decryptText}>Decrypt Text</button>
      <div>
        <h2>Response:</h2>
        <div  style={{ border: '1px solid #CCC' }}>
         {decrypted}
        </div>
      </div>

    </div>

    </>
  )
}

export default App
