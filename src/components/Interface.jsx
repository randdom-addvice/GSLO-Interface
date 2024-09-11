import React, { useState, useEffect, useRef } from "react";
import MarketData from "./MarketData";
import PriceFeed from "./PriceFeed";
import OpenedOrders from "./OpenedOrders";
import TradeInput from "./TradeInput";
import axios from "axios";
import Navbar from "./Navbar";
import { TradeProvider } from "../contexts/TradeContext";

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const API_KEY = process.env.REACT_APP_API_KEY;

const Interface = () => {
  const [currentMarketPrices, setCurrentMarketPrices] = useState(null);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const ws = useRef(null);

  const startSession = async () => {
    try {
      const response = await axios.post(
        "/session",
        {
          identifier: email,
          password: password,
        },
        {
          headers: {
            "X-CAP-API-KEY": API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      setTokens({
        cstToken: response.headers["cst"],
        securityToken: response.headers["x-security-token"],
      });
    } catch (err) {
      setError("Error starting session");
    }
  };

  async function getAllAccounts() {
    try {
      const response = await axios.get("/accounts", {
        headers: {
          "Content-Type": "application/json",
          "X-CAP-API-KEY": API_KEY,
          cst: tokens.cstToken,
          "X-SECURITY-TOKEN": tokens.securityToken,
        },
      });
      setAccounts(response.data.accounts);
      setSelectedAccount(response.data.accounts[0]);
      // console.log(response);
    } catch (err) {
      setError("Error starting session");
    }
  }

  useEffect(() => {
    startSession();
    const startSessionInterval = setInterval(async () => {
      await startSession();
    }, 600000);

    return () => {
      clearInterval(startSessionInterval);
    };
  }, []);

  useEffect(() => {
    if (!tokens) return;
    getAllAccounts();

    const connectWebSocket = async () => {
      try {
        ws.current = new WebSocket(
          "wss://api-streaming-capital.backend-capital.com/connect"
        );
        ws.current.onopen = () => {
          console.log("WebSocket Connection Opened");
          const subscribeMessage = JSON.stringify({
            destination: "marketData.subscribe",
            correlationId: "1",
            cst: tokens.cstToken,
            securityToken: tokens.securityToken,
            payload: {
              epics: ["EURUSD"],
            },
          });
          ws.current.send(subscribeMessage);
        };

        ws.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          // console.log("Received data:", data);
          setCurrentMarketPrices(data.payload);
        };

        ws.current.onerror = (err) => {
          console.error("WebSocket error:", err);
          setError("WebSocket error");
        };

        ws.current.onclose = () => {
          console.log("WebSocket Connection Closed");
        };
      } catch (err) {
        console.error("Error during WebSocket connection:", err);
        setError("WebSocket connection error");
      }
    };
    connectWebSocket();
    const pingInterval = setInterval(() => {
      if (ws.current.readyState === WebSocket.OPEN) {
        console.log("Sending ping to server");
        ws.current.send(
          JSON.stringify({
            destination: "ping",
            correlationId: "5",
            cst: tokens.cstToken,
            securityToken: tokens.securityToken,
          })
        );
      }
    }, 600000);

    return () => {
      clearInterval(pingInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tokens]);
  if (!currentMarketPrices) return <div>No data yet</div>;
  return (
    <>
      <TradeProvider
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
      >
        <Navbar
          accounts={accounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
          currentMarketPrices={currentMarketPrices}
        />
        <main>
          <div className="main">
            <section className="orders">
              <OpenedOrders />
              <PriceFeed currentMarketPrices={currentMarketPrices} />
            </section>
            <section className="tradeBlock">
              <div className="tradeBlock-group">
                <TradeInput
                  currentMarketPrices={currentMarketPrices}
                  selectedAccount={selectedAccount}
                />
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
                          <span>Direction</span>
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
        </main>
      </TradeProvider>
    </>
  );
};

export default Interface;
