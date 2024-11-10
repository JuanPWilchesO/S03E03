import 'bootstrap/dist/css/bootstrap.min.css'
import './LocationCard.css'

function LocationCard({ data }) {
  
  return (
    <div className='container container-location'>
        <div className="col-lg-6 card location-card mx-auto">
          <h3 className="col-sm-12 text-center location-title">{data?.name}</h3>
          <div className="row">
            <div className="col-lg-4">
              <h4 className="row location-subtitle">Type</h4>
              <p className="row location-data">{data?.type}</p>
            </div>
            <div className="col-lg-4">
              <h4 className="row location-subtitle">Dimension</h4>
              <p className="row location-data">{data?.dimension}</p>
            </div>
            <div className="col-lg-4">
              <h4 className="row location-subtitle">Population</h4>
              <p className="row location-data">{data?.residents?.length}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LocationCard
