import React from "react";

const Navbar = ({ accounts, selectedAccount, setSelectedAccount }) => {
  function changeSelectedAccount(account) {
    setSelectedAccount(account);
  }
  return (
    <nav className="nav">
      <div className="nav-group">
        <ul>
          <li>
            <div class="sec-center">
              <input
                class="dropdown"
                type="checkbox"
                id="dropdown"
                name="dropdown"
              />
              <label class="for-dropdown" for="dropdown">
                {selectedAccount?.accountName}
              </label>
              <div class="section-dropdown">
                {accounts?.map((i, index) => (
                  <span
                    className="dropdown-item"
                    onClick={() => changeSelectedAccount(i)}
                    key={index}
                  >
                    {i.accountName}
                  </span>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div className="label">Equity</div>
            <div className="value">
              {selectedAccount?.balance.balance -
                selectedAccount?.balance.profitLoss}
            </div>
          </li>
          <li>
            <div className="label">Balance</div>
            <div className="value">{selectedAccount?.balance.balance}</div>
          </li>
          <li>
            <div className="label">Available</div>
            <div className="value">{selectedAccount?.balance.available}</div>
          </li>
          <li>
            <div className="label">P&L</div>
            <div className="value">{selectedAccount?.balance.profitLoss}</div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
