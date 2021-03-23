import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetUser } from "../actions/user.action";
import { User } from "../user";

interface UserStateData {
    user: User;
}

/**
 * @description Event state handler for all the states.
 */
 @State<UserStateData>({
    name: 'userState',
    defaults: {
        user: {
            firstName: '',
            lastName: ''
        }
    }
})
@Injectable()
export class UserState {

    constructor(
        private http: HttpClient
    ) {}

    @Selector()
    static getUser(state: UserStateData) {
        return state.user;
    }

    @Action(GetUser)
    getUser({}: StateContext<UserStateData>) {
        console.log("[No async] Attempting API request: /api/user");
        return this.http.get('/api/user'); // Does call API.
    }

    @Action(GetUser)
    async getUser2({}: StateContext<UserStateData>) {
        console.log("[Async] Attempting API request: /api/user");
        return this.http.get('/api/user'); // Does not call API.
    }

}