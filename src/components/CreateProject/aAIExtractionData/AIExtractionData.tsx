"use client";
import { div } from "framer-motion/client";
import React, { useState, useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { warn } from "console";
import { toast } from "sonner";
import { usePosAiAllDataSaveMutation } from "@/redux/features/AI-intrigratoin/aiServiceSlice";
import LoadingButton from "@/components/shared/LoadingBtn/LoadingButton";
import tokenCatch from "@/lib/token";
import {
  setAiExtractCatchData,
  setAiExtreactAndInputData,
  setTheProjectCode,
} from "@/redux/features/AI-intrigratoin/aiFileDataSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { overflow } from "html2canvas/dist/types/css/property-descriptors/overflow";
import { CodeSquare } from "lucide-react";

type OwnerData = {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  date_of_birth: string;
  birthPlace: string;
  address_number: string;
  postalCode: string;
  city: string;
  afm: string;
  phone: string;
  email: string;
  id_number: string;
};

type ProjectData = {
  project_description: string;
  cadastralCode: string;
  type: string;
  construction: string;
  area: string;
  titleArea: string;
  building: string;
  floor: string;
  building_permi: string;
  buildingCode: string;
  neighborhood: string;
  municipal: string;
  permit_number: string;
  id_numbers: string;
};

interface LicenseLegalFormData {
  licenseNumber: string;
  licenseRevision: string;
  ydom: string;
  propertyDesc1: string;
  propertyDesc2: string;
  horizontal_property_name_two: string;
  horizontal_property_name: string;
  reexamineNumbers: string;
  notary: string;
  lotSquare: string;
  licenseIssueNumber: string;
  issueDate: string;
  issueAuthority: string;
  region: string;
  legalization_statement_number: string;
  within_outside_city_plan: string;
  inclusion_date_legalization: string;
  tee_registration_number: string;
  specialty: string;
  engineer_full_name: string;
  electronic_code: string;
}

interface EPCFormValues {
  issueDate: string;
  epcCode: string;
  protocolNumber: string;
  energyCategory: string;
  primaryEnergy: string;
  co2Emissions: string;
  zonePrice: string;
}

type OtherOpation = {
  residenceType: string;
  expectationDocument: string;
  includedInFolder: boolean;
  unauthorizedConstructions: string;
};

interface OthersValue {
  land_use: string;
  arbitrary_constructions_description: string;
  expectation_Document: string;
}

type FormValues = ProjectData &
  LicenseLegalFormData &
  EPCFormValues &
  OtherOpation &
  OthersValue & {
    owners: OwnerData[];
  };

const inputStyle =
  "w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

const AIExtractionDataInPut = ({ currentStep }: any) => {
  const [ownerInfoShow, setOwnerInfoShow] = useState<boolean>(true);
  const [ownerInfoShow2, setOwnerInfoShow2] = useState<number | null>(null);
  const [ownerInfoShow3, setOwnerInfoShow3] = useState<boolean>(true);
  const [ownerInfoShow4, setOwnerInfoShow4] = useState<boolean>(true);
  const [ownerInfoShow5, setOwnerInfoShow5] = useState<boolean>(true);
  const stepByStepData: any = useSelector((state: RootState) => state.aiData);
  console.log("courrentData", currentStep);
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      owners: stepByStepData.ownerBaseData.map((owner: any) => ({
        firstName: owner.first_name || "",
        lastName: owner.last_name || "",
        fatherName: `${owner.father_first_name || ""} ${
          owner.father_last_name || ""
        }`,
        motherName: `${owner.mother_first_name || ""} ${
          owner.mother_last_name || ""
        }`,
        birthDate: owner.date_of_birth || "",
        birthPlace: owner.place_of_birth || "",
        address: owner.owner_address || "",
        postalCode: owner.address_code || "",
        city: owner.city || "",
        afm: owner.tax_identification_number || "",
        phone: owner.mobile || "",
        email: owner.email || "",
      })),
    },
  });

  const dispatch = useDispatch();
  const hasSubmittedRef = useRef(false);

  const { fields } = useFieldArray({
    control,
    name: "owners",
  });

  console.log(fields);

  const allExtreactData = stepByStepData.aiDataState;
  const ownerData = stepByStepData.ownerBaseData;
  const projectData = stepByStepData.projectId;
  const subCategoryData = stepByStepData.subcategory;
  const filesData = stepByStepData.multiFiles;
  console.log(allExtreactData);

  const [postDataAll, { isLoading }] = usePosAiAllDataSaveMutation();

  const accessToken = tokenCatch();
  console.log("use");
  const onSubmitAiDataSend = async (data: any) => {
    // Here you can send data to API
    console.log("Form Data:", data);
    const DataPost = {
      serviceId: projectData.id,
      createdById: "68972468c6c27d509568985f",
      subCategories: subCategoryData,
      ...data,
    };

    dispatch(setAiExtreactAndInputData(DataPost));
    console.log("sever send Data:", DataPost);

    const formData = new FormData();
    filesData.forEach((file: any) => {
      formData.append("files", file);
    });
    formData.append(
      "data",
      JSON.stringify({
        serviceId: projectData.id,
        createdById: "68972468c6c27d509568985f",
        subCategories: subCategoryData,
        ...data,
      })
    );

    try {
      const res = await postDataAll({ formData, accessToken }).unwrap();
      console.log("resposive", res);
      if (res?.success) {
        dispatch(setTheProjectCode(res?.data));
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
    }
  };
  console.log(ownerData[0].id_number);
  console.log(currentStep);

  useEffect(() => {
    if (currentStep === 4 && filesData?.length && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true; // lock it
      handleSubmit(onSubmitAiDataSend)();
    }
  }, [currentStep]);
  // useEffect(() => {
  //   console.log("Effect ran", {
  //     currentStep,
  //     filesData,
  //     hasSubmitted: hasSubmittedRef.current,
  //   });

  //   if (currentStep === 4 && filesData?.length && !hasSubmittedRef.current) {
  //     hasSubmittedRef.current = true;
  //     handleSubmit(onSubmitAiDataSend)();
  //   }
  // }, [currentStep, filesData]);

  return (
    <>
      <div className="mt-[-40]">
        <h2 className="text-[#333333] text-5xl font-semibold">
          AI Extraction Data
        </h2>
        <p className=" text-[#777777] mt-3">
          Here is the extracted information. Please review and confirm.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitAiDataSend)}
        className="max-w-6xl mx-auto   rounded-xl mt-13"
      >
        <div>
          <div className="max-w-6xl mx-auto bg-white shadow-md rounded-xl p-8  ">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl md:text-2xl font-semibold  text-gray-800">
                Project & Ownership Information
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => setOwnerInfoShow(!ownerInfoShow)}
                >
                  {" "}
                  {!ownerInfoShow ? (
                    <>
                      <IoIosArrowDown className="text-2xl" />
                    </>
                  ) : (
                    <>
                      <IoIosArrowUp className="text-2xl" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {ownerInfoShow && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Περιγραφή Έργου
                  </label>
                  <input
                    {...register("project_description")}
                    className={inputStyle}
                    readOnly
                    placeholder="Ανακαίνιση κατοικίας"
                    defaultValue={allExtreactData?.project_description}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κτηματολογικός Κωδικός (ΚΑΕΚ)
                  </label>
                  <input
                    {...register("cadastralCode")}
                    className={inputStyle}
                    readOnly
                    placeholder="065-123-000-458"
                    defaultValue={allExtreactData?.kaek_property}
                    // defaultValue={dataShowExtreact?.cadastral_code_kaek}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Τύπος
                  </label>
                  <input
                    {...register("type")}
                    className={inputStyle}
                    readOnly
                    placeholder="Ανακαίνιση οικογενειακού διαμερίσματος"
                    // defaultValue={dataShowExtreact?.property_type}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κατασκευής
                  </label>
                  <input
                    {...register("construction")}
                    className={inputStyle}
                    readOnly
                    placeholder="Ανακαίνιση οικογενειακού διαμερίσματος"
                    // defaultValue={
                    //   dataShowExtreact?.arbitrary_constructions_description
                    // }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Επιφάνεια Περιοχής
                  </label>
                  <input
                    {...register("area")}
                    className={inputStyle}
                    readOnly
                    placeholder="120 τ.μ."
                    defaultValue={allExtreactData?.plot_area}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Περιοχή Τίτλου Κυριότητας
                  </label>
                  <input
                    {...register("titleArea")}
                    className={inputStyle}
                    readOnly
                    placeholder="118 τ.μ."
                    defaultValue={allExtreactData?.title_area}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αριθμός Οικοδομικής Άδειας
                  </label>
                  <input
                    {...register("permit_number")}
                    className={inputStyle}
                    readOnly
                    placeholder="118 τ.μ."
                    defaultValue={allExtreactData?.permit_number}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κτίριο
                  </label>
                  <input
                    {...register("building")}
                    className={inputStyle}
                    readOnly
                    placeholder="Αριθμός Διαμερίσματος"
                    // defaultValue={dataShowExtreact?.band_value}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Όροφος
                  </label>
                  <input
                    {...register("floor")}
                    className={inputStyle}
                    readOnly
                    placeholder="3rd Floor"
                    defaultValue={allExtreactData?.floor_property}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κτίριο Διεύθυνσης
                  </label>
                  <input
                    {...register("building_permi")}
                    className={inputStyle}
                    readOnly
                    placeholder="12 Irmou Street"
                    defaultValue={allExtreactData?.permit_number}
                    // defaultValue={dataShowExtreact?.building_permit_date}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κωδικός Δόμησης
                  </label>
                  <input
                    {...register("buildingCode")}
                    className={inputStyle}
                    readOnly
                    placeholder="BLG-2025-011"
                    // defaultValue={dataShowExtreact?.building_code}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Κτίριο Γειτονιάς
                  </label>
                  <input
                    {...register("neighborhood")}
                    className={inputStyle}
                    readOnly
                    placeholder="Νέα Σμύρνη"
                    // defaultValue={dataShowExtreact?.neighborhood}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Δημοτικό/Κοινοτικό Κτίριο
                  </label>
                  <input
                    {...register("municipal")}
                    className={inputStyle}
                    readOnly
                    placeholder="Δήμος Αθηναίων"
                    defaultValue={allExtreactData?.municipality_community}
                    // defaultValue={dataShowExtreact?.municipality_community}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Α.Δ.Τ
                  </label>
                  <input
                    {...register(`id_numbers`)}
                    defaultValue={ownerData[0].id_number}
                    className={inputStyle}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {fields.map((field, index) => (
          <div key={field.id} className="mt-10">
            <div className="p-6 md:p-8 bg-white rounded-xl ">
              <div className="flex justify-between items-center ">
                <h2 className="text-xl md:text-2xl font-semibold  text-gray-800">
                  Information of Owner ({index + 1})
                </h2>
                <div>
                  <button
                    type="button"
                    onClick={() => setOwnerInfoShow2(index)}
                  >
                    {" "}
                    {!ownerInfoShow2 ? (
                      <>
                        <IoIosArrowDown className="text-2xl" />
                      </>
                    ) : (
                      <>
                        <IoIosArrowUp className="text-2xl" />
                      </>
                    )}
                  </button>
                </div>
              </div>
              {ownerInfoShow2 === index && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Όνομα
                    </label>
                    <input
                      {...register(`owners.${index}.firstName`)}
                      defaultValue={field.firstName}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Επώνυμο
                    </label>
                    <input
                      {...register(`owners.${index}.lastName`)}
                      defaultValue={field.lastName}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Father's Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Όνομα Πατέρα
                    </label>
                    <input
                      {...register(`owners.${index}.fatherName`)}
                      defaultValue={field.fatherName}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Mother's Name */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Όνομα Μητέρας
                    </label>
                    <input
                      {...register(`owners.${index}.motherName`)}
                      defaultValue={field.motherName}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ημερομηνία γέννησης
                    </label>
                    <input
                      type="date"
                      {...register(`owners.${index}.date_of_birth`)}
                      defaultValue={field.date_of_birth}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Place of Birth */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Τόπος Γέννησης
                    </label>
                    <input
                      {...register(`owners.${index}.birthPlace`)}
                      defaultValue={field.date_of_birth}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Διεύθυνση
                    </label>
                    <input
                      {...register(`owners.${index}.address_number`)}
                      defaultValue={field.address_number}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Id_number → Α.Δ.Τ */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Α.Δ.Τ
                    </label>
                    <input
                      {...register(`owners.${index}.id_number`)}
                      defaultValue={field.id_number}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Κωδικός Διεύθυνσης
                    </label>
                    <input
                      {...register(`owners.${index}.postalCode`)}
                      defaultValue={field.postalCode}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Διεύθυνση Δήμος/Κοινότητα
                    </label>
                    <input
                      {...register(`owners.${index}.city`)}
                      defaultValue={field.city}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* AFM */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Αριθμός Φορολογικού Μητρώου (ΑΦΜ)
                    </label>
                    <input
                      {...register(`owners.${index}.afm`)}
                      defaultValue={field.afm}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Κινητό
                    </label>
                    <input
                      {...register(`owners.${index}.phone`)}
                      defaultValue={field.phone}
                      className={inputStyle}
                      readOnly
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ηλεκτρονικό Ταχυδρομείο
                    </label>
                    <input
                      type="email"
                      {...register(`owners.${index}.email`)}
                      defaultValue={field.email}
                      className={inputStyle}
                      readOnly
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* owner part  */}

        {/* License & Legal Data  */}
        <div className="mt-10">
          <div className="bg-white p-6 rounded-xl shadow-md w-full">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl md:text-2xl font-semibold  text-gray-800">
                License & Legal Data
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => setOwnerInfoShow3(!ownerInfoShow3)}
                >
                  {" "}
                  {!ownerInfoShow3 ? (
                    <>
                      <IoIosArrowDown className="text-2xl" />
                    </>
                  ) : (
                    <>
                      <IoIosArrowUp className="text-2xl" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {ownerInfoShow3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αριθμός Άδειας
                  </label>
                  <input
                    {...register("licenseNumber")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.license_number}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αναθεώρηση Αριθμού Άδειας
                  </label>
                  <input
                    {...register("licenseRevision")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.license_number_revision}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">ΥΔΟΜ</label>
                  <input
                    {...register("ydom")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.ydom_description}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αριθμός Δήλωσης Νομιμοποίησης
                  </label>
                  <input
                    {...register("legalization_statement_number")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.legalization_statement_number}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ηλεκτρονικός Κωδικός Δήλωσης
                  </label>
                  <input
                    {...register("electronic_code")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.electronic_code}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Στοιχεία Μηχανικού
                  </label>
                  <input
                    {...register("engineer_full_name")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.engineer_full_name}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ειδικότητα Μηχανικού
                  </label>
                  <input
                    {...register("specialty")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.specialty}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    → Αριθμός Μητρώου
                  </label>
                  <input
                    {...register("tee_registration_number")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.tee_registration_number}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ημερομηνία Ένταξης Νομιμοποίησης
                  </label>
                  <input
                    {...register("inclusion_date_legalization")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.inclusion_date_legalization}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Εντός/Εκτός Σχεδίου Πόλης
                  </label>
                  <input
                    {...register("within_outside_city_plan")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.within_outside_city_plan}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Περιγραφή Οριζόντιας Ιδιοκτησίας
                  </label>
                  <input
                    {...register("horizontal_property_name")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData?.horizontal_property_name}
                    // defaultValue={
                    //   dataShowExtreact.horizontal_property_description
                    // }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Περιγραφή Οριζόντιας Ιδιοκτησίας
                  </label>
                  <input
                    {...register("horizontal_property_name_two")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData?.horizontal_property_name_two}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αριθμός Ιδρύματος/Αριθμοί Επανεξέτασης
                  </label>
                  <input
                    {...register("reexamineNumbers")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.address}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Συμβολαιογράφος
                  </label>
                  <input
                    {...register("notary")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.notary}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Τετραγωνικά Μέτρα Οικοπέδου
                  </label>
                  <input
                    {...register("lotSquare")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.land_use}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Αριθμός Άδειας
                  </label>
                  <input
                    {...register("licenseIssueNumber")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.license_number}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Ημερομηνία Έκδοσης Άδειας Δόμησης
                  </label>
                  <input
                    {...register("issueDate")}
                    type="date"
                    className={inputStyle}
                    readOnly
                    // defaultValue={allExtreactData?.issuing_authority}
                    // defaultValue={dataShowExtreact.building_permit_date}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Λεπτομέρειες της Αρμόδιας Αρχής Έκδοσης
                  </label>
                  <input
                    {...register("issueAuthority")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData?.issuing_authority}
                    // defaultValue={dataShowExtreact.issuing_authority_details}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Περιφερειακή Ενότητα
                  </label>
                  <input
                    {...register("region")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.regional_unit}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* "Energy Performance Certificate (EPC)"  */}
        <div className="mt-10">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm w-full">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl md:text-2xl font-semibold  text-gray-800">
                "Energy Performance Certificate (EPC)"
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => setOwnerInfoShow4(!ownerInfoShow4)}
                >
                  {" "}
                  {!ownerInfoShow4 ? (
                    <>
                      <IoIosArrowDown className="text-2xl" />
                    </>
                  ) : (
                    <>
                      <IoIosArrowUp className="text-2xl" />
                    </>
                  )}
                </button>
              </div>
            </div>
            {ownerInfoShow4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="form-label block mb-1 ">
                    Ημερομηνία Έκδοσης PEA
                  </label>
                  <input
                    {...register("issueDate")}
                    type="date"
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.pea_issue_date}
                  />
                </div>
                <div>
                  <label className="form-label block mb-1 ">
                    Αριθμός Ασφάλειας PEA
                  </label>
                  <input
                    {...register("epcCode")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.pea_security_number}
                  />
                </div>

                <div>
                  <label className="form-label block mb-1 ">
                    Αριθμός Πρωτοκόλλου PEA
                  </label>
                  <input
                    {...register("protocolNumber")}
                    className={inputStyle}
                    readOnly
                    defaultValue={allExtreactData.property_postal_code}
                  />
                </div>
                <div>
                  <label className="form-label block mb-1 ">
                    Κατηγορία Υφιστάμενης Ενέργειας PEA
                  </label>
                  <input
                    {...register("energyCategory")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.pea_energy_category}
                  />
                </div>

                <div>
                  <label className="form-label block mb-1 ">
                    Εκτιμώμενη Ετήσια Κατανάλωση Πρωτογενούς Ενέργειας [kWh/m²]
                  </label>
                  <input
                    {...register("primaryEnergy")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.pea_annual_energy_consumption}
                  />
                </div>
                <div>
                  <label className="form-label block mb-1 ">
                    Εκτιμώμενες Ετήσιες Εκπομπές CO₂ [kg/m²]
                  </label>
                  <input
                    {...register("co2Emissions")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.pea_annual_co2_emissions}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="form-label block mb-1 ">Τιμή Ζώνης</label>
                  <textarea
                    {...register("zonePrice")}
                    className={inputStyle}
                    readOnly
                    rows={2}
                    //// defaultValue={dataShowExtreact.license_number}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "others option  */}
        {/* <div className="mt-10">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm w-full">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl md:text-2xl font-semibold  text-gray-800">
                Project & Ownership Information
              </h2>
              <div>
                <button
                  type="button"
                  onClick={() => setOwnerInfoShow5(!ownerInfoShow5)}
                >
                  {" "}
                  {!ownerInfoShow5 ? (
                    <>
                      <IoIosArrowDown className="text-2xl" />
                    </>
                  ) : (
                    <>
                      <IoIosArrowUp className="text-2xl" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {ownerInfoShow5 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div>
                  <label className="form-label block mb-1 ">Χρήση Γης</label>
                  <input
                    {...register("land_use")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.land_use}
                  />
                </div>
                <div>
                  <label className="form-label block mb-1 ">
                    Περιγραφή Αυθαίρετων Κατασκευών
                  </label>
                  <input
                    {...register("arbitrary_constructions_description")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={
                    //   dataShowExtreact.arbitrary_constructions_description
                    // }
                  />
                </div>

                <div>
                  <label className="form-label block mb-1 ">
                    Έγγραφο Προσδοκίας
                  </label>
                  <input
                    {...register("expectation_Document")}
                    className={inputStyle}
                    readOnly
                    // defaultValue={dataShowExtreact.license_number}
                  />
                </div>
              </div>
            )}
          </div>
        </div> */}
      </form>
    </>
  );
};

export default AIExtractionDataInPut;
