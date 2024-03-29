export default ({ env }) => ({
    redis: {
        config: {
            connections: {
                default: {
                    connection: {
                        host: env("CACHE_HOST", "127.0.0.1"),
                        port: 6379,
                        db: 0,
                    },
                    settings: {
                        debug: false,
                    },
                },
            },
        },
    },
    "rest-cache": {
        enabled: true,
        config: {
            provider: {
                name: "redis",
                options: {
                    max: 32767,
                    connection: "default",
                },
            },
            strategy: {
                contentTypes: [
                    "api::product.product",
                    "api::wheel.wheel",
                    "api::spare-part.spare-part",
                    "api::tire.tire",
                    "api::cabin.cabin",
                    "api::model.model",
                    "api::brand.brand",
                    "api::kind-spare-part.kind-spare-part",
                    "api::review.review",
                    "api::tire-brand.tire-brand",
                    "api::engine-volume.engine-volume",
                    "api::generation.generation",
                ],
                debug: false,
                hitpass: true,
                enableEtagSupport: true
            },
        },
    },
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
    email: {
        config: {
            provider: "strapi-provider-email-smtp",
            providerOptions: {
                host: env("SMTP_HOST"), //SMTP Host
                port: 465, //SMTP Port
                secure: true,
                username: env("SMTP_USERNAME"),
                password: env("SMTP_PASSWORD"),
                rejectUnauthorized: true,
                requireTLS: true,
                connectionTimeout: 1,
            },
        },
        settings: {
            defaultFrom: env("SMTP_USERNAME"),
            defaultReplyTo: env("SMTP_USERNAME"),
            testAddress: env("SMTP_USERNAME"),
        },
    },
    ckeditor: {
        enabled: true,
        config: {
            plugin: {
                // disable data-theme tag setting //
                // setAttribute:false,
                // disable strapi theme, will use default ckeditor theme //
                // strapiTheme:false,
                // styles applied to editor container (global scope) //
                // styles:`
                // .ck.ck-editor__main .ck-focused{
                //   max-height: 700px;
                // }
                // :root{
                //   --ck-color-focus-border:red;
                //   --ck-color-text:red;
                // }
                // `
            },
            editor: {
                // editor default config

                // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
                // if you need markdown support and output set: removePlugins: [''],
                // default is
                // removePlugins: ['Markdown'],

                // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
                toolbar: {
                    items: [
                        "paragraph",
                        "heading1",
                        "heading2",
                        "|",
                        "bold",
                        "italic",
                        "fontColor",
                        "fontBackgroundColor",
                        "fontFamily",
                        "underline",
                        "fontSize",
                        "removeFormat",
                        "|",
                        "bulletedList",
                        "todoList",
                        "numberedList",
                        "|",
                        "alignment",
                        "outdent",
                        "indent",
                        "horizontalLine",
                        "|",
                        "StrapiMediaLib",
                        "insertTable",
                        "blockQuote",
                        "mediaEmbed",
                        "link",
                        "highlight",
                        "|",
                        "htmlEmbed",
                        "sourceEditing",
                        "code",
                        "codeBlock",
                        "|",
                        "subscript",
                        "superscript",
                        "strikethrough",
                        "specialCharacters",
                        "|",
                        "heading",
                        "fullScreen",
                        "undo",
                        "redo",
                    ],
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
                fontSize: {
                    options: [9, 11, 13, "default", 17, 19, 21, 27, 35],
                    supportAllValues: false,
                },
                fontFamily: {
                    options: [
                        "default",
                        "Roboto, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif",
                        "Courier New, Courier, monospace",
                        "Georgia, serif",
                        "Lucida Sans Unicode, Lucida Grande, sans-serif",
                        "Tahoma, Geneva, sans-serif",
                        "Times New Roman, Times, serif",
                        "Trebuchet MS, Helvetica, sans-serif",
                        "Verdana, Geneva, sans-serif",
                        "Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif",
                    ],
                    supportAllValues: true,
                },
                fontColor: {
                    columns: 5,
                    documentColors: 10,
                },
                fontBackgroundColor: {
                    columns: 5,
                    documentColors: 10,
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                // default language: 'en',
                // https://ckeditor.com/docs/ckeditor5/latest/features/images/images-overview.html
                image: {
                    resizeUnit: "%",
                    resizeOptions: [
                        {
                            name: "resizeImage:original",
                            value: null,
                            icon: "original",
                        },
                        {
                            name: "resizeImage:25",
                            value: "25",
                            icon: "small",
                        },
                        {
                            name: "resizeImage:50",
                            value: "50",
                            icon: "medium",
                        },
                        {
                            name: "resizeImage:75",
                            value: "75",
                            icon: "large",
                        },
                    ],
                    toolbar: [
                        "toggleImageCaption",
                        "imageTextAlternative",
                        "imageStyle:inline",
                        "imageStyle:block",
                        "imageStyle:alignLeft",
                        "imageStyle:alignRight",
                        "ImageResizeEditing",
                        "linkImage",
                        "resizeImage:25",
                        "resizeImage:50",
                        "resizeImage:75",
                        "resizeImage:original",
                    ],
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
                table: {
                    contentToolbar: [
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "tableCellProperties",
                        "tableProperties",
                        "toggleTableCaption",
                    ],
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
                heading: {
                    options: [
                        {
                            model: "paragraph",
                            title: "Paragraph",
                            class: "ck-heading_paragraph",
                        },
                        {
                            model: "heading1",
                            view: "h1",
                            title: "Heading 1",
                            class: "ck-heading_heading1",
                        },
                        {
                            model: "heading2",
                            view: "h2",
                            title: "Heading 2",
                            class: "ck-heading_heading2",
                        },
                        {
                            model: "heading3",
                            view: "h3",
                            title: "Heading 3",
                            class: "ck-heading_heading3",
                        },
                        {
                            model: "heading4",
                            view: "h4",
                            title: "Heading 4",
                            class: "ck-heading_heading4",
                        },
                    ],
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
                htmlSupport: {
                    allow: [
                        {
                            name: "img",
                            attributes: {
                                sizes: true,
                                loading: true,
                            },
                        },
                    ],
                },
            },
        },
    },
    // upload: {
    //     config: {
    //         // sizeLimit: 1 * 1024 * 1024,
    //     },
    // },
    internal: {
        enabled: true,
        resolve: "./src/plugins/internal",
    },
    telegram: {
        enabled: false,
        resolve: "./src/plugins/telegram",
    },
});
