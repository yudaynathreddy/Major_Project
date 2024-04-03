import React from 'react'
import Navbar from '../navbar/navbar'
import c1 from '../../Assests/c1.jpeg'
import c2 from '../../Assests/c2.png'
import c3 from '../../Assests/c3.png'
import c4 from '../../Assests/c4.jpg'
import c5 from '../../Assests/c5.jpg'
import c6 from '../../Assests/c6.jpg'
import c7 from '../../Assests/c7.jpg'
import bloodimg from '../../Assests/bloodimg.jpg'
import { useNavigate } from 'react-router-dom'
import './Home.css'
function Home() {
  document.querySelector('title').textContent = "CancerCare | Home"
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <img className='w-100' height="280px" style={{ marginTop: "60px" }} src={bloodimg} alt="" />
      <div className='d-block mx-auto w-75 mt-5'>
        <div className='d-flex justify-content-between'>
          <h2 style={{ color: "#03045e", fontWeight: "bold" }} className='mb-4'>Blood Cancers</h2>
          <button type='button' className='btn btn-outline-danger mb-4' onClick={() => { navigate('/detection') }}>Wanna Check ??</button>
        </div>
        <p>Blood cancers affect the production and function of your blood cells. Most of these cancers start in your bone marrow where blood is produced. Stem cells in your bone marrow mature and develop into three types of blood cells: red blood cells, white blood cells, or platelets. In most blood cancers, the normal blood cell development process is interrupted by uncontrolled growth of an abnormal type of blood cell. These abnormal blood cells, or cancerous cells, prevent your blood from performing many of its functions, like fighting off infections or preventing serious bleeding.</p>
        <p>There are three main types of blood cancers:</p>
        <ul>
          <li><p><span className='text-danger'>Leukemia</span>, a type of cancer found in your blood and bone marrow, is caused by the rapid production of abnormal white blood cells. The high number of abnormal white blood cells are not able to fight infection, and they impair the ability of the bone marrow to produce red blood cells and platelet</p></li>
          <li><p><span className='text-danger'>Lymphoma</span> is a type of blood cancer that affects the lymphatic system, which removes excess fluids from your body and produces immune cells. Lymphocytes are a type of white blood cell that fight infection. Abnormal lymphocytes become lymphoma cells, which multiply and collect in your lymph nodes and other tissues. Over time, these cancerous cells impair your immune system.</p></li>
          <li><p><span className='text-danger'>Myeloma</span> is a cancer of the plasma cells. Plasma cells are white blood cells that produce disease- and infection-fighting antibodies in your body. Myeloma cells prevent the normal production of antibodies, leaving your body's immune system weakened and susceptible to infection. </p></li>
        </ul>
      </div>
      <div className='imagecarousel mb-5'>
        <div id="carouselExampleRide" className="carousel carousel-dark slide" data-bs-ride="true">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={c1} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c2} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c3} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c4} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c5} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c6} className="d-block w-100 cimage" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={c7} className="d-block w-100 cimage" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
