import React, { useState, useRef, useEffect } from 'react';
import MaFileInterface from '../../electron/interfaces/maFileInterface';
import ProfileDataInterface from '../../electron/interfaces/ProfileDataInterface';
import ProfileInterface from '../../electron/interfaces/ProfileInterface';
import '../css/App.css';

export const App: React.FC = () => {
  const maFileInput = useRef<HTMLInputElement>(null);
  const avatarInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [steamAccountName, setSteamAccountName] = useState("");
  const [steamPassword, setSteamPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [proxy, setProxy] = useState("");
  const [profiles, setProfiles] = useState([] as ProfileInterface[]);
  const [avatarPath, setAvatarPath] = useState("");

  useEffect(() => {
    window.Main.getProfiles();
    window.Main.getProfilesListener((event, profiles) => {
      setProfiles(profiles);
    });
    window.Main.getConfirmationsListener((event, confirmations)=>{
      console.log(confirmations);
    });
    window.Main.errorListener((event, err)=>{
      console.log(err);
    });
  }, []);

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
          <input type="file" accept="image/png" ref={avatarInput} />
        </div>
        <button onClick={async () => {
          try {
            const avatarFile = avatarInput.current?.files;
            const avatarPath = (avatarFile && avatarFile[0]) ? avatarFile[0].path : ``;

            const loadFiles = maFileInput.current?.files;
            if (!loadFiles) {
              return alert(`Некорректный мафайл!`);
            }
            const maFileText = await loadFiles[0].text();
            
            const maFile = JSON.parse(maFileText) as MaFileInterface;

            const steamIDmatched = maFileText.match(/"SteamID":\s*(\d+)/);
            if (!steamIDmatched){
              throw new Error();
              alert('!');
            }
            const steamID = steamIDmatched[1];
            maFile.Session.SteamID = steamID;
            console.log(maFile);

            const profileData: ProfileDataInterface = {
              avatarPath: avatarPath,
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
      <ProfilesBlock profiles={profiles} />
    </>
  );
}

const ProfilesBlock: React.FC<{ profiles: ProfileInterface[] }> = (props) => {
  const { profiles } = props;
  console.log(profiles);
  return <>
    {profiles.map((profile) => <div style={{ display: 'flex', marginBottom: '10px' }}>
      {profile.id}:{profile.name}
      <div
        style={{ backgroundColor: 'green', marginLeft: '10px', color: '#fff', cursor: 'pointer' }}
        onClick={
          () => {
            console.log(profile.id);
            window.Main.startBrowser(profile.id);
          }
        }
      >start</div>
      <div style={{ backgroundColor: 'red', marginLeft: '10px', color: '#fff', cursor: 'pointer' }}
        onClick={
          () => {
            window.Main.closeBrowser(profile.id);
          }
        }>stop</div>
      <div
        style={{
          marginLeft: '10px',
          backgroundColor: 'black',
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={() => {
          console.log(profile.id);
          window.Main.getConfirmations(profile.id);
        }}>
        confirmations
      </div>
    </div>)}
  </>
}