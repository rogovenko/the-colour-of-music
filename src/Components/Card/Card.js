import makeStats from '../makeStats'
import style from './style.module.css'

const filterAlbumWords = [
  'live', 'remix', 'mix', 'feat', 'radio', 'soundtrack', 'tour', 'edition', 'version',
]

export default function Card({ card, setResult, setChoice }) {
  const clickHandler = async () => {
    setChoice(null)
    setResult(1)
    const apikey = 'b9ba2eLqYU9d0b5RA3q872KjJqNk4C2FU40tmIOvVWIgV3XobzqLfQIv' // API ключ

    // 1 part. All albums
    const albumArray = await fetch(`https://api.happi.dev/v1/music/artists/${card.id_artist}/albums?apikey=${apikey}`)
    const albumArrayJson = await albumArray.json()
    const tempAlbums = albumArrayJson.result.albums
    const filtredAlbumArrayJson = tempAlbums.filter((elem) => {
      for (let i = 0; i < filterAlbumWords.length; i += 1) {
        if (elem.album.toLowerCase().includes(filterAlbumWords[i])) {
          return false
        }
      }
      return true
    })

    // 2 part. All songs
    const allSongs = []
    for (let i = 0; i < filtredAlbumArrayJson.length; i += 1) {
      const songsArray = await fetch(`https://api.happi.dev/v1/music/artists/${card.id_artist}/albums/${filtredAlbumArrayJson[i].id_album}/tracks?apikey=${apikey}`)
      const songsArrayJson = await songsArray.json()
      for (let j = 0; j < songsArrayJson.result.tracks.length; j += 1) {
        if (songsArrayJson.result.tracks[j].haslyrics) {
          allSongs.push(songsArrayJson.result.tracks[j])
        }
      }
    }
    const filteredAllSongsOnWords = allSongs.filter((elem) => {
      for (let i = 0; i < filterAlbumWords.length; i += 1) {
        if (elem.track.toLowerCase().includes(filterAlbumWords[i])) {
          return false
        }
      }
      return true
    })
    const mapSongs = filteredAllSongsOnWords.map((e) => e.track)
    const uniqueSongs = filteredAllSongsOnWords
      .filter((item, pos) => mapSongs.indexOf(item.track) == pos)

    // 3 part.
    const arr = []
    for (let i = 0; i < uniqueSongs.length; i += 1) {
      const lyrics = await fetch(`${uniqueSongs[i].api_lyrics}/?apikey=${apikey}`)
      const lyricsJson = await lyrics.json()
      arr.push(lyricsJson.result.lyrics)
    }
    const finalStats = makeStats(arr)
    setResult(finalStats)
  }

  return (
    <div onClick={clickHandler} className={style.card}>
      <img className={style.cardImg} src={card.cover} alt={card.artist} />
      <div className={style.cardText}>{card.artist}</div>
    </div>
  )
}
