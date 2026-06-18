"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core_1 = require("@actions/core");
const dependencies_1 = require("./dependencies");
const graphs_1 = require("./graphs");
const secrets_1 = require("./helpers/secrets");
const workflows_1 = require("./helpers/workflows");
const site_1 = require("./site");
const summary_1 = require("./summary");
const update_1 = require("./update");
const update_template_1 = require("./update-template");
const token = (0, secrets_1.getSecret)("GH_PAT") || (0, core_1.getInput)("token") || (0, secrets_1.getSecret)("GITHUB_TOKEN");
const SECRETS_CONTEXT = process.env.SECRETS_CONTEXT || "{}";
const allSecrets = JSON.parse(SECRETS_CONTEXT);
Object.keys(allSecrets).forEach((key) => {
    process.env[key] = allSecrets[key];
});
const run = async () => {
    if (!token)
        throw new Error("GitHub token not found");
    console.log(`

🔼 Upptime @${await (0, workflows_1.getUptimeMonitorVersion)()}
GitHub-powered open-source uptime monitor and status page by Anand Chowdhary

* Source: https://github.com/upptime/upptime
* Docs and more: https://upptime.js.org
* More by Anand Chowdhary: https://anandchowdhary.com
`);
    switch ((0, core_1.getInput)("command")) {
        case "summary":
            (0, core_1.debug)("Starting summary");
        case "readme":
            (0, core_1.debug)("Starting readme");
            return (0, summary_1.generateSummary)();
        case "site":
            (0, core_1.debug)("Starting site");
            return (0, site_1.generateSite)();
        case "graphs":
            (0, core_1.debug)("Starting site");
            return (0, graphs_1.generateGraphs)();
        case "response-time":
            (0, core_1.debug)("Starting response-time");
            return (0, update_1.update)(true);
        case "update-dependencies":
            (0, core_1.debug)("Starting update-dependencies");
            return (0, dependencies_1.updateDependencies)();
        case "update-template":
            (0, core_1.debug)("Starting update-template");
            return (0, update_template_1.updateTemplate)();
        default:
            (0, core_1.debug)("Starting update");
            return (0, update_1.update)();
    }
};
exports.run = run;
(0, exports.run)()
    .then(() => { })
    .catch((error) => {
    console.error("ERROR", error);
    (0, core_1.setFailed)(error.message);
});
//# sourceMappingURL=index.js.map