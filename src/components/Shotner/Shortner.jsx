import { useState, useEffect } from 'react'
import axios from '../../utils/axios.instance'
import ReactButton from '../abstract_componenets/Reactivebutton'

function Shortner({ Page, SetPage }) {
  const [link, setLink] = useState('')
  const [hits, setHits] = useState('')
  const [loading, setLoading] = useState(true)
  const [btnState, setBtnState] = useState('idle')
  const [expiresIn, setExpiresIn] = useState(1440)
  const [selected, setSelected] = useState('one')
  const [CopyBtn, setCopyBtn] = useState('idle')
  const onClickHandler = async () => {
    try {
      setBtnState('loading')
      const uid = window.localStorage.getItem('uid')
      let body = {
        link: link,
        uid: uid,
        expiresIn: expiresIn,
      }
      if (hits) {
        body.hits = hits
      }
      const response = await axios.post('/', body)
      let tempLink = import.meta.env.VITE_SERVER_URL + response.data.shortenLink
      setLink(tempLink)
      setBtnState('success')
    } catch (e) {
      console.log(e)
      return setBtnState('error')
    }
  }
  const cpyClip = () => {
    setCopyBtn('loading')
    setTimeout(() => {
      navigator.clipboard.writeText(link)
      setCopyBtn('success')
    }, 1000)
  }
  const textChange = (e) => {
    setLink(e.target.value)
  }
  const numberChange = (e) => {
    if (!isNaN(e.target.value)) {
      setHits(e.target.value)
    }
  }
  const radioHandler = (e) => {
    setSelected(e)
  }
  const initiateApp = async () => {
    if (!window.localStorage.getItem('uid')) {
      const data = await axios.post('/creatUser')
      window.localStorage.setItem('uid', data.data.uid)
    }
    setLoading(false)
  }
  useEffect(() => {
    initiateApp()
  }, [])

  if (loading) {
    return (
      <img
        className=""
        src="https://c.tenor.com/KEzW7ALwfUAAAAAS/cat-what.gif"
        alt="loading.."
        width="10px"
      />
    )
  }
  return (
    <div className="cv">
      <form method="post">
        <div className="link-flex">
          <input
            type="text"
            value={link}
            onChange={textChange}
            className="ti"
            placeholder="Paste the link here..."
          />
          <ReactButton
            idleText={'Copy!'}
            successText={'Copied!!'}
            loadingText={'...'}
            btnState={CopyBtn}
            onClickHandler={cpyClip}
            shadow={true}
          />
        </div>
        <div className="title">Expires In</div>
        <div className="switch">
          <input
            name="switch"
            id="one"
            type="radio"
            checked={selected === 'one'}
          />
          <label
            htmlFor="one"
            className="switch__label"
            onClick={(e) => {
              radioHandler('one')
              setExpiresIn(1440)
            }}
          >
            1d
          </label>
          <input
            name="switch"
            checked={selected === 'two'}
            id="two"
            type="radio"
          />
          <label
            htmlFor="two"
            className="switch__label"
            onClick={() => {
              radioHandler('two')
              setExpiresIn(7200)
            }}
          >
            5d
          </label>
          <input
            name="switch"
            checked={selected === 'three'}
            id="three"
            type="radio"
          />
          <label
            htmlFor="three"
            className="switch__label"
            onClick={(e) => {
              radioHandler('three')
              setExpiresIn(10080)
            }}
          >
            7d
          </label>
          <div className="switch__indicator"></div>
        </div>
        <div className="title">Hits</div>
        <div className="hits">
          <input
            style={{ marginTop: 0.8 + 'em' }}
            type="text"
            className="ti"
            onChange={numberChange}
            value={hits}
            placeholder="Leave for unlimited hit"
          />
        </div>
        <ReactButton
          idleText={'SHRINK!'}
          successText={'Shrinkedd'}
          loadingText={'shirnking...'}
          btnState={btnState}
          onClickHandler={onClickHandler}
          style={{ borderRadius: '5px', marginTop: 2 + 'em' }}
        />
      </form>
    </div>
  )
}

export default Shortner
