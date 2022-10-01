import MaFileInterface from '../../interfaces/maFileInterface';
import ProfileInterface from '../../interfaces/ProfileInterface';
import request, { CoreOptions, Request, RequestAPI, RequiredUriUrl } from 'request';
const SteamCommunity = require('steamcommunity');
const SteamTotp = require('steam-totp');

class Sda {
    community: any;
    profile: ProfileInterface;
    isLogin: boolean;
    constructor(profile: ProfileInterface, request: RequestAPI<Request, CoreOptions, RequiredUriUrl>) {
        this.profile = profile;
        this.community = new SteamCommunity({ request: request });
        this.isLogin = false;
    }

    login() {
        return new Promise((resolve, reject) => {
            this.community.oAuthLogin(
                decodeURI(this.profile.maFile.Session.SteamLogin),
                this.profile.maFile.Session.OAuthToken,
                (err: any, loggedIn: boolean, familyView: boolean) => {
                    if (err){
                        reject(err);
                    } else {
                        if (loggedIn){
                            this.isLogin = true;
                            resolve(null);
                        } else {
                            reject("Not logged in");
                        }
                    }
                });
        });
    }
    getConfirmations() {
        return new Promise((resolve, reject) => {
            const time = Number(new Date().toUTCString());
            const key = SteamTotp.generateConfirmationKey(this.profile.maFile.identity_secret, time, "conf");
            this.community.getConfirmations(time, key, (err: any, confirmations: any) => {
                if (err === 'Not Logged In'){
                    this.isLogin = false;
                }
                if (err) reject(err);
                resolve(confirmations);
            });
        });
    }
    private ExtractCookiesFromMafile(maFile: MaFileInterface) {
        console.log(maFile);
        return [
            'Steam_Language=english',
            'timezoneOffset=0,0',
            `steamMachineAuth${maFile.Session.SteamID}=${maFile.Session.WebCookie}`,
            `steamLoginSecure=${maFile.Session.SteamLoginSecure}`,
            `sessionid=${maFile.Session.SessionID}`
        ];
    }
    acceptConfirmation() {

    }
}

export default Sda;