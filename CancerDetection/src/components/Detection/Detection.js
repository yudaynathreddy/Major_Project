import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import { FaRegFileImage } from "react-icons/fa";
import { v4 } from 'uuid';
import Loader from '../Loader';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import './Detection.css';
import { imageDB } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Detection() {
  const [img, setImg] = useState();
  const [cancerStatus, setCancerStatus] = useState(true);
  const [loader, setLoader] = useState(false);
  const [imglink, setImglink] = useState('')
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate()
  const filename = v4();
  document.querySelector('title').textContent = "CancerCare | Lab";
  const onChecked = async () => {
    setLoader(true);
    const imgRef = ref(imageDB, `files/${filename}`);
    await uploadBytes(imgRef, img);
    getDownloadURL(ref(imageDB, `files/${filename}`))
      .then(res => {
        setImglink(res)
        axios.post('http://127.0.0.1:5000/predict', { 'image_link': res }, { headers: "application/json" })
          .then(resdata => {
            setCancerStatus(resdata.data.predictions.label)
            setLoader(false);
            setModalOpen(true);
          });
      });
  };

  return (
    <>
      <div>
        {loader && <Loader />}
        <Navbar />
        <div className='labimg'></div>
        <div>
          <div className='d-block mx-auto mb-4' style={{ width: "85%" }}>
            <h3 className='text-center mt-4'>Cancer detection</h3>
            <p>• Embark on a transformative journey with our cutting-edge cancer detection model powered by Convolutional Neural Networks (CNN). As you stand at the threshold of our image uploading page, envision the impact your contribution can make in the realm of early cancer detection.<br />

            • Upon uploading an image of a blood cell, our sophisticated CNN springs into action. It meticulously dissects the cellular landscape, leveraging layers of neural networks to discern subtle patterns indicative of cancerous cells. The results are delivered promptly, offering valuable insights into the likelihood of cancer presence.<br />

            • Your role in this process is pivotal. Each image you submit becomes a stepping stone in refining our model, contributing to a collective effort to advance cancer detection capabilities. We value your privacy, implementing stringent measures to ensure the confidentiality and security of your uploaded data.<br />
            • Join us in the fight against cancer and be part of a movement that is reshaping healthcare. Through technological innovation and your active participation, we aspire to revolutionize the landscape of cancer detection, making strides towards a healthier and more resilient future. Your contribution matters, and together, we can make a difference.</p>
          </div>
          <div>
            <label htmlFor="image" className='mx-auto mb-5 drop-container'>
              <i style={{ fontSize: "60px" }}><FaRegFileImage /></i>
              <span className='drop-title'>Upload here</span>
              or
              <input type="file" id='image' accept='image/*' onChange={(e) => setImg(e.target.files[0])} />
              <button style={{ marginTop: "20px", fontSize: "18px", width: "max-content" }} disabled={!img} onClick={() => onChecked()} className='btn btn-outline-dark'>Check</button>
            </label>
          </div>
        </div>
      </div>
      <div className={`modal fade ${modalOpen ? 'show' : ''}`} style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ boxShadow: "0 4px 15px 4px rgba(0, 0, 0, 0.2)" }}>
            <div className="modal-header">
              <button type="button" className="btn-close" aria-label="Close" onClick={() => setModalOpen(false)}></button>
            </div>
            <div className='d-block mx-auto modal-body'>
              <img src={imglink} width="300px" height="300px" alt="" />
              <h4 className='text-center mt-4'>result : {cancerStatus}</h4>
            </div>
            <div className="modal-footer">
              {cancerStatus !== "No Cancer" && <button type="button" className='btn btn-success' onClick={() => navigate('/maps')}>Get Hospitals</button>}
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detection;