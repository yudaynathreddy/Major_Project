import { useEffect, useState } from 'react';
import './SideBar.css'
import { IoCloseSharp } from "react-icons/io5";
import { AiFillCaretRight } from "react-icons/ai";
import cancerlogo from '../../Assests/cancerlogo.png'
function SideBar({ Hospitals }) {
    useEffect(() => {
        function onchange() {
            setisOpen(true)
        }
        onchange()
    }, [Hospitals])
    const [isOpen, setisOpen] = useState(true)
    return (
        <>
            {isOpen ?
                <div className='card mainside'>
                    <div className='card-header cardheader'>
                        <h5 style={{ color: "white" }}>Nearby Hospitals</h5>
                        <i style={{ fontSize: "20px", cursor: "pointer" }} onClick={() => setisOpen(false)}><IoCloseSharp /></i>
                    </div>
                    <div style={{ overflow: "scroll" }}>
                        {Hospitals.map((h) => {
                            return (
                                <div key={h.id} className='innercard'>
                                    <div className='row' style={{ padding: "10px" }}>
                                        <div className='col-md-4'>
                                            <img src={cancerlogo} className='img-fluid hospitalimg' alt="" />
                                        </div>
                                        <div className='col-md-8' style={{ overflow: "scroll" }}>
                                            <p style={{ fontWeight: "bold" }}>{h.tags.name}</p>
                                            <p>{h.tags["addr:full"]}, {h.tags["addr:district"]}, {h.tags["addr:state"]}-{h.tags["addr:postcode"]}</p>
                                            {/* <button className='btn btn-outline-dark'>Get direction</button> */}
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div className='opensidebar' onClick={() => setisOpen(true)}>
                    <p className='mt-4' style={{ fontSize: "20px" }}><AiFillCaretRight /></p>
                </div>
            }
        </>
    )
}

export default SideBar
