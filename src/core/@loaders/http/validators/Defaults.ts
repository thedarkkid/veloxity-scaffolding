// Loader Load file generated with Highway-CLI.

    // register GetPasswordResetLink validator
    import GetPasswordResetLink_ from "core/http/validators/Defaults/GetPasswordResetLink";
    export const GetPasswordResetLinkValidator =  GetPasswordResetLink_;

    // register ResetPassword validator
    import ResetPassword_ from "core/http/validators/Defaults/ResetPassword";
    export const ResetPasswordValidator =  ResetPassword_;

    // register Token validator
    import Token_ from "core/http/validators/Defaults/Token";
    export const TokenValidator =  Token_;



export default { 
    GetPasswordResetLink:GetPasswordResetLinkValidator, 
    ResetPassword:ResetPasswordValidator, 
    Token:TokenValidator,
};

