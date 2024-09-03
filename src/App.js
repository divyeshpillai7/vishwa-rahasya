import React, { useState, useEffect } from 'react';
import './App.css';
// import Tulsidas from './components/Tulsidas';

function App() {

  const [visibleBox, setVisibleBox] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false); // state to control popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // state to control popup message
  const [popupColor, setPopupColor] = useState(""); // state to control popup message color

  useEffect(() => {
    // Play audio when body is clicked
    const playAudioOnClick = () => {
      const audio = document.getElementById('background-audio');
      if (audio) {
        audio.play();
      }
    };

    // Attach event listener to the body
    document.body.addEventListener('click', playAudioOnClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.body.removeEventListener('click', playAudioOnClick);
    };
  }, []);

  function multiplyValues() {
    var yuga = document.getElementById('yuga').value;
    var sahasra = document.getElementById('sahasra').value;
    var yojan = document.getElementById('yojan').value;

    var result = parseFloat(yuga) * parseFloat(sahasra) * parseFloat(yojan);

    document.getElementById('result').innerText = result;
  }

  function multiplyValues2() {
    var miles = document.getElementById('miles').value;
    var km = document.getElementById('km').value;

    var final_result = parseFloat(miles) * parseFloat(km);

    document.getElementById('result2').innerText = final_result;

    if (final_result === 153600000) {
      setPopupMessage("Congratulations! You've calculated the distance between YOU (Earth) and the SUN (BHANU)");
      setPopupColor("green"); // Set the popup text color to blue for correct result
      setPopupVisible(true);  // Show the popup
    } else {
      setPopupMessage("Incorrect result. Try again.");
      setPopupColor("red"); // Set the popup text color to red for incorrect result
      setPopupVisible(true);  // Show the popup
    }

  }

  function toggleVisibility(id) {
    setVisibleBox(visibleBox === id ? null : id);
  }

  return (
    <div className="App">

      <video autoPlay muted loop id="background-video">
        <source src={`${process.env.PUBLIC_URL}/visuals/backgroundvideo.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Removed autoPlay for audio and added an id */}
      <audio id="background-audio" loop>
        <source src={`${process.env.PUBLIC_URL}/visuals/aradya_shloka.mp3`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>




      <div className='page1'>
        <p className='title'>Vishwa Rahasya</p>
        <p className='chalisa'>जुग सहस्र जोजन पर भानू । लील्यो ताहि मधुर फल जानू ॥</p>

        <div className="tulsidasinfo">
          <img id='td' src={`${process.env.PUBLIC_URL}/visuals/tulsidas-photo.jpeg`} alt="Tulsidas" />

          <p className='text'>Saint Tulsidas:- A Brief History

            Tulsidas, a revered Indian saint, poet, and philosopher, was born around 1532 CE in Rajapur, Uttar Pradesh, India. He is renowned for his Ramcharitmanas, a retelling of the Sanskrit epic Ramayana in Awadhi, making the story of Lord Rama accessible to the common people of North India. Tulsidas's devotion to Lord Rama played a significant role in the Bhakti movement, promoting love for God over rituals. In addition to the Ramcharitmanas, his notable works include the Vinay Patrika, Kavitavali, Dohavali, and the Hanuman Chalisa.


            
            The Hanuman Chalisa is a 40-verse hymn dedicated to Lord Hanuman, composed by Tulsidas around 1575 CE. Written in Awadhi, it extols Hanuman's strength, courage, and devotion. Devotees commonly recite it for blessings, protection, and strength.</p>

        </div>
      </div>

      <div className="page2">

        <div className="caption">Decode the Shloka to find the distance between YOU and the EARTH!</div>

        <div className='tabs'>

          <div className="tab-left">
            <p className="tiles" draggable='true' onClick={() => toggleVisibility('right-yuga')}>Yuga</p>
            <p className="tiles" draggable='true' onClick={() => toggleVisibility('right-sahasra')}>Sahasra</p>
            <p className="tiles" draggable='true' onClick={() => toggleVisibility('right-yojan')}>Yojan</p>
          </div>

          <div className="tab-right">
            <p className="tiles" id='right-yuga' style={{ display: visibleBox === 'right-yuga' ? 'block' : 'none' }}>12,000</p>
            <p className="tiles" id='right-sahasra' style={{ display: visibleBox === 'right-sahasra' ? 'block' : 'none' }}>8 Miles</p>
            <p className="tiles" id="right-yojan" style={{ display: visibleBox === 'right-yojan' ? 'block' : 'none' }}>1000</p>
          </div>

        </div>

        <div className="form1">
          <label htmlFor="" >Yuga:</label>
          <form action="">
            <input type="number" name="" id="yuga" />
          </form>
          <div>X</div>
          <label htmlFor="">Sahasra:</label>
          <form action="">
            <input type="number" name="" id="sahasra" />
          </form>
          <div>X</div>
          <label htmlFor="">Yojan:</label>

          <form action="">
            <input type="number" name="" id="yojan" />
          </form>
          <div>=</div>
          <div id="result"></div>
          <div>Miles</div>

          <button onClick={multiplyValues}>Submit</button>
        </div>

        <div className='Note'>
          1 Mile = 1.60 KM
        </div>

        <div className="form2">
          <form action="">
            <input type="number" name="" id="miles" />
          </form>
          <label htmlFor="" >Miles</label>
          <div>X</div>
          <form action="">
            <input type="number" name="" id="km" />
          </form>
          <label htmlFor="">KM</label>
          <div>=</div>
          <div id="result2"></div>
          <div>KM</div>
          <button onClick={multiplyValues2}>Submit</button>
        </div>

        <div id="message"></div>
      </div>


      {/* Popup Modal */}
      {popupVisible && (
        <div className="popup">
          <div className="popup-content" style={{ color: popupColor }}> {/* Dynamically set the color */}
            <p>{popupMessage}</p>
            <button onClick={() => setPopupVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
