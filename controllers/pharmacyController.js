const db = require("../db");
// Patients
exports.getPatients = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Patient");
        res.render("patients", { patients: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving patients.");
    }
};

exports.addPatient = async (req, res) => {
    const { Name, Age, Address } = req.body;
    try {
        await db.query(
            "INSERT INTO Patient (Name, Age, Address) VALUES (?, ?, ?)",
            [Name, Age, Address]
        );
        res.redirect("/patients");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding patient.");
    }
};

// Edit Patient (Get request to show the form)
exports.editPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Patient WHERE ID = ?", [
            id,
        ]);
        if (rows.length === 0) {
            return res.status(404).send("Patient not found.");
        }
        res.render("editPatient", { patient: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving patient.");
    }
};

// Update Patient (Post request to update the patient)
exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const { Name, Age, Address } = req.body;
    try {
        await db.query(
            "UPDATE Patient SET Name = ?, Age = ?, Address = ? WHERE ID = ?",
            [Name, Age, Address, id]
        );
        res.redirect("/patients");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating patient.");
    }
};

// Patient Delete Route (with confirmation)
exports.deletePatient = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Patient WHERE ID = ?", [id]);
        res.redirect("/patients");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting patient.");
    }
};

// Doctors Controller
exports.getDoctors = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Doctor");
        res.render("doctors", { doctors: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving doctors.");
    }
};

// Add a new doctor
exports.addDoctor = async (req, res) => {
    const { Name, Speciality, Address } = req.body;
    try {
        await db.query(
            "INSERT INTO Doctor (Name, Speciality, Address) VALUES (?, ?, ?)",
            [Name, Speciality, Address]
        );
        res.redirect("/doctors");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding doctor.");
    }
};

// Edit an existing doctor (GET request)
exports.getEditDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Doctor WHERE ID = ?", [
            id,
        ]);
        if (rows.length > 0) {
            res.render("editDoctor", { doctor: rows[0] });
        } else {
            res.status(404).send("Doctor not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving doctor for editing.");
    }
};

// Update doctor information (POST request)
exports.updateDoctor = async (req, res) => {
    const { id } = req.params;
    const { Name, Speciality, Address } = req.body;
    try {
        await db.query(
            "UPDATE Doctor SET Name = ?, Speciality = ?, Address = ? WHERE ID = ?",
            [Name, Speciality, Address, id]
        );
        res.redirect("/doctors");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating doctor.");
    }
};

// Delete a doctor
exports.deleteDoctor = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Doctor WHERE ID = ?", [id]);
        res.redirect("/doctors");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting doctor.");
    }
};
// Medications Controller
exports.getMedications = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM Medication");
        res.render("medications", { medications: rows });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving medications.");
    }
};

exports.addMedication = async (req, res) => {
    const { Name, Price } = req.body;
    try {
        await db.query("INSERT INTO Medication (Name, Price) VALUES (?, ?)", [
            Name,
            Price,
        ]);
        res.redirect("/medications");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding medication.");
    }
};

// Edit Medication (GET request to render the form)
exports.getEditMedication = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query("SELECT * FROM Medication WHERE ID = ?", [
            id,
        ]);
        if (rows.length > 0) {
            res.render("editMedication", { medication: rows[0] });
        } else {
            res.status(404).send("Medication not found.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving medication for editing.");
    }
};

// Update Medication (POST request)
exports.updateMedication = async (req, res) => {
    const { id } = req.params;
    const { Name, Price } = req.body;
    try {
        await db.query(
            "UPDATE Medication SET Name = ?, Price = ? WHERE ID = ?",
            [Name, Price, id]
        );
        res.redirect("/medications");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating medication.");
    }
};

