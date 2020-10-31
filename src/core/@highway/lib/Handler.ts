import Minimist from "minimist";
import Commands from "./Commands";
import ICommand from "core/interfaces/highway/ICommand";
import Messages from "helpers/Messages";
import {Spinner} from 'clui';
import _ from "lodash";
import {getParamNames, objectFilterOut} from "helpers/Utility";

export default class Handler {
    static spinner:Spinner = new Spinner("Loading commands...");

    protected static _run = async () => {
        const argv = Minimist(process.argv.slice(2));
        const cliArgs =  argv._;

        const flags = objectFilterOut(argv, "_");

        await Commands.loadCommands();
        const commands:Map<string, ICommand> = Commands.commands;

        const command = cliArgs[0];

        let possibleCommands = '';
        commands.forEach((value: ICommand, key: string) => { possibleCommands += key + "\n"; });

        if(cliArgs.length < 1)throw Error(Messages.NO_COMMAND_GIVEN_ERROR(possibleCommands));
        if (!commands.has(command)) throw Error(Messages.COMMAND_NONEXISTENT_ERROR(command, possibleCommands));

        const currentCommand = commands.get(command);
        const commandArgsLen = currentCommand.doCommand.length;
        _.merge(currentCommand.flags, flags);
        const argNames: string[] = getParamNames(currentCommand.doCommand);

        if(commandArgsLen+1 > cliArgs.length) throw Error(Messages.NOT_ENOUGH_ARGS_NAMED_ERROR(...argNames));

        dash.message("Running Command...");
        if(cliArgs.length > 1) currentCommand.doCommand(...cliArgs.slice(1));
        else currentCommand.doCommand();
    };

    static run = async () => {
        // Starting information console information display "dash"
        dash.start();

        await Handler._run();

        // Stopping information console information display "dash"
        dash.stop();
    }
}

export const dash = Handler.spinner;