// tslint:disable:no-console

import IEcho from "../interfaces/highway/IEcho";
import chalk from "chalk";
// @ts-ignore

export default class Echo extends IEcho{
    static success = (message:any): void => {
        console.log(
            chalk.green(message.toString())
        );
    };

    static error = (message:any): void => {
        console.log(
            chalk.red(message.toString())
        );
    };

    static warning = (message:any): void => {
        console.log(
            chalk.yellowBright(message.toString())
        );
    };

    static plain =  (message:any): void => {
        console.log(
            chalk.whiteBright(message.toString())
        );
    };

    // static header =  (message:any): void => {
    //     // @ts-ignore
    //     Figlet.parseFont('Standard', standard);
    //
    //     console.log(
    //         chalk.blueBright(
    //             Figlet.textSync(message, {horizontalLayout: 'full'})
    //         )
    //     );
    // };
}