import React, { useState } from 'react';
import axios from 'axios';
import APIChain from './APIChain';
import DataFlowVisualizer from './DataFlowVisualizer';

const APIBuilder = () => {
  const [apiChain, setApiChain] = useState([]);
  const [result, setResult] = useState(null);

  const addAPINode = (type) => {
    setApiChain([...apiChain, { type, config: {} }]);
  };

  const updateAPINode = (index, config) => {
    const updatedChain = [...apiChain];
    updatedChain[index].config = config;
    setApiChain(updatedChain);
  };

  const executeChain = async () => {
    let data = null;
    for (const node of apiChain) {
      try {
        if (node.type === 'GET') {
          const response = await axios.get(node.config.url, { params: node.config.params });
          data = response.data;
        } else if (node.type === 'POST') {
          const response = await axios.post(node.config.url, node.config.body);
          data = response.data;
        }
      } catch (error) {
        console.error('API Error:', error);
        setResult(`Error: ${error.message}`);
        return;
      }
    }
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Chaining Dashboard</h1>
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => addAPINode('GET')}
        >
          Add GET Request
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => addAPINode('POST')}
        >
          Add POST Request
        </button>
      </div>
      <APIChain chain={apiChain} updateNode={updateAPINode} />
      <button
        className="bg-purple-500 text-white px-4 py-2 rounded mt-4"
        onClick={executeChain}
      >
        Execute Chain
      </button>
      <DataFlowVisualizer chain={apiChain} />
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default APIBuilder;