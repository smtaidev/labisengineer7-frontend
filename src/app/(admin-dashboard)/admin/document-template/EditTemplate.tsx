"use client";

import LoadingButton from "@/components/shared/LoadingBtn/LoadingButton";
import tokenCatch from "@/lib/token";
import {
  useCreateServicePostMutation,
  useGetServiceTemplateQuery,
  useUpdateServiceMutation,
} from "@/redux/features/createService/serviceSlice";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  serviceTitle: string;
  serviceName: string;
  serviceDescription: string;
};

export default function EditTemplateCard() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  console.log(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const token = tokenCatch();
  const [image, setImage] = useState<File | null>(null);

  const [UploadingservicePost, { isLoading }] = useUpdateServiceMutation();
  const { data } = useGetServiceTemplateQuery({ id, token });

  const service = data?.data;
  console.log(service);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const formData = new FormData();
      // append text data

      formData.append("data", JSON.stringify(data));
      if (image) formData.append("file", image);

      const result = await UploadingservicePost({
        id,
        formData,
        token,
      }).unwrap();
      console.log(result);
      if (result?.success) {
        toast.success("Service saved successfully!");
        router.push("/admin/document-template");
      }
      reset();
      setImage(null); // clear image
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save service.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="max-w-[1079px] mx-auto bg-white p-8 rounded-2xl shadow-lg my-20">
      <h2 className="text-2xl md:text-3xl text-info font-semibold mb-6">
        Edit Template
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-col md:flex-row gap-6 items-stretch">
          {/* Upload Section */}
          {/* <div className="w-1/2 h-full">
            <label className="block text-sm md:text-xl font-medium mb-2">
              Upload Image
            </label>
            <div className="w-full p-6 bg-gray-50 border border-[#c2c2c2] rounded-md flex flex-col items-center justify-center text-center h-[460px] px-[73px]">
              {image ? (
                <div className="text-gray-500">
                  <p>Selected file: {image.name}</p>
                </div>
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-gray-500 mb-2">Drop file or browse</p>
                  <p className="text-xs text-gray-400 mb-4">
                    Format: jpeg, png & Max file size: 25 MB
                  </p>
                </>
              )}
              <div>
                <label
                  htmlFor="templateImage"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Upload File
                </label>
                <div className="relative">
                  <input
                    id="templateImage"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="px-4 py-2 bg-neutral-500 border border-gray-300 rounded-md text-center text-white">
                    Browse Files
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* Upload Section */}
          <div className="w-1/2 h-full">
            <label className="block text-sm md:text-xl font-medium mb-2">
              Upload Image
            </label>

            <div className="w-full p-6 bg-gray-50 border border-[#c2c2c2] rounded-md flex flex-col items-center justify-center text-center h-[460px] px-[73px]">
              {/* Show image preview (newly selected OR old one) */}
              {image ? (
                <div className="flex flex-col items-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Selected"
                    className="w-full max-h-[300px] object-contain mb-4 rounded-lg border"
                  />
                  <p className="text-gray-500">New file: {image.name}</p>
                </div>
              ) : service?.imageUrl ? (
                <div className="flex flex-col items-center">
                  <img
                    src={service.imageUrl} // 🔹 your API should provide full image path
                    alt="Previous"
                    className="w-full max-h-[300px] object-contain mb-4 rounded-lg border"
                  />
                  <p className="text-gray-500">Current Image</p>
                </div>
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <p className="text-gray-500 mb-2">Drop file or browse</p>
                  <p className="text-xs text-gray-400 mb-4">
                    Format: jpeg, png & Max file size: 25 MB
                  </p>
                </>
              )}

              {/* Upload input */}
              <div>
                <label
                  htmlFor="templateImage"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Upload File
                </label>
                <div className="relative">
                  <input
                    id="templateImage"
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="px-4 py-2 bg-neutral-500 border border-gray-300 rounded-md text-center text-white">
                    Browse Files
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-1/2 space-y-7">
            {/* Template Title */}
            <div>
              <label className="block text-sm md:text-xl font-medium mb-1">
                Template Title
              </label>
              <input
                type="text"
                {...register("serviceTitle", {
                  required: "Template title is required",
                  minLength: {
                    value: 3,
                    message: "Template title must be at least 3 characters",
                  },
                })}
                placeholder="Enter template title"
                defaultValue={service?.serviceTitle}
                className="w-full px-4 py-5 border border-zinc-300 rounded-lg bg-white "
              />
              {errors.serviceTitle && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceTitle.message}
                </p>
              )}
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm md:text-xl font-medium mb-1">
                Select Service
              </label>
              <input
                type="text"
                {...register("serviceName", {
                  required: "Service selection is required",
                })}
                placeholder="Select service"
                defaultValue={service?.serviceName}
                className="w-full px-4 py-5 border border-zinc-300 rounded-lg text-black"
              />
              {errors.serviceName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceName.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm md:text-xl font-medium">
                Description
              </label>
              <textarea
                rows={8}
                {...register("serviceDescription", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                defaultValue={service?.serviceDescription}
                placeholder="Instantly create and manage HTK files for your property. Upload your documents, and the platform does the rest—powered by AI."
                className="w-full px-3 py-2 border border-zinc-300 rounded-lg resize-none"
              />
              {errors.serviceDescription && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.serviceDescription.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="flex items-center justify-center bg-primary hover:bg-blue-700 text-white py-[13px] px-[32px] rounded-lg transition"
          >
            {isLoading ? <LoadingButton /> : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
