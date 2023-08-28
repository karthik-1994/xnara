// src/components/CustomerData.tsx
import React, { useState, useEffect } from 'react';
import './CustomerData.css';
import axios from 'axios';

interface Pack {
  ingredient: string;
  inventory_code: string;
  quantity: string;
  unit: string;
}

interface Customer {
  customer_id: string;
  pack_data: Pack[];
}

function CustomerData() {
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = () => {
    axios
      .get<Customer[]>('https://6466e9a7ba7110b663ab51f2.mockapi.io/api/v1/pack1')
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError(true);
      });
  };

  return (
    <div className="customer-data">
      {loading && <div>Loading...</div>}
      {error && <div>Error while fetching data....Please try again</div>}
      {!loading && !error && (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Pack Data</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map((item) => (
              <tr key={item.customer_id}>
                <td>{item.customer_id}</td>
                <td>
                  {item.pack_data.map((pack, index) => (
                    <div key={index} className="pack-item">
                      <p>Ingredient: {pack.ingredient}</p>
                      <p>Inventory Code: {pack.inventory_code}</p>
                      <p>Quantity: {pack.quantity}</p>
                      <p>Unit: {pack.unit}</p>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerData;
