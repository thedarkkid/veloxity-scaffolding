// Class helper file generated with Highway-CLI.
import ILooseObject from "core/interfaces/ILooseObject";
import Files from "core/helpers/Files";
import IMailerConfig from "core/interfaces/helpers/IMailerConfig";
import IMailerMessage from "core/interfaces/helpers/IMailerMessage";
import IMailerObject from "core/interfaces/helpers/IMailerObject";
import Generator from "core/helpers/Generator";
import nodemailer, {SentMessageInfo} from "nodemailer";

class Mailer{
    protected testAccount: nodemailer.TestAccount;
    protected transporter: nodemailer.Transporter;
    protected type:string = "default"; // "default" || "forgot"
    protected templates:ILooseObject = {
        default: Files.projectBaseDir("src/static/templates/mail/default.mail.ejs"),
        forgot: Files.projectBaseDir("src/static/templates/mail/forgot.password.mail.ejs"),
        reset: Files.projectBaseDir("src/static/templates/mail/reset.password.mail.ejs")
    };

    protected initTestAccount = async() => {
        this.testAccount = await nodemailer.createTestAccount();
    };

    protected initTransporter = async () => {
        this.transporter = nodemailer.createTransport({
            // @ts-ignore
            host: (process.env.MAIL_HOST) ? process.env.MAIL_HOST : 'smtp.ethereal.email',
            port: (process.env.MAIL_PORT) ? process.env.MAIL_PORT : 587,
            secure: (process.env.MAIL_SECURE === "true"), // true for 465, false for other ports
            auth: {
                user: (process.env.MAIL_USERNAME) ? process.env.MAIL_USERNAME : this.testAccount.user, // generated ethereal user
                pass: (process.env.MAIL_PASSWORD) ? process.env.MAIL_PASSWORD : this.testAccount.pass, // generated ethereal password
            },
        });
    };

    constructor(config: IMailerConfig) {
        if(config.type &&  this.templates.hasOwnProperty(config.type)) this.type = config.type;
    }

    public mail = async (message: IMailerMessage):Promise<SentMessageInfo> => {
        await this.initTestAccount();
        await this.initTransporter();
        return await this.transporter.sendMail(this.convertMessageToObject(message));
    };

    protected convertMessageToObject = (message: IMailerMessage):IMailerObject => {
        const mailerObject: IMailerObject = {
            from: message.from,
            to: message.to,
            subject: message.subject,
            html: ""
        };
        mailerObject.html = Generator.generateCode(this.templates[this.type], message.meta);
        return mailerObject;
    }

}

export default Mailer;
