import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemValue from './components/ItemValue';

function App() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch items from API
    axios.get('/api/items').then(response => {
      setItems(response.data);
    });
  }, []);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="App">
      <h1>Value Your Item</h1>
      <ItemForm onItemSelect={handleItemSelect} />
      {selectedItem && <ItemValue item={selectedItem} />}
    </div>
  );
}

export default App;
