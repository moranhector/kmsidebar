import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList,
    FaListOl,
    FaCompactDisc,
    FaMusic,
    FaVideo
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../App.css';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/artistas",
            name:"Artistas",
            icon:<FaUserAlt/>
        },
        {
            path:"/albumes",
            name:"Albumes",
            icon:<FaCompactDisc/>
        },
        {
            path:"/canciones",
            name:"Canciones",
            icon:<FaMusic/>
        },
        {
            path:"/videos",
            name:"Videos",
            icon:<FaVideo/>
        },
        {
            path:"/rankings",
            name:"Rankings",
            icon:<FaListOl/>
        }
    ]
    return (
        <div className="container myCustomFont">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Killer Music</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;