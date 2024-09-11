import React, { useState, useEffect } from "react";
import axios from "axios";

const MarketData = () => {
  const [prices, setPrices] = useState(null);
  const [error, setError] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [tokens, setTokens] = useState(null);

  const email = process.env.REACT_APP_EMAIL;
  const password = process.env.REACT_APP_PASSWORD;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const epic = "EURUSD"; // e.g., 'CS.D.EURUSD.MINI.IP'

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
      setSessionData(response.data);
    } catch (err) {
      setError("Error starting session");
    }
  };

  const fetchMarketData = async () => {
    try {
      const response = await axios.get(`/markets?epics=EURUSD`, {
        headers: {
          Authorization: `Bearer ${tokens.sessionToken}`,
          CST: tokens.cstToken, // Session token from authentication
          "X-SECURITY-TOKEN": tokens.securityToken, // Session token from authentication
        },
      });
      //   console.log(response);
      setPrices(response.data.marketDetails[0].snapshot); // Store the price data
    } catch (err) {
      setError("Error fetching market data");
      console.error(err);
    }
  };

  useEffect(() => {
    startSession();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (tokens) fetchMarketData();
    };

    getData();
    const interval = setInterval(() => {
      getData();
    }, 500);

    return () => clearInterval(interval);
  }, [tokens]);

  return (
    <div>
      <h2>Live Market Data</h2>
      {error && <p>{error}</p>}
      {prices ? (
        <div>
          <p>
            <strong>Bid Price:</strong> {prices.bid}
          </p>
          <p>
            <strong>offer Price:</strong> {prices.offer}
          </p>
          <p>
            <strong>Updated time:</strong> {prices.updateTime}
          </p>
        </div>
      ) : (
        <p>Loading market data...</p>
      )}
    </div>
  );
};

export default MarketData;
