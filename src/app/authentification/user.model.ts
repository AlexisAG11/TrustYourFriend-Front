export class User {
    constructor(public name: string, private _token: string){}

    
    public get token() : string {
        return this._token
    }
    
}