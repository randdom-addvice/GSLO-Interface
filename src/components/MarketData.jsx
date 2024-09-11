import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;
const API_KEY = process.env.REACT_APP_API_KEY;

const MarketData = () => {
  const [currentMarketPrices, setCurrentMarketPrices] = useState(null);
  const [error, setError] = useState(null);
  const [tokens, setTokens] = useState(null);

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

  useEffect(() => {
    (async () => {
      await startSession();
    })();
  }, []);

  useEffect(() => {
    if (!tokens) return;
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
          //   console.log("Received data:", data);
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
    }, 600000); // 10 minutes in milliseconds

    return () => {
      clearInterval(pingInterval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tokens]);

  return (
    <div>
      <h2>Live Market Data</h2>
      {error && <p>{error}</p>}
      {currentMarketPrices ? (
        <div>
          <p>
            <strong>Bid Price:</strong> {currentMarketPrices.bid}
          </p>
          <p>
            <strong>offer Price:</strong> {currentMarketPrices.ofr}
          </p>
          <p>
            <strong>Updated time:</strong>
            {new Date(currentMarketPrices.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default MarketData;
