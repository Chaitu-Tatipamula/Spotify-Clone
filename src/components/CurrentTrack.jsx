import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/constants'

export default function CurrentTrack() {
    const [{token,currentPlaying},dispatch] = useStateProvider()
    useEffect(()=>{
        const getCurrentTrack = async()=>{
            const {data} = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            })
            // console.log(data);
            const currentPlaying = {
                id : data.item?.id,
                name : data.item?.name,
                artists : data.item?.artists.map((artist)=>artist.name),
                image : data.item.album?.images[2].url,

            }
            // console.log(currentPlaying);
            dispatch({type : reducerCases.SET_PLAYING,currentPlaying })
        }
        getCurrentTrack()

    },[token,dispatch,currentPlaying])
  return (
    <Container>
    {currentPlaying && (
      <div className="track">
        <div className="track__image">
          <img src={currentPlaying?.image} alt="currentPlaying" />
        </div>
        <div className="track__info">
          <h4 className="track__info__track__name">{currentPlaying?.name}</h4>
          <h6 className="track__info__track__artists">
            {currentPlaying?.artists.join(", ")}
          </h6>
        </div>
      </div>
    )}
  </Container>
  )
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &__image {
    }
    &__info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      &__track__name {
        color: white;
      }
      &__track__artists {
        color: #b3b3b3;
      }
    }
  }
`;
