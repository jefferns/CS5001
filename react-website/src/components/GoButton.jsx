const GoButton = ({setDiscoveryMode}) => {
  const handleClick = () => {
    setDiscoveryMode(true);
  }
  return (
    <div className="go-wrapper">
      <button type="button" onClick={handleClick}>
        Let's Go &#10148;
      </button>
    </div>
  );
}
 
export default GoButton;