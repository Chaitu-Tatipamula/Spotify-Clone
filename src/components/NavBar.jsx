import React from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import { useStateProvider } from '../utils/StateProvider'
export default function NavBar({navBackground}) {
    const [{userInfo}] = useStateProvider()
  return (
    <Container navBackground={navBackground}>
        <div className="search_bar">
            <FaSearch/>
            <input type="text" placeholder='Artists, Songs or Playlists' />
        </div>
        <div className="avatar">
           <a href={userInfo?.userUri}>
           <CgProfile/>
            <span>{userInfo?.userName}</span>
           </a>
        </div>
    </Container>
  )
}

const Container = styled.div`
display : flex;
justify-content : space-between;
align-items : center ;
padding : 2rem;
height : 15vh;
position : sticky;
top : 0;
transistion : 0.3s ease-in-out;
background-color : ${({navBackground})=>navBackground ? "rgba(5,5,5,0.8)":"none"};
.search_bar{
    background-color : white;
    width : 30%;
    padding : 0.2rem 1rem;
    border-radius : 3rem;
    display : flex;
    align-items : center ;
    gap : 0.5rem;
    input{
        border : none;
        width : 100%;
        height:1.7rem;
        &:focus{
            outline : none;
        }
    }
}
.avatar{
    background-color : black;
    padding : 0.3rem 1rem;
    border-radius : 3rem;
    display : flex;
    justify-content : center;
    align-items : center ;
    a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: white;
        font-weight: bold;
        svg {
          font-size: 1.3rem;
          background-color: #282828;
          padding: 0.2rem;
          border-radius: 1rem;
          color: #c7c5c5;
        }
      }

    
}

`
