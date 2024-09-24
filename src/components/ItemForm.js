import React, { useState } from 'react';
import axios from 'axios';

function ItemForm({ onItemSelect }) {
  const [itemType, setItemType] = useState('');
  const [baseValue, setBaseValue] = useState('');
  const [features, setFeatures] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { itemType, baseValue, features };
    const response = await axios.post('/api/items', newItem);
    onItemSelect(response.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Type:
        <input type="text" value={itemType} onChange={(e) => setItemType(e.target.value)} />
      </label>
      <label>
        Base Value:
        <input type="number" value={baseValue} onChange={(e) => setBaseValue(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ItemForm;
