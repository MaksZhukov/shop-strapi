import { auth } from "@strapi/helper-plugin";

import pluginId from "../pluginId";

export const getTrad = (id: string) => `${pluginId}.${id}`;

const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

export const downloadCatalogJson = async (): Promise<void> => {
    const backendURL =
        (
            window as Window & {
                strapi?: { backendURL?: string };
            }
        ).strapi?.backendURL ||
        process.env.STRAPI_ADMIN_BACKEND_URL ||
        "";

    const response = await fetch(
        `${backendURL}/${pluginId}/downloadCatalogJson`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${auth.getToken()}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to download");
    }

    const blob = await response.blob();
    downloadBlob(blob, "catalog.json");
};
