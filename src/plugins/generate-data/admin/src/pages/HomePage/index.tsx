/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect } from "react";

import { Select, Option } from "@strapi/design-system/Select";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import {
    BaseHeaderLayout,
    HeaderLayout,
    ContentLayout,
    Layout,
} from "@strapi/design-system/Layout";
import pluginId from "../../pluginId";
import axios from "../../utils/axiosInstance";

const HomePage: React.VoidFunctionComponent = () => {
    const [contentTypes, setContentTypes] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios.get("/content-type-builder/content-types");
            setContentTypes(data.filter((item) => item.uid.startsWith("api")));
        })();
    }, []);

    return (
        <Layout>
            <HeaderLayout
                title="Generate data"
                subtitle="Generate data for your content types"
                as="h1"
            />
            <ContentLayout>
                <Select value={selectedType} onChange={setSelectedType}>
                    {contentTypes.map((item) => (
                        <Option value={item.uid}>{item.apiID}</Option>
                    ))}
                </Select>
            </ContentLayout>
        </Layout>
    );
};

export default HomePage;
