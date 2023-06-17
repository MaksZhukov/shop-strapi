import { ContentLayout, HeaderLayout, Layout } from "@strapi/design-system";

import {
    Box,
    Button,
    DatePicker,
    Flex,
    Radio,
    RadioGroup,
    Typography,
} from "@strapi/design-system";
import { useFetchClient } from "@strapi/helper-plugin";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const date = new Date();
const nextDate = new Date(date);
nextDate.setDate(nextDate.getDate() + 1);

const HomePage = () => {
    const client = useFetchClient();
    const [jobs, setJobs] = useState<
        {
            id: number;
            startDate: string;
            endDate: string;
            allProducts: boolean;
        }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(date);
    const [endDate, setEndDate] = useState<Date>(nextDate);
    const [selectedRadio, setSelectedRadio] = useState<"all" | "specific">(
        "specific"
    );
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchJobs = async () => {
            const {
                data: { data },
            } = await client.get("/telegram/jobs");
            setJobs(data);
        };
        fetchJobs();
    }, []);
    const handleClickAdd = async () => {
        if (selectedRadio === "specific" && !inputRef.current?.files?.length) {
            alert("Выберите файл");
            return;
        }
        setLoading(true);
        const body = {
            startDate: startDate.toISOString(),
            endDate: endDate?.toISOString(),
            allProducts: selectedRadio === "all",
        };
        if (selectedRadio === "specific" && inputRef.current?.files) {
            const formData = new FormData();
            formData.append("files", inputRef.current?.files[0]);
            const { data } = await axios.post(
                //@ts-expect-error error
                strapi.backendURL + "/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const [file] = data;
            //@ts-expect-error error
            body.filePath = file.url;
        }
        const {
            data: { data },
        } = await client.post(`/telegram/jobs`, body, { timeout: 300000 });
        setLoading(false);
        setJobs([...jobs, data]);
    };

    const handleClickDelete = (id: number) => async () => {
        await client.del(`/telegram/jobs/${id}`);
        setJobs(jobs.filter((item) => item.id !== id));
    };

    const renderInputFile = (
        <label
            style={{
                cursor: "pointer",
                alignSelf: "end",
            }}
        >
            Выбрать файл...
            <input
                ref={inputRef}
                accept=".txt"
                style={{
                    opacity: 0,
                    position: "absolute",
                    zIndex: -1,
                }}
                type="file"
            />
        </label>
    );

    return (
        <Layout>
            <HeaderLayout
                title="Telegram"
                subtitle="Отправка ссылок для заданной даты"
                as="h1"
            />
            <ContentLayout>
                {jobs.map((job) => (
                    <Flex marginBottom="15px" gap={"10px"} key={job.id}>
                        <Typography>
                            Отправка ссылок № {job.id}{" "}
                            {job.allProducts ? "ВСЕ" : ""}
                        </Typography>
                        <Typography>
                            Дата начала{" "}
                            {new Date(job.startDate).toLocaleDateString()}
                        </Typography>
                        <Typography>
                            Дата окончания{" "}
                            {new Date(job.endDate).toLocaleDateString()}
                        </Typography>
                        <Button
                            variant="danger"
                            onClick={handleClickDelete(job.id)}
                        >
                            Удалить
                        </Button>
                    </Flex>
                ))}
                <Box marginTop="20px">
                    <Flex gap={"10px"}>
                        <DatePicker
                            onChange={setStartDate}
                            selectedDate={startDate}
                            label="Дата начала"
                        />
                        <DatePicker
                            onChange={setEndDate}
                            selectedDate={endDate}
                            label="Дата окончания"
                        />
                        {jobs.find((item) => item.allProducts) ? (
                            renderInputFile
                        ) : (
                            <>
                                <Box style={{ alignSelf: "end" }}>
                                    <RadioGroup
                                        onChange={(e: any) =>
                                            setSelectedRadio(e.target.value)
                                        }
                                        value={selectedRadio}
                                    >
                                        <Radio value="all">Все товары</Radio>
                                        <Radio value="specific">Выбрать</Radio>
                                    </RadioGroup>
                                </Box>
                                {selectedRadio === "specific" &&
                                    renderInputFile}
                            </>
                        )}
                    </Flex>
                    <Button
                        marginTop="10px"
                        disabled={loading}
                        loading={loading}
                        onClick={handleClickAdd}
                    >
                        Добавить
                    </Button>
                </Box>
            </ContentLayout>
        </Layout>
    );
};

export default HomePage;
