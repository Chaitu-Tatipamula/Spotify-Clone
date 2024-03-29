import React, { useEffect } from 'react'
import styled from 'styled-components'
import {AiFillClockCircle} from 'react-icons/ai'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/constants'
export default function Body({headerBackground}) {
    const [{token,selectedPlaylistId,selectedPlaylist},dispatch] = useStateProvider()
    useEffect(()=>{
        const getInitialPlaylist = async()=>{
            const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,{
            headers : {
                Authorization : "Bearer " + token,
                "Content-Type" : "application/json"
            }
        })
        const selectedPlaylist = {
            id : data.id,
            name : data.name,
            description : data.description,
            image : data.images[0].url,
            tracks : data.tracks.items.map(({track})=>({
                
                    id : track.id,
                    name : track.name,
                    artists :track.artists.map((artist)=> artist.name),
                    image: track.album.images[2].url,
                    duration : track.duration_ms,
                    album : track.album.name,
                    context_uri : track.album.uri,
                    track_number : track.track_number

                
            }))
        }
        dispatch({type : reducerCases.SET_PLAYLIST,selectedPlaylist})
    }
    getInitialPlaylist();
    },[token,dispatch,selectedPlaylistId])
  return (
    <Container headerBackground={headerBackground}>
        {
        selectedPlaylist&&(
            <>
                <div className="playlist">
                    <div className="image">
                        <img src={selectedPlaylist.image} alt="" />
                    </div>
                    <div className="details">
                        <span className='type'>PLAYLIST</span>
                        <h1 className='title'>{selectedPlaylist.name}</h1>
                        <p className='description'>{selectedPlaylist?.description}</p>
                    </div>
                </div>
                <div className="list">
                    <div className="header_row">
                        <div className="col">
                            <span>#</span>
                        </div>
                        <div className="col">
                            <span>TITLE</span>
                        </div>
                        <div className="col">
                            <span>ALBUM</span>
                        </div>
                        <div className="col">
                            <span><AiFillClockCircle/></span>
                        </div>
                        
                    </div>
                    
                    <div className="tracks">
                        {
                            selectedPlaylist.tracks.map(({
                                id,name,artists,image,duration,album,context_uri,track_number
                            },index)=>{
                                return (
                                    <div className="row">
                                        <div className="col">
                                            <span>{index+1}</span>
                                        </div>
                                        <div className="col detail">
                                            <div className="image">
                                                <img src={image} alt="" />
                                            </div>
                                            <div className="info">
                                                <span className='name'>{name}</span>
                                                <span className='artists'>{artists}</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <span>{album}</span>
                                        </div>
                                        <div className="col">
                                            <span>{duration}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )

        }
    </Container>
  )
}

const Container = styled.div`
.playlist{
    margin: 0 2rem;
    display :flex;
    align-items : center;
    gap : 2rem;
    .image{
        img{
            height : 15rem;
            box-shadow: rgba(0, 0, 0,0.25) 0px 25px 50px -12px;
        }
    }
    .details{
        display : flex;
        flex-direction : column;
        gap : 1rem;
        color : #e0dede;
        .title{
            color : white;
            font-size : 4rem;
        }
    }
}
.list{
    .header_row{
        display : grid;
        grid-template-columns : 0.3fr 3fr 2fr 0.1fr;
        align-items : center;
        margin : 1rem 0 0 0;
        border-bottom : 0.3px solid  gray;
        color : #dddcdc;
        position : sticky;
        top : 15vh;
        padding : 1rem 3rem;
        transition : 0.3s ease-in-out;
        background-color : ${({headerBackground})=>headerBackground ? "rgba(0,0,0,150.75)":"none"};
        text-align : left;
        
    }
    .tracks{
        margin : 0.5rem 0 0 0 ;
        display : flex;
        flex-direction : column;
        .row{
            padding : 0.5rem 3rem;
            display : grid;
            grid-template-columns : 0.3fr 3fr 2fr 0.1fr;
            &:hover {
                background-color: rgba(255, 255, 255, 0.25);
              }
            .col{
                display : flex;
                align-items : center;
                justify-content : left;
                width : 100%;
                color : #dddcdc;
                img{
                    height : 45px;
                    width : 45px;
                }
            }
            .detail{
                display : flex;
                gap : 1rem;
                .info{
                    display : flex;
                    flex-direction : column;
                    text-align : left;
                    
                
                    
                }
            }

        }
    }
}
`