import React from "react";

const PriceFeed = ({ currentMarketPrices }) => {
  function truncateToTwoDecimalPlaces(value) {
    if (isNaN(value)) return NaN;
    return Math.floor(value * 100) / 100;
  }

  function calculateSpread(bidPrice, askPrice) {
    const bid = parseFloat(bidPrice);
    const ask = parseFloat(askPrice);
    const pipSize = 0.00001;
    const spread = ask - bid;
    const spreadInPips = spread / pipSize;
    return truncateToTwoDecimalPlaces(spreadInPips);
  }

  return (
    <section className="orders-priceFeed">
      <h3>Live Prices</h3>
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Sell</th>
              <th>Buy</th>
              <th>Spread</th>
              <th>GSP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{currentMarketPrices.epic}</td>
              <td>{currentMarketPrices.ofr}</td>
              <td>{currentMarketPrices.bid}</td>
              <td>
                {calculateSpread(
                  currentMarketPrices.bid,
                  currentMarketPrices.ofr
                )}
              </td>
              <td>0.1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PriceFeed;
