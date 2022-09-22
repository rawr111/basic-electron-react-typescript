import MaFileInterface from "./maFileInterface";
import ProfileDataInterface from "./ProfileDataInterface";
import ProxyInterface from "./ProxyInterface";

export default interface ProfileInterface extends ProfileDataInterface {
    id: string;
    proxy: ProxyInterface | null;
    userAgent: string;
    extensions: string[];
}