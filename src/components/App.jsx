import { useState, useEffect } from 'react'
import Shortner from './Shotner/Shortner'
import History from './History/History'
import { motion } from 'framer-motion'
import LoadingCat from './abstract_componenets/LoadingCat'
function App() {
  const [page, setPage] = useState('shortner')
  const [loading, SetLoading] = useState('true')

  const initiateApp = async () => {
    document.getElementsByTagName('body')[0].style.background = '#e7dfdd'
    setTimeout(() => {
      document.getElementsByTagName('body')[0].style = ''
      SetLoading(false)
    }, 3000)
  }
  const changePage = (e) => {
    setPage(e)
  }
  useEffect(() => {
    initiateApp()
  }, [])
  if (loading) {
    return <LoadingCat />
  }
  return (
    <>
      <nav className="nav">
        <li onClick={() => changePage('shortner')}>Home |</li>
        <li>⏩👉🔗🔗👈⏪</li>
        <li onClick={() => changePage('history')}>| History</li>
      </nav>
      <main>
        <div className="container">
          {page == 'shortner' ? (
            <Shortner Page={page} SetPage={setPage} />
          ) : (
            <History />
          )}
        </div>
      </main>
    </>
  )
}

export default App

{
  /* <div id="foglayer_01" className="fog">
        <div className="image01"></div>
        <div className="image02"></div>
      </div>
      <div id="foglayer_02" className="fog">
        <div className="image01"></div>
        <div className="image02"></div>
      </div>
      <div id="foglayer_03" className="fog">
        <div className="image01"></div>
        <div className="image02"></div>
      </div> */
}
