/*
 *
 * HomePage
 *
 */

import React, { useState, useEffect, useRef } from "react";

import { Select, Option } from "@strapi/design-system/Select";
import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";
import { faker } from "@faker-js/faker";
import {
    BaseHeaderLayout,
    HeaderLayout,
    ContentLayout,
    Layout,
} from "@strapi/design-system/Layout";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import {
    Dots,
    NextLink,
    PageLink,
    Pagination,
    PreviousLink,
} from "@strapi/design-system/v2/Pagination";

import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import { NumberInput } from "@strapi/design-system/NumberInput";
import { Checkbox } from "@strapi/design-system/Checkbox";
import pluginId from "../../pluginId";
import axios from "../../utils/axiosInstance";

const COUNT_PAGINATION_ROWS = 25;

const includeTypes = ["integer", "string", "richtext"];

const HomePage: React.VoidFunctionComponent = () => {
    const [contentTypes, setContentTypes] = useState([]);
    const [selectedTypeUID, setSelectedTypeUID] = useState(null);
    const [values, setValues] = useState(null);
    const [count, setCount] = useState<number>(10);
    const [activePage, setActivePage] = useState<number>(1);
    const [checkedAttributes, setCheckedAttributes] = useState<string[]>([]);
    const [generatedData, setGeneratedData] = useState([]);
    const [isFlushedPreviousData, setIsFlashedPreviousData] =
        useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const {
                data: { data },
            } = await axios.get("/content-type-builder/content-types");
            setContentTypes(data.filter((item) => item.uid.startsWith("api")));
        })();
    }, []);

    const selectedType = contentTypes.find(
        (item) => item.uid === selectedTypeUID
    );

    const attributes = selectedType
        ? Object.keys(selectedType.schema.attributes).reduce((prev, key) => {
              return includeTypes.includes(
                  selectedType.schema.attributes[key].type
              )
                  ? { ...prev, [key]: selectedType.schema.attributes[key] }
                  : prev;
          }, {})
        : null;

    useEffect(() => {
        if (attributes && !values) {
            let obj = {};
            let newCheckedAttributes = [];
            Object.keys(attributes).forEach((key) => {
                if (attributes[key].type === "integer") {
                    obj[key] = { min: 0, max: 10 };
                }
                if (
                    attributes[key].type === "string" ||
                    "richtext" === attributes[key].type
                ) {
                    obj[key] = { count: 10 };
                }
                newCheckedAttributes.push(key);
            });
            setCheckedAttributes(newCheckedAttributes);
            setValues(obj);
        }
    }, [attributes, values]);

    const handleChangeSelect = (newTypeUID: string) => {
        setValues(null);
        setSelectedTypeUID(newTypeUID);
    };

    const handleClickGenerate = () => {
        let data = [];
        for (let i = 0; i < count; i++) {
            let obj = {};
            Object.keys(attributes)
                .filter((key) => checkedAttributes.includes(key))
                .forEach((key) => {
                    if (attributes[key].type === "integer") {
                        let { min, max } = values[key];
                        obj[key] = faker.datatype.number({ min, max });
                    }
                    if (
                        attributes[key].type === "string" ||
                        "richtext" === attributes[key].type
                    ) {
                        let { count } = values[key];
                        obj[key] = faker.random.words(count);
                    }
                });
            data.push(obj);
        }
        setGeneratedData(data);
        setActivePage(1);
    };

    const handleValueChange =
        (key: string, field: string) => (value: number) => {
            console.log(value < 1);
            if (value > 0) {
                setValues({ ...values, [key]: { [field]: value } });
            }
        };

    const handleChangePagination = (page: number) => () => {
        setActivePage(page);
    };

    const handleChangeChecked = (key: string) => () => {
        if (checkedAttributes.includes(key)) {
            setCheckedAttributes(
                checkedAttributes.filter((item) => item !== key)
            );
        } else {
            setCheckedAttributes([...checkedAttributes, key]);
        }
    };

    const handleChangeIsFlushedPreviousData = () => {
        setIsFlashedPreviousData(!isFlushedPreviousData);
    };

    const handleUploadData = async () => {
        if (isFlushedPreviousData) {
            axios.post(`/generate-data/flush/${selectedType.uid}`);
        }
        await Promise.all(
            generatedData.map((item) =>
                axios.post(
                    `/content-manager/collection-types/${selectedType.uid}`,
                    item
                )
            )
        );
    };

    let renderStringInput = (key: string) => (
        <Flex gap="10px" alignItems="center">
            <Checkbox
                onChange={handleChangeChecked(key)}
                checked={checkedAttributes.includes(key)}
            ></Checkbox>
            <Typography variant="beta">{key}</Typography>
            <NumberInput
                disabled={!checkedAttributes.includes(key)}
                onValueChange={handleValueChange(key, "count")}
                value={values[key].count}
                label="Count words"
            ></NumberInput>
        </Flex>
    );

    const getAttributeInputs = (key: string) => {
        return {
            ["integer"]: (
                <Flex gap="10px">
                    <Checkbox
                        checked={checkedAttributes.includes(key)}
                    ></Checkbox>
                    <Typography variant="beta">{key}</Typography>
                    <NumberInput
                        disabled={!checkedAttributes.includes(key)}
                        onValueChange={handleValueChange(key, "min")}
                        value={values[key].min}
                        label="min"
                    ></NumberInput>
                    <NumberInput
                        disabled={!checkedAttributes.includes(key)}
                        onValueChange={handleValueChange(key, "max")}
                        value={values[key].max}
                        label="max"
                    ></NumberInput>
                </Flex>
            ),
            ["richtext"]: renderStringInput(key),
            ["string"]: renderStringInput(key),
        };
    };

    const pageCount = Math.floor(generatedData.length / COUNT_PAGINATION_ROWS);

    return (
        <Layout>
            <HeaderLayout
                title="Generate data"
                subtitle="Generate data for your content types"
                as="h1"
            />
            <ContentLayout>
                <Select
                    placeholder="Select your content type"
                    value={selectedTypeUID}
                    onChange={handleChangeSelect}
                >
                    {contentTypes.map((item) => (
                        <Option key={item.uid} value={item.uid}>
                            {item.apiID}
                        </Option>
                    ))}
                </Select>
                {selectedType &&
                    values &&
                    Object.keys(attributes).map(
                        (key) => getAttributeInputs(key)[attributes[key].type]
                    )}
                {selectedType && (
                    <Box paddingTop="10px" paddingBottom="10px">
                        <Flex alignItems="end" gap="20px">
                            <NumberInput
                                value={count}
                                onValueChange={setCount}
                                label="Count"
                            ></NumberInput>
                            <Button onClick={handleClickGenerate}>
                                Generate
                            </Button>
                        </Flex>
                    </Box>
                )}
                {!!generatedData.length && (
                    <>
                        <Table
                            footer={
                                <Pagination
                                    activePage={activePage}
                                    pageCount={pageCount}
                                    className="hello"
                                >
                                    {new Array(pageCount)
                                        .fill(null)
                                        .map((item, index) => (
                                            <PageLink
                                                number={index + 1}
                                                onClick={handleChangePagination(
                                                    index + 1
                                                )}
                                            >
                                                Go to page {index + 1}
                                            </PageLink>
                                        ))}
                                </Pagination>
                            }
                        >
                            <Thead>
                                <Tr>
                                    <Th>row</Th>
                                    {Object.keys(generatedData[0]).map(
                                        (key) => (
                                            <Th>{key}</Th>
                                        )
                                    )}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {generatedData
                                    .slice(
                                        (activePage - 1) *
                                            COUNT_PAGINATION_ROWS,
                                        COUNT_PAGINATION_ROWS * activePage
                                    )
                                    .map((item, index) => (
                                        <Tr>
                                            <Td>
                                                {index +
                                                    1 +
                                                    (activePage - 1) *
                                                        COUNT_PAGINATION_ROWS}
                                            </Td>
                                            {Object.keys(item).map((key) => (
                                                <Td>{item[key]}</Td>
                                            ))}
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                        <Flex alignItems="center" paddingTop="20px" gap="20px">
                            <Checkbox
                                checked={isFlushedPreviousData}
                                onChange={handleChangeIsFlushedPreviousData}
                            >
                                Flush previous content type data before upload
                            </Checkbox>
                            <Button onClick={handleUploadData}>
                                Upload data
                            </Button>
                        </Flex>
                    </>
                )}
            </ContentLayout>
        </Layout>
    );
};

export default HomePage;
