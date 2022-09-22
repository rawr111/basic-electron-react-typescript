import ProfileData from "../../interfaces/ProfileDataInterface";
import ProfileInterface from "../../interfaces/ProfileInterface";
import { v4 as uuidv4 } from 'uuid';
import generateProxy from "./generateProxy";
import UserAgent from 'user-agents';

export default (profileData: ProfileData): ProfileInterface => {
    const profile: ProfileInterface = {
        ...profileData,
        id: uuidv4(),
        proxy: generateProxy(profileData.proxyStr),
        userAgent: (new UserAgent()).toString(),
        extensions: [ 'A:/soft/trade manager/sih' ]
    }
    return profile;
} 