import React, { useContext, useEffect, useMemo, useState } from "react";
import { TradeContext } from "../contexts/TradeContext";

const TradeButtons = ({ currentMarketPrices }) => {
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

  function enterTrade() {
    alert("Trade entered");
  }
  console.log(tradeValues);

  return (
    <div>
      <button
        onClick={enterTrade}
        disabled={
          tradeValues.direction === "BUY" || tradeValues.direction === "INVALID"
        }
        className="sell"
      >
        Sell
      </button>
      <button
        onClick={enterTrade}
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
