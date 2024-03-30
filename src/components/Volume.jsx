import React from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { IoMdVolumeHigh } from "react-icons/io";

export default function Volume() {

    const [{token}] = useStateProvider()
    const setVolume = async(e)=>{
        await axios.put("https://api.spotify.com/v1/me/player/volume",
        {},
        {
            params : {
                volume_percent : parseInt(e.target.value),
            },
            headers : {
                Authorization : "Bearer "+ token,
                "Content-Type" : "application/json"
            }
            
        }
        )
    }
  return (
    <Container>
        <label htmlFor=""><IoMdVolumeHigh /></label>
        <input type="range" name="" id="" min={0} max={100} onMouseUp={(e)=>setVolume(e)}/>
    </Container>
  )
}

const Container = styled.div`
display : flex;
align-items : center;
justify-content : center;
gap: 1rem;
svg {
    color: white;
  }
input{
    width : 50%;
    height : 3px;
    color : rgb(0,255,0);
    &:hover{
    }
}
`
