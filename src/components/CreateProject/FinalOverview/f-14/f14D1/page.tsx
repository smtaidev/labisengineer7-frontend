"use client"
import { useState } from "react";
import StampComponent from "../../shared/signture/signture";
// for editing 
import { useForm } from "react-hook-form"
import { FaRegEdit } from "react-icons/fa"

interface FormData {
    owner_name: string
    project_description: string
    owner_address: string
    owner_city: string
    owner_postal_code: string
}
// end editing 

interface allDataProps {
    owner_address: string;
    owner_city: string;
    owner_name: string;
    owner_postal_code: string;
    project_description?: string;
}


export default function F14D1({ allData }: { allData: allDataProps }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    const {
        owner_address,
        owner_city,
        owner_name,
        owner_postal_code,
        project_description,
    } = allData;

    // for editing data 
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({})

    const onSubmit = (data: FormData) => {
        console.log("Updated Data:", data)
        reset()
    }

    return (
        <div className="max-w-[794px] mx-auto p-6 bg-white">

            <div className="text-right -mt-9">
                <button
                    className="mt-1 px-4 py-1"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    <FaRegEdit className="text-black text-2xl cursor-pointer" />
                </button>
            </div>
            {/* Title */}
            <h2 className="text-center font-semibold underline text-sm mb-2">
                ΤΕΧΝΙΚΗ ΕΚΘΕΣΗ ΕΡΓΑΣΙΩΝ - ΒΕΒΑΙΩΣΗ ΜΗΧΑΝΙΚΟΥ
            </h2>

            {/* Project Information */}
            <div className="mb-8 space-y-4">
                <div className="flex items-start justify-between">
                    <span className=" min-w-[80px] text-sm">Έργο:</span>
                    <h3 className=" text-sm">{project_description || "N/A"}</h3>
                </div>

                <div className="flex items-start justify-between gap-4 max-w-xl">
                    <span className=" text-sm">Θέση:</span>
                    <h3 className=" text-sm">{owner_address || "N/a"}, {owner_city || "N/A"} , {owner_postal_code || "N/A"} ( FOR BUILDING)</h3>
                </div>

                <div className="flex items-start justify-between max-w-[400px] ml-[40px] text-sm">
                    <span className="">Ιδιοκτήτης:</span>
                    <h3 className=" text-sm">{owner_name || "N/A"}</h3>
                </div>
            </div>

            {/* Main Description */}
            <div className="text-sm mb-4 ml-10">
                <p>Η παρούσα τεχνική έκθεση αφορά την κοπή δέντρων που βρίσκονται εντός του ακάλυπτου χώρου του
                    ακινήτου <span className="font-bold">Description for building/ horiontal property επί της οδού Address, Town/Area , postal code ( FOR BUILDING). </span>
                    Η αναγκαιότητα κοπής τεκμηριώνεται λόγω πλήθους προβλημάτων που σχετίζονται με την ασφάλεια, τη λειτουργικότητα
                    του κτιρίου και την προστασία των υποδομών.</p>
            </div>

            <div className="space-y-6 ml-10">
                {/* one  */}
                <div>
                    <h3 className="font-bold">
                        ● Κοπή Δέντρων λόγω Στατικής Επικινδυνότητας</h3>
                    <p className="text-sm">
                        Η εργασία αφορά την κοπή δέντρων τα οποία παρουσιάζουν έντονα φαινόμενα στατικής ανεπάρκειας, όπως σοβαρή κλίση, σήψη του κορμού ή αποσάθρωση του
                        ριζικού τους συστήματος, γεγονός που αυξάνει τον κίνδυνο πτώσης και πιθανής πρόκλησης ζημιών σε γειτονικά κτίρια, κοινόχρηστους χώρους ή διερχόμενους.
                    </p>
                </div>
                {/* two */}
                <div>
                    <h3 className="font-bold">
                        ● Κοπή Δέντρων λόγω Πρόκλησης Βλαβών σε Υποδομές και Δίκτυα
                    </h3>
                    <p className="text-sm">
                        Η κοπή κρίνεται αναγκαία καθώς παρατηρούνται φαινόμενα ρηγματώσεων σε τοιχία περίφραξης, αποκόλληση πλακοστρώσεων και
                        παραμορφώσεις δαπέδων, εξαιτίας της υπερβολικής ανάπτυξης του ριζικού συστήματος των δέντρων. Επιπλέον, έχουν
                        καταγραφεί φθορές σε υπόγεια δίκτυα αποχέτευσης και ύδρευσης.
                    </p>
                </div>
                {/* three */}
                <div>
                    <h3 className="font-bold">
                        ● Κοπή Δέντρων για Διασφάλιση Επαρκούς Φωτισμού και Αερισμού</h3>
                    <p className="text-sm">
                        Η εργασία αφορά την απομάκρυνση δέντρων που δημιουργούν σοβαρά προβλήματα σκίασης και παρεμπόδισης φυσικού αερισμού
                        σε κύριους χώρους διαβίωσης εντός του κτιρίου, γεγονός που επηρεάζει
                        αρνητικά την υγιεινή και την ποιότητα ζωής των ενοίκων, σε αντίθεση με τις απαιτήσεις του Κτιριοδομικού Κανονισμού.
                    </p>
                </div>
                {/* four  */}
                <div>
                    <h3 className="font-bold">
                        ● Κοπή Δέντρων λόγω Εκτέλεσης Εγκεκριμένων Οικοδομικών Εργασιών
                    </h3>
                    <p className="text-sm">
                        Η κοπή αφορά δέντρα που βρίσκονται εντός των ζωνών επέμβασης για προγραμματισμένες εργασίες
                        μικρής κλίμακας, όπως η τοποθέτηση δεξαμενής, κατασκευή ράμπας ή άλλων βοηθητικών υποδομών.
                        Η απομάκρυνσή τους είναι απαραίτητη για την ασφαλή και ορθή εκτέλεση των εργασιών
                    </p>
                </div>
                {/* five */}
                <div>
                    <h3 className="font-bold">
                        ● Κοπή Δέντρων για Πυροπροστασία
                    </h3>
                    <div className="space-y-3">
                        <p className="text-sm">
                            Η εργασία αφορά την απομάκρυνση δέντρων που βρίσκονται σε άμεση γειτνίαση με
                            τα κτίρια του οικοπέδου, σε απόσταση μικρότερη των 3 έως 5 μέτρων από τα δομικά στοιχεία,
                            όπως καθορίζεται από τις προβλέψεις του Κανονισμού Πυροπροστασίας Κτιρίων (ΦΕΚ 2434/Β/2018)
                            και τις γενικές οδηγίες πυροπροστασίας της Πολιτικής Προστασίας.
                        </p>
                        <p className="text-sm">
                            Η ανάγκη κοπής των συγκεκριμένων δέντρων τεκμηριώνεται λόγω της αυξημένης επικινδυνότητας πρόκλησης και
                            εξάπλωσης πυρκαγιάς, ειδικά κατά τους θερινούς μήνες. Τα δέντρα αυτά, λόγω του μεγάλου ύψους, της πυκνής
                            κόμης και της άμεσης επαφής με τις όψεις των κτιρίων, λειτουργούν ως πιθανός αγωγός φλόγας σε περίπτωση
                            πυρκαγιάς, αυξάνοντας τον κίνδυνο μετάδοσης της φωτιάς από το έδαφος προς το κτίριο ή από κτίριο σε κτίριο.
                        </p>
                        <p className="text-sm">
                            Επιπλέον, ορισμένα από τα δέντρα παρουσιάζουν συσσώρευση ξερών φύλλων, κλαδιών και οργανικών υπολειμμάτων
                            τόσο στο ριζικό τους σύστημα όσο και εντός της κόμης τους, δημιουργώντας υψηλό φορτίο καύσιμης ύλης.
                        </p>
                        <p className="text-sm">
                            Η απομάκρυνση των δέντρων αυτών εντάσσεται σε ευρύτερη στρατηγική προληπτικής πυροπροστασίας, η οποία περιλαμβάνει:
                        </p>
                        <p className="text-sm">
                            Δημιουργία ελεύθερης ζώνης απαλλαγμένης από εύφλεκτη βλάστηση γύρω από τα κτίρια.
                        </p>
                        <p className="text-sm">
                            Διασφάλιση της δυνατότητας πρόσβασης πυροσβεστικών μέσων σε περίπτωση ανάγκης.
                        </p>
                        <p className="text-sm">
                            Ελαχιστοποίηση του κινδύνου φλόγας από έρπουσα ή υφέρπουσα πυρκαγιά.
                        </p>
                        <p className="text-sm">
                            Συμμόρφωση με τις οδηγίες της Πυροσβεστικής Υπηρεσίας και τις απαιτήσεις των εγκεκριμένων μελετών πυροπροστασίας (όπου υπάρχουν).
                        </p>
                        <p className="text-sm">
                            Η κοπή των δέντρων θα γίνει με κατάλληλα μέσα, με μέριμνα για την προστασία της ανθρώπινης ζωής, των γειτονικών
                            κατασκευών και των παρακείμενων ιδιοκτησιών.
                            Τα προϊόντα κοπής θα απομακρυνθούν άμεσα και θα διατεθούν σύμφωνα με τις ισχύουσες περιβαλλοντικές διατάξεις.
                        </p>
                    </div>
                </div>
            </div>

            {/* {/* Signature Section */}
            <div className="mt-6 text-right flex items-center justify-center p-5">
                <div className="max-w-[300px]">

                    <div className="text-center mb-4">
                        <p>Ημερομηνία </p>
                        <p>6/25/2025</p>
                    </div>
                    <div className="">
                        <h3 className="text-center mb-2">Ο ΣΥΝΤΑΞΑΣ</h3>
                        {/* Dashed Border Box = common component*/}
                        <StampComponent
                            title="ΣΦΡΑΓΙΔΑ ΜΗΧΑΝΙΚΟΥ"
                            instructions={[
                                "Με δεξί κλικ",
                                "Αλλαγή εικόνας",
                                " Βάζετε την σφραγίδα σας",
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 max-w-3xl relative">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-2 text-red-600 bg-gray-200 px-2 py-1 rounded-full hover:text-red-600 cursor-pointer"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-bold mb-4">✍️ Edit Data</h2>
                        <div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4 p-4 border rounded-lg bg-white shadow-md"
                            >
                                {/* Employer */}
                                <div className="flex items-center gap-4">
                                    <label className="font-medium w-1/4">Εργοδότες *:</label>
                                    <input
                                        placeholder={owner_name || "nowner_name"}
                                        type="text"
                                        {...register("owner_name", { required: "This field is required" })}
                                        className="flex-1 border p-2 rounded text-sm"
                                    />
                                </div>

                                {/* Project */}
                                <div className="flex items-center gap-4">
                                    <label className="font-medium w-1/4">Έργο *:</label>
                                    <input
                                        placeholder={project_description || "Project description"}
                                        type="text"
                                        {...register("project_description", { required: "This field is required" })}
                                        className="flex-1 border p-2 rounded text-sm"
                                    />
                                </div>

                                {/* Address */}
                                <div className="flex items-center gap-4">
                                    <label className="font-medium w-1/4">Διεύθυνση Έργου *:</label>
                                    <div className="flex-1 grid grid-cols-3 gap-2">
                                        <input
                                            type="text"
                                            placeholder={owner_address || "Address"}
                                            {...register("owner_address", { required: "Address is required" })}
                                            className="border p-2 rounded text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder={owner_city || "City"}
                                            {...register("owner_city", { required: "City is required" })}
                                            className="border p-2 rounded text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder={owner_postal_code || "Postal Code"}
                                            {...register("owner_postal_code", { required: "Postal code is required" })}
                                            className="border p-2 rounded text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm cursor-pointer"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}



