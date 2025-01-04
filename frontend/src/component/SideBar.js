import React from "react";
import { FaHome,FaList,FaClipboardList, FaListOl, FaUpload } from 'react-icons/fa';
import './SideBar.css'

function SideBar () {

    const SideBarData = [{
        title: "Dashboard",
        icon: <FaHome />,
        link: "/admin-dashboard",
    },
    {
        title: "Participant List",
        icon: <FaList />,
        link: "/admin-participant-list",
    },
    {
        title: "Race Kit Collection",
        icon: <FaClipboardList />,
        link: "/admin-race-kit",
    },
    {
        title: "Ranking List",
        icon: <FaListOl />,
        link: "/admin-ranking-list",
    },
    {
        title: "Upload Document",
        icon: <FaUpload/>,
        link: "/admin-upload-document",
    }

    ]

    
    return(
        <div className="sideBar">
            <ul className="sideBar-list">
            {SideBarData.map((val, key)=> {
                return(
                    <li key={key} 
                    className="row" 
                    id= {window.location.pathname === val.link ? "active" : ""}
                    onClick={()=> {window.location.pathname = val.link}}>
                        {" "}
                        <div id="icon">{val.icon}</div>
                        {" "}
                        <div id="title">{val.title}</div>
                    </li>
                );
            })}
            </ul>
        </div>
    );

}


export default SideBar;
