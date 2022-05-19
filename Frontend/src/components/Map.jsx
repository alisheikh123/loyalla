import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import MultipleMarkers from "./MultipleMarkers.jsx";

const MapComponent = ({zoom,center,data}) => {
  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center}>
      <MultipleMarkers activeriders={data} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MapComponent));
