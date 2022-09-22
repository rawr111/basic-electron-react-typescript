import MaFileInterface from "./maFileInterface";

export default interface ProfileData {
    name: string;
    steamAccountName: string;
    steamPassword: string;
    maFile: MaFileInterface;
    email: string;
    emailPassword: string;
    proxyStr: string;
}