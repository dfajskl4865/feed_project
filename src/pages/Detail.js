import { useParams } from "react-router-dom";

const DetailPage = (props) => {
  let { id } = useParams();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={`/${id}.png`} width="100%" />
        </div>
        <div className="col-md-6">
          <p>{props.Dogdrydata[id].title}</p>
          <p>{props.Dogdrydata[id].price}</p>
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
