import React from 'react'
import {styled}  from 'styled-components'
export default function Login() {
  const handleClick = ()=>{
    const clientId = "901962ddb3f84345b3cb2f4d67111440"
    const redirectUrl = "http://localhost:3000/"
    const apiUrl = "https://accounts.spotify.com/authorize"
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-modify-playback-state",
      "user-top-read",
    ]
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  }
  return (
    <Container>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="" srcset="" />
        <button onClick={handleClick}>Connect with Spotify</button>
    </Container>
  )
}

const Container = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : column;
    height : 100vh;
    width : 100vw;
    background-color: #1db954;
    gap : 10vh;
    img{
      height : 20vh
    }
    button { 
      padding : 3vh;
      border-radius : 5vh;
      border : none;
      
    }

`
