import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SideBar from './SideBar'
import NavBar from './NavBar'
import Body from './Body'
import Footer from './Footer'
import { useStateProvider } from '../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../utils/constants'

export default function Spotify() {
    const [{token},dispatch] = useStateProvider()
    const bodyRef = useRef()
    const [navBackground,setNavBackground] = useState(false)
    const [headerBackground,setHeaderBackground] = useState(false)
    const bodyScrolled = ()=>{
        bodyRef.current.scrollTop >=30 ? setNavBackground(true) :setNavBackground(false)
        bodyRef.current.scrollTop >=268 ? setHeaderBackground(true) :setHeaderBackground(false)
    }
    useEffect(()=>{
        const getUserInfo = async()=>{
            const {data}= await axios.get("https://api.spotify.com/v1/me/",{
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            })
            const userInfo = {
                userId : data.id,
                userName : data.display_name,
                userUri : data.external_urls.spotify
            }
            // console.log(userInfo);
            dispatch({type : reducerCases.SET_USER,userInfo})
        }
        getUserInfo()
    },[dispatch,token])
  return (
    <Container>
        <div className="spotify_body">
            <SideBar/>
            <div className="body"ref={bodyRef} onScroll={bodyScrolled}>
                <NavBar nacBackground={navBackground}/>
                <div className="body_contents">
                    <Body headerBackground={headerBackground}/>
                </div>
            </div>
        </div>
        <div className="spotify_footer">
            <Footer/>
        </div>
    </Container>
  )
}

const Container = styled.div`
    max-width : 100vw;
    max-height : 100vh;
    overflow : hidden;
    display : grid;
    grid-template-rows : 90vh 10vh;
    .spotify_body{
        display : grid;
        grid-template-columns : 15vw 85vw;
        height : 100%;
        width : 100%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 1));
        background-color : rgb(32,87,100);
        .body{
            overflow : auto;
            height : 100%;
            width : 100%
        }

    }
    
`
