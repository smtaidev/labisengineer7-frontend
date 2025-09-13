import React from "react";
import RightViewCard from "./WorksCard/RightViewCard";
import workImg from "@/assets/landing-page/login.png";
import serviceType from "@/assets/landing-page/service-type.jpg";
import sucategory from "@/assets/landing-page/subcategory.png";
import submit from "@/assets/landing-page/submit.jpg";
import review from "@/assets/landing-page/review.png";
import aiExtension from "@/assets/landing-page/ai-extension.jpg";
import document from "@/assets/landing-page/document.jpg";
import ShapOne from "./WorksCard/ShapOne";

export default function HowItWorks() {
  return (
    <div
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      id="works"
      className="bg-background pb-[100px] relative z-[-0]"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-center  text-primary mb-12 pt-[100px]">
        How It Works
      </h2>
      <ShapOne>
        <RightViewCard
          workImg={workImg}
          stepNumber="Step 1"
          title="Register or Log In"
          description="Create a free account or log in to your existing one to access your personalized dashboard."
          className="flex-col md:flex-row"
        />
      </ShapOne>

      <RightViewCard
        workImg={serviceType}
        stepNumber="Step- 2"
        title="Select Service Type"
        description="Our platform supports the following formats and guides you step-by-step."
        list={[
          "HTK (Electronic Building ID)",
          "e-Adeies (Building Permit)",
          "Law 4495/17 Declarations",
          "Engineer Certificate",
        ]}
        className="flex-col md:flex-row-reverse "
      />
      <RightViewCard
        workImg={sucategory}
        stepNumber="Step- 3 "
        title="Choose Subcategory"
        description="Based on your selected service, pick a multiple subcategory "
        className="flex-col md:flex-row"
      />
      <RightViewCard
        stepNumber="Step- 4"
        title="Upload your Documents"
        description="Upload all required documents such as floor plans, contracts, declarations, or permit copies."
        formats={["PDF", "DOCX", "JPG", "PNG"]}
        className="flex-col md:flex-row-reverse"
        workImg={document}
      />
      <RightViewCard
        stepNumber="Step- 5"
        title="AI Data Extraction"
        description="Our AI engine automatically reads and extracts critical data fields (like KAEK, usage, coordinates, owner name, permit number)."
        className="flex-col md:flex-row"
        workImg={aiExtension}
      />
      <RightViewCard
        stepNumber="Step- 6"
        title="Review & Edit"
        description="Manually verify and edit the extracted data if needed to ensure accuracy and compliance."
        formats={["Json", "CSV"]}
        className="flex-col md:flex-row-reverse"
        workImg={review}
      />
      <RightViewCard
        stepNumber="Step- 7"
        title="Generate & Submit"
        description="Generate professional documents (PDF, DOCX, CSV) and auto-fill online government forms using automation tools."
        className="flex-col md:flex-row"
        workImg={submit}
      />
    </div>
  );
}
