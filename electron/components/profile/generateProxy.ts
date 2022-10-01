import ProxyInterface from "../Request/ProxyInterface";

export default (proxyStr: string): ProxyInterface => {
    const username: string = proxyStr.split('@')[0].split(':')[0];
    const password: string = proxyStr.split('@')[0].split(':')[1];
    const host: string = proxyStr.split('@')[1].split(':')[0];
    const port: string = proxyStr.split('@')[1].split(':')[1];
    const proxy: ProxyInterface = {
        username,
        password,
        host,
        port
    };
    return proxy;
}