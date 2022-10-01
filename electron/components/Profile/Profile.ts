import ProfileInterface from '../../interfaces/ProfileInterface';
import generateProfile from './generateProfile';
import Chrome from '../Chrome/Chrome';
import SDA from '../SDA/SDA';
import RequestPromise from '../Request/Request';

class Profile {
    params: ProfileInterface;
    chrome: Chrome;
    sda: SDA;
    request: RequestPromise;

    constructor(params: ProfileInterface) {
        this.params = params;
        this.request = new RequestPromise(this.params.proxy);
        this.chrome = new Chrome({ windowSettings: { width: 1920, height: 1080 } }, this.params);
        this.sda = new SDA(this.params, this.request.object);
    }

}

export default Profile;