exports.deleteMedication = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM Medication WHERE ID = ?", [id]);
        res.redirect("/medications");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting medication.");
    }
};
// Get all prescriptions along with doctor and patient names, and medication details
exports.getPrescriptions = async (req, res) => {
    try {
        // Fetch all patients for the dropdown
        const [patients] = await db.query("SELECT * FROM Patient");

        // Fetch all doctors for the dropdown
        const [doctors] = await db.query("SELECT * FROM Doctor");

        // Fetch all medications for the medication dropdown
        const [medications] = await db.query("SELECT * FROM Medication");

        // Fetch all prescriptions along with doctor and patient names
        const [prescriptions] = await db.query(`
            SELECT Prescription.ID, Prescription.Date, Doctor.Name AS DoctorName, Patient.Name AS PatientName
            FROM Prescription
            JOIN Doctor ON Prescription.DoctorID = Doctor.ID
            JOIN Patient ON Prescription.PatientID = Patient.ID
        `);

        // Fetch medications associated with each prescription with their counts
        for (let prescription of prescriptions) {
            const [medicationsInPrescription] = await db.query(
                `
        SELECT Medication.Name, SUM(Prescription_Medication.Quantity) AS TotalQuantity
        FROM Prescription
        JOIN Prescription_Medication ON Prescription.ID = Prescription_Medication.PrescriptionID
        JOIN Medication ON Prescription_Medication.MedicationID = Medication.ID
        WHERE Prescription.ID = ?
        GROUP BY Medication.Name`,
                [prescription.ID]
            );  

            // Format the medications list in the required format
            prescription.Medications = medicationsInPrescription
                .map((med) => `${med.Name}(${med.TotalQuantity})`)
                .join(", "); // e.g., "Medicine1(3), Medicine2(2)"
        }

        // Render the prescriptions page with prescriptions, patients, doctors, and medications data
        res.render("prescriptions", {
            prescriptions,
            patients,
            doctors,
            medications,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving prescriptions.");
    }
};

exports.addPrescription = async (req, res) => {
    const { patientID, doctorID, date } = req.body;

    // Extract medication IDs and quantities from the request body dynamically
    const medications = [];
    for (let key in req.body) {
        if (key.startsWith("medication")) {
            const medicationIndex = key.replace("medication", ""); // Get the index number (e.g., 0, 2)
            const medicationID = req.body[key]; // Medication ID
            const count = req.body[`count${medicationIndex}`]; // Count for this medication

            // Add medication and count to the medications array
            medications.push({
                medicationID,
                quantity: count,
            });
        }
    }

    try {
        // Insert new prescription record
        const [result] = await db.query(
            `
            INSERT INTO Prescription (PatientID, DoctorID, Date)
            VALUES (?, ?, ?)
        `,
            [patientID, doctorID, date]
        );

        // Get the prescription ID of the newly inserted record
        const prescriptionID = result.insertId;

        // Insert medication details into Prescription_Medication table
        for (let i = 0; i < medications.length; i++) {
            const { medicationID, quantity } = medications[i];

            await db.query(
                `
                INSERT INTO Prescription_Medication (PrescriptionID, MedicationID, Quantity)
                VALUES (?, ?, ?)
            `,
                [prescriptionID, medicationID, quantity]
            );
        }

        res.redirect("/prescriptions");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding prescription.");
    }
};

// Update an existing prescription
exports.updatePrescription = async (req, res) => {
    const { id } = req.params;
    const { patientID, doctorID, date, medications } = req.body;

    try {
        // Update prescription details
        await db.query(
            `
            UPDATE Prescription
            SET PatientID = ?, DoctorID = ?, Date = ?
            WHERE ID = ?
        `,
            [patientID, doctorID, date, id]
        );

        // Delete old medication entries for this prescription
        await db.query(
            `
            DELETE FROM Prescription_Medication WHERE PrescriptionID = ?
        `,
            [id]
        );

        // Insert updated medications
        for (let i = 0; i < medications.length; i++) {
            const { medicationID, quantity } = medications[i];

            await db.query(
                `
                INSERT INTO Prescription_Medication (PrescriptionID, MedicationID, Quantity)
                VALUES (?, ?, ?)
            `,
                [id, medicationID, quantity]
            );
        }

        res.redirect("/prescriptions");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating prescription.");
    }
};

// Delete a prescription
exports.deletePrescription = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete prescription and its associated medication records
        await db.query(
            `
            DELETE FROM Prescription_Medication WHERE PrescriptionID = ?
        `,
            [id]
        );

        await db.query(
            `
            DELETE FROM Prescription WHERE ID = ?
        `,
            [id]
        );

        res.redirect("/prescriptions");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting prescription.");
    }
};
