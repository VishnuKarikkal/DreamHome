export class UserModel{
    constructor
    (
        public name:String,
        public email:string,
        public password:string,
        public place:String,
        public district:String,
        public phone:String,
        public type:string,
        public imageUrl:String
    )
    {}
}