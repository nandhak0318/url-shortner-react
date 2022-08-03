import { useState, useEffect } from 'react'
import axios from '../../utils/axios.instance'
import HistoryItem from './HistoryItem'
function History() {
  const [history, setHistory] = useState([])

  const initiateComp = async () => {
    if (window.localStorage.getItem('uid')) {
      const uid = window.localStorage.getItem('uid')
      const data = await axios.get('/history', { params: { uid: uid } })
      if (data.data.uid) {
        window.localStorage.clear()
        window.localStorage.setItem('uid', data.data.uid)
      }
      setHistory(data.data.history)
    }
  }

  useEffect(() => {
    initiateComp()
  }, [])

  return (
    // <div className="container">
    <div className="hw">
      {history.length == 0 ? (
        <h1 className="not-found">no history found *sus*</h1>
      ) : (
        history.map((e) => {
          return <HistoryItem key={e.key} data={e} />
        })
      )}
    </div>
    // </div>
  )
}

export default History
