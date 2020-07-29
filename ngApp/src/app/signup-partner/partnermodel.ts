export class PartnerModel{
    constructor
    (
        public name:String,
        public email:String,
        public password:String,
        public district:Array<String>=[],
        public services:Array<String>=[],
        public phone:String,
        public imageUrl:String
    )
    {}
}