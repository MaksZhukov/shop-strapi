import { ContentLayout, HeaderLayout, Layout } from "@strapi/design-system";

import {
    Box,
    Button,
    DatePicker,
    Flex,
    Typography,
} from "@strapi/design-system";
import { request } from "@strapi/helper-plugin";
import React, { useEffect, useRef, useState } from "react";
const HomePage = () => {
    const [jobs, setJobs] = useState<
        { id: number; startDate: string; endDate: string }[]
    >([]);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const fetchJobs = async () => {
            const { data } = await request("/telegram/jobs");
            setJobs(data);
        };
        fetchJobs();
    }, []);
    const handleClickAdd = async () => {
        const formData = new FormData();
        formData.append(
            "data",
            JSON.stringify({
                startDate: startDate.toString(),
                endDate: endDate?.toString(),
            })
        );
        if (inputRef.current?.files?.length) {
            formData.append("files", inputRef.current.files[0]);
        }
        const { data } = await request(`/telegram/jobs`, {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": `multipart/form-data;`,
            },
        });
        setJobs([...jobs, data]);
    };

    const handleClickDelete = (id: number) => async () => {
        await request(`/telegram/jobs/${id}`, { method: "DELETE" });
        setJobs(jobs.filter((item) => item.id !== id));
    };
    return (
        <Layout>
            <HeaderLayout
                title="Telegram"
                subtitle="Отправка ссылок для заданной даты"
                as="h1"
            />
            <ContentLayout>
                {jobs.map((job) => (
                    <Flex marginBottom="15px" gap={"10px"} key={job}>
                        <Typography>Отправка ссылок № {job.id}</Typography>
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
                        <label style={{ cursor: "pointer" }}>
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
                    </Flex>
                    <Button marginTop="10px" onClick={handleClickAdd}>
                        Добавить
                    </Button>
                </Box>
            </ContentLayout>
        </Layout>
    );
};

export default HomePage;
