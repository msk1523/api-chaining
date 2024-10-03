import React from 'react';

const DataFlowVisualizer = ({ chain }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Data Flow:</h2>
      <div className="flex items-center">
        {chain.map((node, index) => (
          <React.Fragment key={index}>
            <div className="bg-gray-200 p-2 rounded">
              {node.type} Request
            </div>
            {index < chain.length - 1 && (
              <div className="mx-2">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DataFlowVisualizer;