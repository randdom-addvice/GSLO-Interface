import React, { useEffect } from "react";
import MarketData from "./MarketData";
const API_KEY = "VR5AyLUFoQv01dtj";
const symbol = "AAPL";

const Interface = () => {
  return (
    <>
      <MarketData />
      {/* <main>
        <div className="main">
          <section className="orders">
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
                      <td>EURUSD</td>
                      <td>1.2000</td>
                      <td>1.2001</td>
                      <td>0.1</td>
                      <td>0.1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </section>

          <section className="tradeBlock">
            <div className="tradeBlock-group">
              <div className="tradeBlock-input">
                <h3>Input</h3>
                <div className="card">
                  <ul>
                    <li>
                      <div>
                        <span>Entry</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="Entry"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Stop Loss</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="stop loss"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Account Equity</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="Account Equity"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Risk %</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="Risk %"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Risk USD</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="Risk USD"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Commission USD</span>
                        <span>
                          <input
                            type="number"
                            className="sl-input"
                            placeholder="Commission USD"
                          />
                        </span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Position Size</span>
                        <span></span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tradeBlock-output">
                <h3>Output</h3>
                <div className="card">
                  <ul>
                    <li>
                      <div>
                        <span>Entry</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Stop Loss</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Account Equity</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Risk %</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Risk USD</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Commission USD</span>
                      </div>
                    </li>
                    <li>
                      <div>
                        <span>Position Size</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="tradeBlock-buttons">
              <div>
                <button className="sell">Sell</button>
                <button className="buy">Buy</button>
              </div>
            </div>
          </section>
        </div>
      </main> */}
    </>
  );
};

export default Interface;
