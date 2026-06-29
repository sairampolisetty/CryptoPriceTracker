import "./CoinCard.css";

function CoinCard({ coin }) {
  return (
    <div key={coin.id} className="coin-card">
      <div>
        <img src={coin.image} alt="coin_image" />
      </div>
      <div>
        <h3>Coin Name: {coin.name}</h3>
        <p>Price: {coin.current_price}</p>
      </div>
    </div>
  );
}

export default CoinCard;
