import React, { createContext, useState, useEffect, useMemo } from "react";

export const TradeContext = createContext();

export const TradeProvider = ({
  children,
  selectedAccount,
  currentMarketPrices,
}) => {
  const storageTradeInput = JSON.parse(localStorage.getItem("tradeInput"));
  const [tradeInputValues, setTradeInputValues] = useState({
    entry: currentMarketPrices?.bid,
    stopLoss: storageTradeInput?.stopLoss ?? 0,
    equity: 0,
    riskPercent: storageTradeInput?.riskPercent ?? 1,
    riskUsd: storageTradeInput?.riskUsd ?? 100,
    commissionUsd: storageTradeInput?.commissionUsd ?? 2,
  });

  useEffect(() => {
    setTradeInputValues((prev) => {
      const updatedValues = { ...prev };
      const updatedEquity =
        selectedAccount?.balance.balance -
          selectedAccount?.balance.profitLoss ?? tradeInputValues.equity;
      // Update equity and recalculate both riskUsd and riskPercent
      updatedValues.equity = updatedEquity;
      updatedValues.riskUsd = (updatedValues.riskPercent / 100) * updatedEquity;

      // Save the updated values to localStorage
      localStorage.setItem("tradeInput", JSON.stringify(updatedValues));
      return updatedValues;
    });
  }, [selectedAccount]);

  function handleTradeInputChange(e) {
    const { name, value } = e.target;

    setTradeInputValues((prev) => {
      const updatedValues = { ...prev };

      // Convert value to a number
      //   const numericValue = parseFloat(value);

      // Handle the logic for equity, riskUsd, and riskPercent
      if (name === "equity") {
        // Update equity and recalculate both riskUsd and riskPercent
        updatedValues.equity = value;
        updatedValues.riskUsd = (updatedValues.riskPercent / 100) * value;
      } else if (name === "riskUsd") {
        // Update riskUsd and recalculate riskPercent
        updatedValues.riskUsd = value;
        updatedValues.riskPercent = (value / updatedValues.equity) * 100;
      } else if (name === "riskPercent") {
        // Update riskPercent and recalculate riskUsd
        updatedValues.riskPercent = value;
        updatedValues.riskUsd = (value / 100) * updatedValues.equity;
      } else {
        // For other fields, just update the value
        updatedValues[name] = value;
      }

      // Save the updated values to localStorage
      localStorage.setItem("tradeInput", JSON.stringify(updatedValues));

      return updatedValues;
    });
  }

  function determineTradeType(entryPrice, stopLossPrice) {
    if (entryPrice > stopLossPrice) {
      return "BUY";
    } else if (entryPrice < stopLossPrice) {
      return "SELL";
    } else {
      return "INVALID"; // This case occurs if the entry price equals the stop loss price
    }
  }

  function calculateLotSize(
    entryPrice,
    stopLossPrice,
    riskAmount,
    pipValue = 10,
    commissionPerLot
  ) {
    const stopLossPips = Math.abs(entryPrice - stopLossPrice) * 10000;
    let lotSize = riskAmount / (pipValue * stopLossPips);
    const totalCommission = lotSize * commissionPerLot;
    const adjustedRiskAmount = riskAmount - totalCommission;
    const adjustedLotSize = adjustedRiskAmount / (pipValue * stopLossPips);
    // lotSize = adjustedRiskAmount / (pipValue * stopLossPips);
    const isBuyTrade = "";
    return {
      lotSize: parseFloat(adjustedLotSize.toFixed(2)),
      unadjustedLotSize: parseFloat(lotSize.toFixed(2)),
      totalCommission: totalCommission,
      stopLossPips,
      direction: determineTradeType(entryPrice, stopLossPrice),
    };
  }

  //   const tradeValues = useMemo(
  //     () =>
  //       calculateLotSize(
  //         currentMarketPrices?.bid,
  //         tradeInputValues.stopLoss,
  //         tradeInputValues.riskUsd,
  //         10,
  //         tradeInputValues.commissionUsd
  //       ),
  //     [currentMarketPrices, tradeInputValues]
  //   );

  //   console.log(tradeValues);

  return (
    <TradeContext.Provider
      value={{
        tradeInputValues,
        handleTradeInputChange,
        calculateLotSize,
        // tradeValues,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};
