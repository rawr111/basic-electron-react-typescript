//import puppeteer from 'puppeteer';
import fs from 'node:fs/promises';
const chromium = require('chromium');
import ncp from 'ncp';
//console.log(puppeteer);
import ChromeOptionsInterface from '../../interfaces/ChromeOptionsInterface';
import ProfileInterface from '../../interfaces/ProfileInterface';
import path from 'path';
import { spawn } from 'child_process';

class Chrome {
    isOpen: boolean;
    options: ChromeOptionsInterface;
    profile: ProfileInterface;
    object: any;
    dirs: { initialProfileData: string, profileData: string, extensions: string[], chromium: string }

    constructor(options: ChromeOptionsInterface, profile: ProfileInterface) {
        this.isOpen = false;
        this.options = options;
        this.profile = profile;
        this.object = null;
        this.dirs = {
            initialProfileData: path.join(__dirname, `../../storage/initialProfile`),
            profileData: path.join(__dirname, `../../storage/userdata/${this.profile.name}`),
            chromium: path.join(__dirname, `../../node_modules/chromium/lib/chromium/chrome-win/chrome.exe`),
            extensions: [path.join(__dirname, '../../storage/extensions/sih'), path.join(__dirname, '../../storage/extensions/metamask')]
        }
    }
    copyProfileData(): Promise<void> {
        return new Promise((resolve, reject) => {
            ncp(this.dirs.initialProfileData, this.dirs.profileData, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    async saveProfileData() {
        try {
            if (this.isOpen) throw new Error('Browser is open');
            await this.copyProfileData();
            if (this.profile.avatarPath){
                await fs.copyFile(this.profile.avatarPath, path.join(this.dirs.profileData, './Avatars/avatar_generic.png'));
            }
            const localStatePath = path.join(this.dirs.profileData, './Local State');
            const localStateText = await fs.readFile(localStatePath, 'utf-8');
            const localState = JSON.parse(localStateText);
            localState.profile.info_cache.Default.name = this.profile.name;
            await fs.writeFile(localStatePath, JSON.stringify(localState));
        } catch (err){
            throw new Error(`Cant set profile data ${this.profile.id}: ${err}`);
        }
    }
    async start() {
        this.object = spawn(this.dirs.chromium, [
            'https://google.com',
            `--load-extension=${this.dirs.extensions.join(',')}`,
            `--user-data-dir=${this.dirs.profileData}`
        ]);
        this.isOpen = true;
        this.object.on('close', ()=>{
            this.isOpen = false;
        });
    }
    close() {
        if (this.object) this.object.kill();
    }
    on(event: string, listener: (code: number | null, signal: NodeJS.Signals | null) => void) {
        if (this.object) this.object.on(event, listener);
    }
}

export default Chrome;