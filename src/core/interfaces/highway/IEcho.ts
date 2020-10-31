export default abstract class IEcho{
    static success: (message:string) => void;
    static error: (message:string) => void;
    static warning: (message:string) => void;
    static header: (message:string) => void;
}