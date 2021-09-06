export class StorageBrowser{
    static getStorageValue(key:any) {
        const saved = localStorage.getItem(key) || "";
        const initial = StorageBrowser.isJson(saved) ? JSON.parse(saved) : "";
        return initial ;
    }

    static setStorageValue(key:any, conteudo:any){
        localStorage.setItem(key, JSON.stringify(conteudo));
    }

    private static isJson = (str: string) : boolean => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
}