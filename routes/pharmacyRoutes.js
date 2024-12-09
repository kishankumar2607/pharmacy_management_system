const express = require("express");
const router = express.Router();
const pharmacyController = require("../controllers/pharmacyController");

router.get("/", (req, res) => {
    res.render("home");
});

// Routes for Patients
router.get("/patients", pharmacyController.getPatients);
router.post("/patients/add", pharmacyController.addPatient);

router.get("/patients/edit/:id", pharmacyController.editPatient); // Edit patient form
router.post("/patients/edit/:id", pharmacyController.updatePatient);

router.get("/patients/delete/:id", pharmacyController.deletePatient);


// Doctors Routes
router.get("/doctors", pharmacyController.getDoctors);  // List doctors
router.get("/doctors/edit/:id", pharmacyController.getEditDoctor);  // Render the edit form
router.post("/doctors/add", pharmacyController.addDoctor);  // Add new doctor
router.post("/doctors/edit/:id", pharmacyController.updateDoctor);  // Update doctor
router.get("/doctors/delete/:id", pharmacyController.deleteDoctor);  // Delete doctor


// Medications Routes
router.get("/medications", pharmacyController.getMedications);  // List medications
router.get("/medications/edit/:id", pharmacyController.getEditMedication);  // Render the edit form
router.post("/medications/add", pharmacyController.addMedication);  // Add new medication
router.post("/medications/edit/:id", pharmacyController.updateMedication);  // Update medication
router.get("/medications/delete/:id", pharmacyController.deleteMedication);  // Delete medication


// Routes for Prescriptions
router.get("/prescriptions", pharmacyController.getPrescriptions);
router.post("/prescriptions/add", pharmacyController.addPrescription);
router.post("/prescriptions/edit/:id", pharmacyController.updatePrescription);
router.get("/prescriptions/delete/:id", pharmacyController.deletePrescription);

router.post('/prescriptions/generateBill/', pharmacyController.generateBill);

module.exports = router;
