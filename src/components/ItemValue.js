import React from 'react';

function ItemValue({ item }) {
  const totalValue = item.baseValue + item.features.reduce((sum, feature) => sum + feature.valueAdd, 0);

  return (
    <div>
      <h2>Item Value</h2>
      <p>Base Value: ${item.baseValue}</p>
      <p>Total Value: ${totalValue}</p>
    </div>
  );
}

export default ItemValue;
