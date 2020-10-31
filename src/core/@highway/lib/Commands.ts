// tslint:disable:variable-name
// tslint:disable:prefer-for-of

import ICommand from "../../interfaces/highway/ICommand";
import Files from "helpers/Files";
import {dash} from "./Handler";

export default class Commands {
    private static _importDir: string = "/commands";
    private static abs_curr_dir: string = Files.projectBaseDir("/src/core/@highway/lib");
    static commands: Map<string, ICommand> = new Map<string, ICommand>();

    public static loadCommands = async ():Promise<void> => {
        // Display loading information
        dash.message("looking for commands directory");


        // Get directory information  (relative and absolute)
        const rel_dir = '.'+Commands._importDir;
        const abs_dir = Commands.abs_curr_dir+Commands._importDir;

        // Check if command directory exists.
        if(!Files.dirExists(abs_dir)) {
            throw Error("command dir \""+abs_dir+"\" does not exist");
        }

        dash.message("command directory found, loading commands modules");

        // need to resolve entry point for path related functions.
        const folderModules:string[] = Files.getDirModules(abs_dir);

        // Loop through the commands directory and load modules using dynamic imports.
        for(let i=0; i<folderModules.length; i++){
            const import_dir:string = rel_dir+"/"+folderModules[i];
            const _import = await import(`${import_dir}`);
            const CommandObj = _import.default;
            const commandObj = new CommandObj();
            Commands.commands.set(commandObj.commandString, commandObj);
        }

        dash.message("command modules loaded.");
    };

}
