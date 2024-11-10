import { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './ResidentCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function ResidentCard({ url }) {

  const { data, fetchData, loading, error } = useFetch()
  
  useEffect(() => {
    fetchData(url)
  }, [url])

  return (
    <div className='card'>
      <div className='row'>
        <h3 className='card-status'>{ data.data?.status}  
          { data.data?.status === 'Alive' ? (
            <i className="bi bi-circle-fill icon-alive"></i>
          ) : data.data?.status == 'Dead' ? (
            <i className="bi bi-circle-fill icon-dead"></i>
          ) : (
            <i className="bi bi-circle-fill icon-unknow"></i>
          )}
        </h3>
        <img src={data.data?.image} alt={data.data?.name} className='image'/>
      </div>
      <h3 className='col card-title text-center'>{data.data?.name}</h3>
      <div className='col'>
        <p className='card-label'>Specie</p>
        <p className='card-info'>{data.data?.species}</p>
        <p className='card-label'>Origin</p>
        <p className='card-info'>{data.data?.origin.name}</p>
        <p className='card-label'>Episodes where appear</p>
        <p className='card-info'>{data.data?.episode.length}</p>
      </div>
    </div>
  )
}

export default ResidentCard
