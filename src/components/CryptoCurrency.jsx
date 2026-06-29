import { useState, useEffect } from "react";
import CoinCard from "./CoinCard";
import "./CryptoCurrency.css";

function CryptoCurrency() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("I am here");
        setError(err);
        setLoading(false);
      });
  }, []);

  console.log(error);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchInput.toLocaleLowerCase()),
  );

  const coinsPerPage = 6;
  const lastPageInd = currentPage * coinsPerPage;
  const firstPageIndex = lastPageInd - coinsPerPage;
  const currentCoins = filteredCoins.slice(firstPageIndex, lastPageInd);
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <h1>Crypto Price Tracker</h1>
      <input
        type="search"
        value={searchInput}
        placeholder="Search By Coin Name"
        onChange={(e) => setSearchInput(e.target.value)}
        title="Search Through Vast No of Coins"
      />
      <button
        className="refresh-button"
        onClick={() => window.location.reload()}
        title="Cick here to get Updated Prices"
      >
        Refresh
      </button>
      <div>
        {isLoading && (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>
      {error ? (
        <div>{error}</div>
      ) : (
        <div className="coin-container">
          {currentCoins.map((coin) => (
            <CoinCard coin={coin} />
          ))}
        </div>
      )}
      <div className="pagination">
        <button className="page-buttons" onClick={handlePrev}>
          Prev
        </button>
        <p className="pages">
          <span className="currentPage">{currentPage}</span> of {totalPages}
        </p>
        <button className="page-buttons" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default CryptoCurrency;
