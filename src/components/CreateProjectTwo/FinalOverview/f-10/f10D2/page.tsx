
"use client"

import StampComponent from "../../shared/signture/signture"

export default function F10D2() {

    return (
        <div className="max-w-[794px] mx-auto p-6 bg-white">
            {/* Title */}
            <h2 className="text-center font-semibold underline text-sm mb-2">
                ΤΕΧΝΙΚΗ ΕΚΘΕΣΗ ΕΡΓΑΣΙΩΝ - ΒΕΒΑΙΩΣΗ ΜΗΧΑΝΙΚΟΥ
            </h2>

            {/* Project Information */}
            <div className="mb-8 space-y-4">
                <div className="flex items-start justify-between max-w-[450px]">
                    <span className=" min-w-[80px] text-sm">Έργο:</span>
                    <h3 className=" text-sm">PROJECT DESCRIPTION</h3>
                </div>

                <div className="flex items-start justify-between gap-4 max-w-xl">
                    <span className=" text-sm">Θέση:</span>
                    <h3 className=" text-sm">ADDRESS, TOWN/AREA , POSTAL CODE ( FOR BUILDING)</h3>
                </div>

                <div className="flex items-start justify-between max-w-[400px] ml-[40px] text-sm">
                    <span className="">Ιδιοκτήτης:</span>
                    <h3 className=" text-sm">OWNER/OWNERS</h3>
                </div>
            </div>

            {/* Main Description */}
            <div className="text-sm mb-4 ml-10">
                <p>Στο ακίνητο <span className="font-semibold">Description for building/ horiontal property
                </span> επί της οδού <br /> <span className="font-semibold">Address,Town/Area , postal code ( FOR BUILDING),</span>
                    πρόκειται να <br /> εκτελεσθούν οι παρακάτω εργασίες :</p>
            </div>

            {/* one  */}
            <div className="space-y-6 ml-10">
                <div>
                    <h1 className="text-sm font-semibold">● Κατεδάφιση/Αποξήλωση Υφιστάμενων Τοιχοπληρώσεων (μη φερόντων στοιχείων)</h1>
                    <p className="text-sm mb-6">
                        Τοπική καθαίρεση τμημάτων εξωτερικών τοιχοποιιών (οπτοπλινθοδομές ή άλλα υλικά πλήρωσης), χωρίς επέμβαση
                        στον φέροντα οργανισμό (π.χ. δοκούς, υποστυλώματα).
                    </p>
                </div>
            </div>

            {/* two  */}
            <div className=" ml-10">
                <h1 className="text-sm font-semibold mt-6"> ● Δημιουργία Νέων Ανοιγμάτων (Παράθυρα / Πόρτες / Βιτρίνες)</h1>
                <p className="text-sm mb-6">
                    Διάνοιξη νέων ανοιγμάτων με κατάλληλες λεπτομέρειες στήριξης και περιμετρικής ενίσχυσης (π.χ. γωνιόκρανα, μεταλλικά πλαίσια, αν χρειάζεται).
                    Τοποθέτηση νέων κουφωμάτων (αλουμινίου, PVC ή ξύλου) στις νέες θέσεις.
                </p>
            </div>

            {/* three */}
            <div className="pl-10 mt-12">
                <h1 className="text-sm font-semibold">
                    ● Μετατόπιση ή Τροποποίηση Υφιστάμενων Ανοιγμάτων
                </h1>
                <div className="space-y-3">
                    <p className="text-sm">
                        Κατάργηση ή μετατόπιση παλαιών κουφωμάτων.
                        Επαναδιαμόρφωση του κελύφους με επισκευές τοιχοποιίας και αποκατάσταση επιχρισμάτων.
                    </p>
                </div>
            </div>

            {/* four */}
            <div className="pl-10 mt-12">
                <h1 className="text-sm font-semibold">
                    ● Μικρές οικοδομικές εργασίες – Σοβατίσματα – Στοκαρίσματα τοιχοποιιών
                </h1>
                <div className="space-y-3">
                    <p className="text-sm">
                        Αφορά την αποκατάσταση φθαρμένων ή αποσαθρωμένων επιχρισμάτων εξωτερικής τοιχοποιίας.
                        Περιλαμβάνονται καθαίρεση σαθρών επιχρισμάτων, εφαρμογή νέου σοβά, στοκάρισμα ρωγμών
                        και λείανση επιφανειών, χωρίς επέμβαση στον φέροντα οργανισμό ή στη γεωμετρία του κτιρίου.
                    </p>
                </div>
            </div>

            {/* five  */}
            <div className="mt-12 ml-10">
                <h1 className="text-sm font-semibold">
                    ●Αποκατάσταση Όψεων/ Εξωτερικοί χρωματισμοί επί των όψεων
                </h1>
                <p className="text-sm">
                    Προβλέπεται η πλήρης προετοιμασία και βαφή των εξωτερικών επιφανειών του
                    κτιρίου με ακρυλικό ή σιλικονούχο χρώμα υψηλής αντοχής. Περιλαμβάνει καθαρισμό,
                    αστάρωμα και εφαρμογή δύο στρώσεων τελικού χρώματος, με κατάλληλο υλικό και μέθοδο
                    ανάλογα με τις απαιτήσεις του υποστρώματος.
                </p>
            </div>
            {/* {/* Signature Section */}
            <div className="mt-6 text-right flex items-center justify-center p-5">
                <div className="max-w-[300px]">

                    <div className="text-center">
                        <p>Ημερομηνία :</p>
                        <p>06/25/2025</p>
                    </div>
                    <div className="">
                        <h3 className="text-center mb-4">Ο ΜΗΧΑΝΙΚΟΣ</h3>
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

        </div>
    )
}



