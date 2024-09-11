import React, { useContext, useEffect, useMemo, useState } from "react";
import { TradeContext } from "../contexts/TradeContext";

const TradeOutput = ({ currentMarketPrices }) => {
  const {
    tradeInputValues,
    handleTradeInputChange,
    calculateLotSize,
    // tradeValues,
  } = useContext(TradeContext);

  const tradeValues = useMemo(
    () =>
      calculateLotSize(
        currentMarketPrices.bid,
        tradeInputValues.stopLoss,
        tradeInputValues.riskUsd,
        10,
        tradeInputValues.commissionUsd
      ),
    [currentMarketPrices, tradeInputValues]
  );
  return (
    <div className="tradeBlock-output">
      <h3>Output</h3>
      <div className="card">
        <ul>
          <li>
            <div>
              <span>Entry</span>
              <span>{currentMarketPrices.bid}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Direction</span>
              <span>{tradeValues.direction}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Stop Loss (pips)</span>
              <span>{tradeValues.stopLossPips.toFixed(2)}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Commission USD</span>
              <span>{tradeValues.totalCommission.toFixed(2)}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Position Size (Commission Adjusted)</span>
              <span>{tradeValues.lotSize}</span>
            </div>
          </li>
          <li>
            <div>
              <span>Position Size (Commission Unadjusted)</span>
              <span>{tradeValues.unadjustedLotSize}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TradeOutput;
