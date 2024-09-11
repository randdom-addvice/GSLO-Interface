import React, { useContext, useEffect, useMemo, useState } from "react";
import { TradeContext } from "../contexts/TradeContext";
import axios from "axios";
const API_KEY = process.env.REACT_APP_API_KEY;

const TradeButtons = ({ currentMarketPrices, tokens }) => {
  const { tradeInputValues, calculateLotSize } = useContext(TradeContext);

  const tradeValues = useMemo(
    () =>
      calculateLotSize(
        currentMarketPrices?.bid,
        tradeInputValues.stopLoss,
        tradeInputValues.riskUsd,
        10,
        tradeInputValues.commissionUsd
      ),
    [currentMarketPrices, tradeInputValues]
  );

  async function enterTrade(direction) {
    try {
      const positionDetail = {
        epic: "EURUSD",
        direction,
        size: tradeValues.lotSize,
        guaranteedStop: true,
        stopLevel: parseFloat(tradeInputValues.stopLoss),
        profitDistance: parseFloat(
          (tradeValues.stopLossPips * 2 + 2).toFixed(2)
        ), //profit in pips
      };
      const response = await axios.post("/positions", positionDetail, {
        headers: {
          "Content-Type": "application/json",
          "X-CAP-API-KEY": API_KEY,
          cst: tokens.cstToken,
          "X-SECURITY-TOKEN": tokens.securityToken,
        },
      });
      console.log(positionDetail);
      console.log(response);
    } catch (error) {
      // alert("Could't place trade");
      console.log(error.response.data);
    }
  }
  // console.log(tradeValues);

  return (
    <div>
      <button
        onClick={() => enterTrade("SELL")}
        disabled={
          tradeValues.direction === "BUY" || tradeValues.direction === "INVALID"
        }
        className="sell"
      >
        Sell
      </button>
      <button
        onClick={() => enterTrade("BUY")}
        disabled={
          tradeValues.direction === "SELL" ||
          tradeValues.direction === "INVALID"
        }
        className="buy"
      >
        Buy
      </button>
    </div>
  );
};

export default TradeButtons;
