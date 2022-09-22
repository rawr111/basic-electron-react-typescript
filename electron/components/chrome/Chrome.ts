//import puppeteer from 'puppeteer';
import ChromeOptionsInterface from '../../interfaces/ChromeOptionsInterface';
import ProfileInterface from '../../interfaces/ProfileInterface';

class Chrome {
    options: ChromeOptionsInterface;
    profile: ProfileInterface;

    constructor(options: ChromeOptionsInterface, profile: ProfileInterface) {
        this.options = options;
        this.profile = profile;
    }

    async start() {
        const startOptions = {
            headless: false,
            args: [
                `--user-data-dir=${__dirname}/userdata/${this.profile.name}`,
                '--window-size=1920,1080',
                `--proxy-server=${this.profile.proxy?.host}:${this.profile.proxy?.port}`,
                '--disable-extensions-except=A:/soft/trade manager/sih',
                `--load-extension=A:/soft/trade manager/sih`,
                '--gaia-profile-info',
                `--user-agent=${this.profile.userAgent}`
            ]
        };
        /*
        const browser = await puppeteer.launch(startOptions);
        const page = await browser.newPage();
        await page.setUserAgent(this.profile.userAgent);
        await page.setViewport(this.options.windowSettings);
        if (this.profile.proxy) {
            await page.authenticate({
                username: this.profile.proxy?.login,
                password: this.profile.proxy?.password
            });
        }

        await page.goto('https://2ip.ru/');*/
    }
}



export default Chrome;