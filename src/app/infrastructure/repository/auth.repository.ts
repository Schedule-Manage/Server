import { RegisterInput } from "../../domain/core/validators/auth.validators";
const User = require("./../../presentation/rest/model/User.model")
export default class AuthRepository{
    constructor(){}

    async register(input: RegisterInput){
        console.log(input)
    }
}