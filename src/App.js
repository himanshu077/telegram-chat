import './App.css';
import phone from './images/phone.PNG'
import more from './images/more.PNG'
import search from './images/search.PNG'
import sticker from './images/sticker.PNG'
import emma from './images/emma.PNG'
import checkmark from './images/checkmark.PNG'
import mic from './images/mic.PNG'
import stickerIcon from './images/sticker-icon.PNG'
import clip from './images/clip.PNG'

function App() {
  return (
    <div className="chat-div">
      <div className="flex px-4 py-2 items-center bg-gray-100 text-xl font-bold text-gray-700">
        Telegram
      </div>
      <div className="flex user-header">
        <div className="flex items-center">
          <img className="avatar-img"
               src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png" />
          <div className="">
            <h1 className="text-black-500 text-xl font-medium">Yury Smykalov</h1>
            <p className="text-gray-400 font-normal">last seen recently</p>
          </div>
        </div>
        <div className="action-div">
          <button type="button"><img src={phone} /></button>
          <button type="button"><img src={search} /></button>
          <button type="button"><img src={more} /></button>
        </div>
      </div>
      <div className="scroll-div">
        <div className="date-div">
          <p className="flex justify-center text-gray-400 font-medium text-xl p-2">Today</p>
        </div>
        <div className="user-wrap">
          <div className="flex user-list">
            <div className="flex items-center">
              <img className="avatar-img"
                   src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png" />
              <div className="">
                <h1 className="text-blue-500 text-xl font-medium user-name">Yury Smykalov</h1>
                <p className="text-black-600 font-normal user-msg">Hey Emma</p>
              </div>
            </div>
            <div className="time-div flex items-center">
              <p className="text-gray-400 font-normal">11:47 AM</p>
            </div>
          </div>
          <div className="flex user-list">
            <div className="flex items-center">
              <div className="edited-msg">
                <p className="text-black-600 font-normal user-msg">Check out this sticker 😂</p>
              </div>
            </div>
            <div className="time-div flex items-center">
              <p className="text-gray-400 font-normal edited-p"><span>edited</span> 11:47 AM</p>
            </div>
          </div>
          <div className="flex user-list">
            <div className="flex ">
              <img className="avatar-img"
                   src="https://www.kindpng.com/picc/m/421-4212275_transparent-default-avatar-png-avatar-img-png-download.png" />
              <div className="">
                <h1 className="text-blue-500 text-xl font-medium user-name">Yury Smykalov</h1>
                <p className="text-black-600 font-normal user-msg">
                  <img src={sticker} className="sticker-img"/>
                </p>
              </div>
            </div>
            <div className="time-div flex">
              <p className="text-gray-400 font-normal">11:47 AM</p>
            </div>
          </div>
          <div className="flex user-list">
            <div className="flex items-center">
              <img className="avatar-img"
                   src={emma} />
              <div className="">
                <h1 className="text-blue-500 text-xl font-medium user-name">Emma Anderson</h1>
                <p className="text-black-600 font-normal user-msg">Love it!!!</p>
              </div>
            </div>
            <div className="time-div flex items-center">
              <p className="text-gray-400 font-normal flex items-center"><span className="checkmark"><img src={checkmark} /></span> 11:47 AM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="message-div">
        <button className="msg-icon"><img src={clip}/> </button>
        <input type="text" className="message-input" placeholder="Write a message..."/>
        <button className="msg-icon"><img src={stickerIcon}/> </button>
        <button className="msg-icon"><img src={mic}/> </button>
      </div>
    </div>
  );
}

export default App;
