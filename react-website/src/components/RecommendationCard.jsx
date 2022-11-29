import './recommendationCard.css';


const RecommendationCard = ({data}) => {
  return (
    <div className='rec-card' key={data.id} id={data.id}>
      <div className="title">
        {data.name}
      </div>
      <div className="artist">
        {data.artists[0].name}
      </div>
    </div>
  );
}
 
export default RecommendationCard;