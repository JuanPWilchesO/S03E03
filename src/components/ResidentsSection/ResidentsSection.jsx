import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ResidentCard from '../ResidentCard/ResidentCard.jsx'

function ResidentsSection({ data }) {

  const [page, setPage] = useState(1)
  const itemsPerPage = 4

  const totalItems = data ? data.length : 0
  const maxPage = Math.ceil(totalItems / itemsPerPage)

  const currentPageItems = data ? data.slice((page - 1) * itemsPerPage, page * itemsPerPage) : []
  const items = []

  const onNext = () => {
    if(page < maxPage) {
      setPage(page + 1)
    }
  }

  const onPrev = () => {
    if(page > 1) {
      setPage(page - 1)
    }
  }

  const onClickPage = (newPage) => {
    setPage(newPage)
  }

  for(let i = 1; i <= maxPage; i++) {
    items.push(i)
  }

  useEffect(() => {
    setPage(1)
  }, [data])

  return (
    <div className='container'>
      <div className="row">
        {currentPageItems.map((pjUrl,index) => (
          <div key = {index} className='col-lg-3 col-md-6'>
            <ResidentCard url = {pjUrl}/>
          </div>
        ))}
      </div>
      <br />
      <div className='row mx-auto'>
        <div className='btn-group flex-wrap'>
          <button onClick={onPrev} disabled={page === 1} className='btn btn-secondary'>Anterior</button>
          {items.map((item, index) => (
            <button key={index} onClick={() => onClickPage(item)} disabled={page === item} className='btn btn-secondary'>
            {item}
            </button>
          ))}
          <button onClick={onNext} disabled={page === maxPage}className='btn btn-secondary'>Siguiente</button>
        </div>
      </div>
    </div>
  )
}

export default ResidentsSection
