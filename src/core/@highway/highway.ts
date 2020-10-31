import Echo from "helpers/Echo";
import Handler, {dash} from "./lib/Handler";

// This is the dev CLI for this project, documentation is contained in the application readme. Ways to modify the CLI is also written in the readme.

Handler.run().catch( (e) => {
    dash.stop();
    Echo.error(e);
});


