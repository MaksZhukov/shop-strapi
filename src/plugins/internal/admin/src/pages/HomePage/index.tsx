import React, { useState } from "react";
import {
    Box,
    Button,
    ContentLayout,
    Divider,
    Flex,
    HeaderLayout,
    Typography,
} from "@strapi/design-system";
import { Download } from "@strapi/icons";
import { useIntl } from "react-intl";
import { useNotification } from "@strapi/helper-plugin";

import { downloadCatalogJson, getTrad } from "../../api/catalog";

const HomePage = () => {
    const { formatMessage } = useIntl();
    const toggleNotification = useNotification();
    const [downloading, setDownloading] = useState(false);

    const handleDownload = async () => {
        setDownloading(true);
        try {
            await downloadCatalogJson();
            toggleNotification({
                type: "success",
                message: formatMessage({
                    id: getTrad("downloadSuccess"),
                    defaultMessage: "Готово",
                }),
            });
        } catch {
            toggleNotification({
                type: "warning",
                message: formatMessage({
                    id: getTrad("error"),
                    defaultMessage: "Произошла ошибка",
                }),
            });
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            <HeaderLayout
                title={formatMessage({
                    id: getTrad("page.title"),
                    defaultMessage: "Internal",
                })}
                subtitle={formatMessage({
                    id: getTrad("page.subtitle"),
                    defaultMessage:
                        "Внутренние инструменты для экспорта и обслуживания магазина",
                })}
                as="h1"
            />
            <ContentLayout>
                <Box
                    background="neutral0"
                    hasRadius
                    shadow="tableShadow"
                    padding={6}
                >
                    <Typography variant="omega" fontWeight="bold" as="h2">
                        {formatMessage({
                            id: getTrad("section.categories.title"),
                            defaultMessage: "Категории",
                        })}
                    </Typography>
                    <Box paddingTop={2} paddingBottom={4}>
                        <Typography variant="pi" textColor="neutral600">
                            {formatMessage({
                                id: getTrad("section.categories.description"),
                                defaultMessage:
                                    "Скачать SEO каталога в JSON — заголовок, описание и H1 для марок, моделей, поколений и видов запчастей.",
                            })}
                        </Typography>
                    </Box>
                    <Divider />
                    <Flex paddingTop={4} justifyContent="flex-start">
                        <Button
                            startIcon={<Download />}
                            onClick={handleDownload}
                            loading={downloading}
                        >
                            {formatMessage({
                                id: getTrad("download"),
                                defaultMessage: "Скачать каталог",
                            })}
                        </Button>
                    </Flex>
                </Box>
            </ContentLayout>
        </>
    );
};

export default HomePage;
