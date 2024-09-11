import React from "react";

const OpenedOrders = () => {
  return (
    <section className="orders-list">
      <h3>Opened Orders</h3>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Volume</th>
              <th>Side</th>
              <th>SL</th>
              <th>TP</th>
              <th>Commission</th>
              <th>Buttons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EURUSD</td>
              <td>0.5</td>
              <td>BUY</td>
              <td>0.1050</td>
              <td>0.1200</td>
              <td>0.75</td>
              <td>
                <button>close</button>
              </td>
            </tr>
            <tr>
              <td>EURUSD</td>
              <td>0.5</td>
              <td>BUY</td>
              <td>0.1050</td>
              <td>0.1200</td>
              <td>0.75</td>
              <td>
                <button>close</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OpenedOrders;
