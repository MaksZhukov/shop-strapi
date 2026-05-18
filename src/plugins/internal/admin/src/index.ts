import { prefixPluginTranslations } from "@strapi/helper-plugin";

import pluginPkg from "../../package.json";
import PluginIcon from "./components/PluginIcon";
import pluginId from "./pluginId";

const name = pluginPkg.strapi.name;

export default {
    register(app: {
        addMenuLink: (config: object) => void;
        registerPlugin: (config: object) => void;
    }) {
        app.addMenuLink({
            to: `/plugins/${pluginId}`,
            icon: PluginIcon,
            intlLabel: {
                id: `${pluginId}.plugin.name`,
                defaultMessage: "Internal",
            },
            Component: async () => {
                const component = await import(
                    /* webpackChunkName: "internal-plugin-page" */ "./pages/App"
                );
                return component;
            },
            permissions: [],
        });

        app.registerPlugin({
            id: pluginId,
            name,
            isReady: true,
        });
    },

    async registerTrads({ locales }: { locales: string[] }) {
        const importedTrads = await Promise.all(
            locales.map((locale) =>
                import(`./translations/${locale}.json`)
                    .then(({ default: data }) => ({
                        data: prefixPluginTranslations(data, pluginId),
                        locale,
                    }))
                    .catch(() => ({ data: {}, locale }))
            )
        );

        return Promise.resolve(importedTrads);
    },
};
