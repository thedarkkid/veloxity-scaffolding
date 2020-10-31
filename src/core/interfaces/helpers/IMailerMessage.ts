import ILooseObject from "core/interfaces/ILooseObject";

export default interface IMailerMessage{
    from: string; // sender address
    to: string; // list of receivers
    subject: string; // Subject line
    message:  string; // html message
    meta?: ILooseObject;
}