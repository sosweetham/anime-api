import { Elysia, t } from "elysia";
import { testBucket } from "../../../stores/s3";

export const uploadImagesRoute = new Elysia({
    serve: {
        maxRequestBodySize: 1024 * 1024 * 5,
    },
}).post(
    "upload-image",
    async ({ body }) => {
        console.log(body);
        await testBucket
            .write(body.file.name, await body.file.arrayBuffer(), {
                type: body.file.type,
            })
            .catch((e) => console.error(e));
        return "Uploaded!";
    },
    {
        body: t.Object({
            file: t.File({ format: "image/*" }),
        }),
        response: t.String(),
    },
);
