import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/file-input/dist/style.css";
import { Dashboard } from "@uppy/react";
import axios from "axios";
import type { NextPage } from "next";
import React from "react";

const UploadPage: NextPage = () => {
  const uppy = React.useMemo(() => {
    return new Uppy({
      restrictions: {
        maxNumberOfFiles: 10,
      },
      allowMultipleUploadBatches: true,
      onBeforeUpload: (files) => {
        const keys = Object.keys(files);
        let isMarkedAsMain = false;

        for (let i = 0; i < keys.length; i++) {
          const file = files[keys[i]];
          if (file.meta.main == "true") {
            if (isMarkedAsMain) {
              uppy.info("Please select only one file as main");
              return false;
            }
            isMarkedAsMain = true;
          }
        }

        if (isMarkedAsMain) return files;

        uppy.info("Please select atlease one file as main");
        return false;
      },
    }).use(AwsS3, {
      async getUploadParameters(file): Promise<any> {
        const body = JSON.stringify({
          filename: file.name,
          contentType: file.type,
          isMain: file.meta.main,
        });

        const response = await axios.post("/api/upload", {
          data: body,
        });

        return response.data;
      },
    });
  }, []);

  return (
    <Dashboard
      uppy={uppy}
      hideUploadButton={false}
      proudlyDisplayPoweredByUppy={false}
      metaFields={(file) => {
        return [
          {
            id: "main",
            name: "Main",
            render({ value, onChange, required, form }, h) {
              return h("input", {
                type: "checkbox",
                required,
                form,
                onChange: (ev: any) => {
                  onChange(ev.target.checked ? "true" : "false");
                },
                defaultChecked: value === "true",
              });
            },
          },
        ];
      }}
      autoOpenFileEditor={true}
    ></Dashboard>
  );
};

export default UploadPage;
