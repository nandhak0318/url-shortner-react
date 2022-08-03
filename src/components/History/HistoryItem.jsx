import { useState, useEffect } from 'react'
import ReactButton from '../abstract_componenets/Reactivebutton'
function HistoryItem({ data }) {
  const [CopyBtn, setCopyBtn] = useState('idle')
  const url = import.meta.env.VITE_SERVER_URL + '/'

  const truncate = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + '....' : str
  }
  const cpyClip = () => {
    setCopyBtn('loading')
    setTimeout(() => {
      navigator.clipboard.writeText(url + data.key)
      setCopyBtn('success')
    }, 500)
  }
  const isExipres = (time, ttl) => {
    let now = Date.now() / 1000 / 60
    now = Math.floor(now)
    let temp = time + ttl
    let diff = temp - now
    diff = Math.floor(diff)
    return diff
  }
  const time = isExipres(data.createdAt, data.expires)
  return (
    <li className="historyItem">
      <div className="detials">
        <div className="linkandkey">
          <a href={data.link}>{truncate(data.link, 24)}</a>
          <a href={url + data.key}>{truncate(url + data.key)}</a>
        </div>
        <div className="stats">
          <div className="hitsR">
            <p>Hits Remaining:</p>
            {parseInt(data.hits) >= 0 ? data.hits : <span>∞</span>}
          </div>
          <div className="expires">
            <p>Expires In:</p>
            {time > 0 ? time + ' min' : <span> expired</span>}
          </div>
        </div>
      </div>
      <div className="copy">
        <ReactButton
          idleText={'Copy!'}
          successText={'Copied!!'}
          loadingText={'...'}
          btnState={CopyBtn}
          onClickHandler={cpyClip}
          shadow={true}
        />
      </div>
    </li>
  )
}

export default HistoryItem
