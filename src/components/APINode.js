import React from 'react';

const APINode = ({ type, config, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...config, [name]: value });
  };

  return (
    <div className="border p-4 mb-4 rounded">
      <h3 className="text-lg font-bold mb-2">{type} Request</h3>
      <div className="mb-2">
        <label className="block mb-1">URL:</label>
        <input
          type="text"
          name="url"
          value={config.url || ''}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {type === 'GET' && (
        <div className="mb-2">
          <label className="block mb-1">Params (JSON):</label>
          <textarea
            name="params"
            value={config.params ? JSON.stringify(config.params) : ''}
            onChange={(e) => {
              try {
                const params = JSON.parse(e.target.value);
                onChange({ ...config, params });
              } catch (error) {
                // Invalid JSON, do nothing
              }
            }}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      )}
      {type === 'POST' && (
        <div className="mb-2">
          <label className="block mb-1">Body (JSON):</label>
          <textarea
            name="body"
            value={config.body ? JSON.stringify(config.body) : ''}
            onChange={(e) => {
              try {
                const body = JSON.parse(e.target.value);
                onChange({ ...config, body });
              } catch (error) {
                // Invalid JSON, do nothing
              }
            }}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      )}
    </div>
  );
};

export default APINode;