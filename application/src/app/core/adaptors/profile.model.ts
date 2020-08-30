import { Injectable } from '@angular/core';


export class Profile {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public userid: string,
    ) { }
}

@Injectable({
    providedIn: 'root'
})
export class ProfileAdapter {

    constructor() { }

    adapt(user: any): Profile {
        return new Profile(
            user.email,
            user.firstName,
            user.lastName,
            user.userid
        )
    }
}