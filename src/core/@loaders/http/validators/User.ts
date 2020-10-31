// Loader Load file generated with Highway-CLI.

    // register GetPasswordResetLink validator
    import GetPasswordResetLink_ from "http/validators/User/GetPasswordResetLink";
    export const GetPasswordResetLinkValidator =  GetPasswordResetLink_;

    // register Login validator
    import Login_ from "http/validators/User/Login";
    export const LoginValidator =  Login_;

    // register Register validator
    import Register_ from "http/validators/User/Register";
    export const RegisterValidator =  Register_;

    // register ResetPassword validator
    import ResetPassword_ from "http/validators/User/ResetPassword";
    export const ResetPasswordValidator =  ResetPassword_;

    // register Store validator
    import Store_ from "http/validators/User/Store";
    export const StoreValidator =  Store_;

    // register Update validator
    import Update_ from "http/validators/User/Update";
    export const UpdateValidator =  Update_;



export default { 
    GetPasswordResetLink:GetPasswordResetLinkValidator, 
    Login:LoginValidator, 
    Register:RegisterValidator, 
    ResetPassword:ResetPasswordValidator, 
    Store:StoreValidator, 
    Update:UpdateValidator,
};

