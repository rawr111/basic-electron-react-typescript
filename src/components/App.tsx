import React, { useState, useRef } from 'react';
import MaFileInterface from '../../electron/interfaces/maFileInterface';
import ProfileDataInterface from '../../electron/interfaces/ProfileDataInterface';
import '../css/App.css';

export const App: React.FC = () => {
  const maFileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [steamAccountName, setSteamAccountName] = useState("");
  const [steamPassword, setSteamPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [proxy, setProxy] = useState("");

  return (
    <>
      <div>
        <h2>create new profile: </h2>
        <div>
          <input type="text" placeholder='profile name' value={name} onChange={(e) => { setName(e.target.value); }} />
          <input type="text" placeholder='steam account name' value={steamAccountName} onChange={(e) => { setSteamAccountName(e.target.value); }} />
          <input type="text" placeholder='steam password' value={steamPassword} onChange={(e) => { setSteamPassword(e.target.value); }} />
          <input type="file" ref={maFileInput} />
          <input type="text" placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value); }} />
          <input type="text" placeholder='email password' value={emailPassword} onChange={(e) => { setEmailPassword(e.target.value); }} />
          <input type="text" placeholder='login:password@host:port' value={proxy} onChange={(e) => { setProxy(e.target.value); }} />
        </div>
        <button onClick={async () => {
          try {
            const loadFiles = maFileInput.current?.files;
            if (!loadFiles) {
              return alert(`Некорректный мафайл!`);
            }
            const maFileText = await loadFiles[0].text();
            const maFile = JSON.parse(maFileText) as MaFileInterface;

            const profileData: ProfileDataInterface = {
              name: name,
              steamAccountName: steamAccountName,
              steamPassword: steamPassword,
              maFile: maFile,
              email: email,
              emailPassword: emailPassword,
              proxyStr: proxy
            }
            window.Main.createNewProfile(profileData);
          } catch (err) {
            alert(`Ошибка при создании профиля: ${err}`);
          }
        }}>create</button>
      </div>
      <div>
        <h2>profiles: </h2>
        <div>

        </div>
      </div>
    </>
  );
}