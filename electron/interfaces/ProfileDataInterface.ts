import MaFileInterface from "./maFileInterface";

export default interface ProfileData {
    avatarPath: string | null;
    name: string;
    steamAccountName: string;
    steamPassword: string;
    maFile: MaFileInterface;
    email: string;
    emailPassword: string;
    proxyStr: string;
}