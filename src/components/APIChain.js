import React from 'react';
import APINode from './APINode';

const APIChain = ({ chain, updateNode }) => {
  return (
    <div>
      {chain.map((node, index) => (
        <APINode
          key={index}
          type={node.type}
          config={node.config}
          onChange={(config) => updateNode(index, config)}
        />
      ))}
    </div>
  );
};

export default APIChain;