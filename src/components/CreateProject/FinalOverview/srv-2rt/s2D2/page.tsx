
"use client"

import { useGetMeQuery } from "@/redux/features/templates/allTemplateSlice"
import { format } from "date-fns"
import QuestionAnswer from "../Question-answer"
interface allDataProps {
    owners: any[]
    engineers: any[]
    projectDescription: string
    propertyPostalCode: string
    propertyPlace: string
    propertyAddress: string
    createdAt: string
    horizontalPropertyName: string
    municipalityCommunity: string
    propertyNumber: string
    issuingAuthority: string
    kaekProperty: string
    permitNumber: string
    lastName: string
    firstName: string
    specialty: string
}

type questionProps = {
    question: string;
    answer: string;
};
type violationsProps = {
    age: string;
    category: string;
    createdAt: string;   // ISO date string
    formId: number;
    id: string;
    otherViolation: boolean;
    projectId: string;
    showRemainingViolations: boolean;
    updatedAt: string;   // ISO date string
    violations: string[];
};

export default function S2D2({ allData, question, violations }: { allData: allDataProps, question: questionProps[], violations: violationsProps[] }) {

    const { projectDescription, horizontalPropertyName, propertyPostalCode, municipalityCommunity,
        propertyNumber, propertyAddress, propertyPlace, issuingAuthority, kaekProperty, permitNumber, createdAt, lastName, firstName, specialty, } = allData || {}
    const owner = allData?.owners || []
    console.log(violations, "=======================violations======")


    const { data: userData } = useGetMeQuery()
    const signature = userData?.data?.signature

    return (
        <div className="max-w-[794px] mx-auto p-6 bg-white leading-relaxed text-sm arial">
            <h2 className="text-center text-2xl font-bold">
                ΤΕΧΝΙΚΗ ΕΚΘΕΣΗ
            </h2>
            <p className="text-sm font-semibold text-center mb-6">
                (σύμφωνα με το άρθρο 99 του ν.4495/2017)
            </p>

            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-12">
                    <h4 className="text-sm">Έργο</h4>
                    <p className="text-sm uppercase">{projectDescription || "N/A"}</p>
                </div>
                <div className="flex items-start justify-between gap-4 max-w-xl">
                    <span className=" text-sm">Θέση:</span>
                    <h3 className=" text-sm">
                        {propertyAddress || "N/A"} {propertyNumber || "N/A"}, {propertyPlace || "N/A"},
                        ΔΗΜΟΣ {municipalityCommunity || "N/A"},
                        ΤΚ {propertyPostalCode || "N/A"}
                    </h3>
                </div>
                <div className="flex">
                    <span className="text-sm">Ιδιοκτήτης: </span>
                    <div className="flex-1">
                        <div className="flex items-center justify-center gap-2">
                            {
                                owner?.map((e: any, i: number) => (
                                    <h3 key={i} className="text-sm">
                                        {e.firstName || e.first_name || "N/A"} {e.lastName || e.last_name || "N/A"}
                                    </h3>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-b-2 mb-4 p-6">
                <p className="text-sm">
                    Πρόκειται για την {horizontalPropertyName || "N/A"}:, που βρίσκεται σε πολυκατοικία, επί της οδού {propertyAddress || "N/A"}, {propertyNumber || "N/A"}:,
                    στη περιοχή: "{propertyPlace || "N/A"}" του Δήμου {municipalityCommunity || "N/A"}: Χαλάνδρι, ΤΚ {propertyPostalCode || "N/A"}, και έχει υπαχθεί στις περί
                    οριζοντίου ιδιοκτησίας διατάξεις με την υπ΄ αριθμό "number_of_establishment_of_horizontal_ownership" πράξη σύστασης του Συμβολαιογράφου
                    "notary_place/municipality" "notary_establishment_of_horizontal_ownership", σε συνδυασμό με την με αριθμό "reviews_numbers_of_establishment_of_horizontal_ownership": πράξη τροποποίησης Σ.Ο.Ι του Συμβολαιογράφου
                    ("notary_reviews_numbers_of_establishment_of_horizontal_ownership": " ,
                    {/* -🡪 this data you will add it when a notary have different name from previous) */}
                </p>
                {/* -🡪 this data you will add it when a notary have different name from previous) */}
                <p className="mt-4">
                    Η οικοδομή έχει ανεγερθεί σύμφωνα με την υπ΄αριθμόν {permitNumber || "N/A"}: οικοδομική άδεια της {issuingAuthority || "N/A"}, και σύμφωνα με την υπ΄ αριθμόν "license_number_revision"
                    αναθεώρηση αυτής, σε οικόπεδο , "within_outside_city_plan", συνολικής επιφάνειας Ε= "plot_area":. Η ως άνω "horizontal_property_name" αποτελεί ιδιοκτησία σε ποσοστό "ownership percentage of the owner "και είδος ιδιοκτησίας, "Owner's type of ownership" κυριότητα, τον "last_name owner 1" "first_name owner 1":  και σε ποσοστό "ownership percentage of the owner "και είδος ιδιοκτησίας
                    "Owner's type of ownership" κυριότητα, την "last_name owner 2" "first_name owner 2" και έχει δηλωθεί στο κτηματολόγιο με αριθμό ΚΑΕΚ {kaekProperty || "N/A"}
                </p>
            </div>
            <div className="border-b-2 p-6">
                {/* If you extract data from Law 3843/2010, then add this text, otherwise omit it. */}
                <p className="mt-4">
                    Στην {horizontalPropertyName || "N/A"}, έχει πραγματοποιηθεί τακτοποίηση σύμφωνα με τις διατάξεις του ν. 3843/2010,
                    η οποία ολοκληρώθηκε στις "completion_declaration_date_3843_2010"με αριθμό πρωτοκόλλου "completion_declaration_3843_2010_number",
                    στην αρμόδια issuing_authority_3843_2010.Το σχετικό έγγραφο έχει αναρτηθεί στο πληροφοριακό σύστημα του ΤΕΕ,
                    στο πεδίο “Έγγραφα ρύθμισης με προηγούμενους νόμους” (Ν. 1337/83, Ν. 3843/10 κ.λπ.).
                </p>
                <p className="mt-4">
                    Σύμφωνα με την σημερινή μας αυτοψία και συγκρίνοντας τα εγκεκριμένα Πολεοδομικά σχέδια της υπ΄αριθμόν
                    {permitNumber || "N/A"} οικοδομικής αδείας και "license_number_revision": αναθεώρησης αυτής,
                    διαπιστώθηκαν οι παρακάτω πολεοδομικές παραβάσεις που τακτοποιούνται με την παρούσα δήλωση :
                </p>
                <div className="mt-10">
                    {/* Step 1 — Show categories 1,2,4,5 */}
                    {violations
                        .filter((item) => String(item.category) !== "3")
                        .map((item, index) => (
                            <p key={item.id || index} className="mt-2">
                                Φ.Κ. #{index + 1}. (Descriptions validation from Sheet {index + 1}) ….. –
                                Category {item.category || "N/A"} (The category that selected from user at sheet
                                {index + 1}), Έτος κατασκευής: {item.age || "N/A"} (The date that selected from
                                user at sheet {index + 1}). Comment from Sheet {index + 1}
                            </p>
                        ))}

                    {/* Step 2 — If category 3 exists */}
                    {violations.some((item) => String(item.category) === "3") && (() => {
                        // find the category 3 violation
                        const sheetIndex = violations.findIndex((item) => String(item.category) === "3") + 1;
                        

                        return (
                            <p className="mt-2">
                                Φ.Κ. # {sheetIndex}. Αυθαίρετες μικρές παραβάσεις της κατηγορίας 3 του άρθρου 96,
                                του Ν.4495/17, Κατηγορία 3, Έτος κατασκευής: i have to add here age 
                                {/* i have to add here {violations} */} 
                            </p>
                        );
                    })()}

                    {/* Step 3 — If user checked “otherViolation” */}
                    {violations.some((item) => item.otherViolation) && (
                        <p className="mt-2">
                            Φ.Κ. # {violations.length + 1}. Λοιπές Πολεοδομικές παραβάσεις του άρθρου 100 του
                            Ν.4495/2017 – (Descriptions validation from Sheet 5), Comment from Sheet 5 και
                            σύμφωνα με το Παράρτημα Β του Ν.4495/2017 ορίζονται ως (1) Πολεοδομική παράβαση.
                            (επισυνάπτεται αναλυτικός προϋπολογισμός).
                        </p>
                    )}

                    {/* Step 4 — Common ending text */}
                    <div className="mt-4">
                        <p>
                            Ο χρόνος κατασκευής των ανωτέρω αυθαίρετων κατασκευών τεκμηριώνεται από τα
                            προσκομισθέντα στοιχεία, τα οποία επιβεβαιώνουν ότι οι κατασκευές προϋπήρχαν της
                            28.07.2011.
                        </p>
                        <p className="mt-2">
                            Συγκεκριμένα, χρησιμοποιήθηκαν: Αεροφωτογραφίες έτους{" "}

                            {/* {evidence?.aerial_year || "N/A"}, */}
                            στις οποίες διακρίνονται οι αυθαίρετες επεμβάσεις.
                            Υπεύθυνη Δήλωση Ιδιοκτήτη, στην οποία δηλώνεται ο χρόνος εκτέλεσης των εργασιών.
                        </p>
                        <p className="mt-2">
                            Με βάση τα ανωτέρω, τεκμαίρεται ότι οι κατασκευές υφίστανται πριν την κρίσιμη
                            ημερομηνία της 28/07/2011, και συνεπώς είναι επιλέξιμες για υπαγωγή στις διατάξεις
                            του Ν.4495/2017.
                        </p>
                    </div>
                </div>

                <QuestionAnswer question={question} />

            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="my-4 text-center">
                    <h2>Hμερομηνία</h2>
                    <p><p>{createdAt
                        ? format(new Date(createdAt), "dd/MM/yyyy")
                        : "N/A"}</p></p>
                    <h3>Ο Συντάξας Μηχανικός</h3>
                </div>
                {/* signature  */}
                <div className="flex items-center justify-end p-4">
                    <img src={signature} alt="" />
                </div>
            </div>
        </div>
    )
}
