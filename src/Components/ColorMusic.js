import { useState } from 'react'
import Chart from 'react-google-charts'
import Card from './Card/Card'
import style from './style.module.css'

export default function ColorMusic() {
  const [choice, setChoice] = useState(null)
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    setChoice([])
    const apikey = 'b9ba2eLqYU9d0b5RA3q872KjJqNk4C2FU40tmIOvVWIgV3XobzqLfQIv' // API ключ
    const data = await fetch(`https://api.happi.dev/v1/music?q=${input}&limit=&apikey=${apikey}&type=artist&lyrics=1`, { mode: 'cors' })
    const newData = await data.json()
    setChoice(newData.result)
    setResult(null)
    setInput('')
  }

  return (
    <div className={style.mainContainer}>
      <h1>The Colour of Music</h1>
      <div className={style.textIntro}>
        Find out which colors are most often used in songs of your favourite artists.
      </div>
      <form onSubmit={submitHandler}>
        <input placeholder="Peek your artist!" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {(choice === []) && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {(choice !== null) && (
        <>
          <div>Please, confirm your choice</div>
          <br />
          <div className={style.cardContainer}>
            {choice.map((card) => (
              <Card setResult={setResult} setChoice={setChoice} key={card.id_artist} card={card} />
            ))}
          </div>
        </>
      )}
      {result === 1 && (
        <>
          <br />
          <div className="spinner-border" role="status">

            <span className="visually-hidden">Loading...</span>
          </div>
          <br />
        </>
      )}
      {result !== 1 && result !== null && (
        <div>
          <Chart
            chartType="PieChart"
            data={[
              ['Color', 'Uses'],
              ['White', 0],
              ['Red', result.red],
              ['Green', result.green],
              ['Blue', result.blue],
              ['Yellow', result.yellow],
              ['Orange', result.orange],
              ['Purple', result.purple],
            ]}
            width="600px"
            height="600px"
            legendToggle
            options={
          {
            colors: ['white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple'],
            pieSliceText: 'value',
            pieSliceTextStyle: {
              color: 'white', fontName: 'Courier New', fontSize: 12,
            },
            legend: { position: 'none' },
            enableInteractivity: true,
          }
        }
          />
          <div className={style.wtf}>
            <div className={style.wtfNumber}>
              { result.wtf }
            </div>
            <div className={style.textText}>WTF! We also counted swear word for no reason!</div>
          </div>
        </div>
      )}
    </div>
  )
}
