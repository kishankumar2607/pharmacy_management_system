<?php
// Access the POST data
$data = json_decode(file_get_contents('php://input'), true);

// Extract the necessary information
$prescriptionID = $data['prescription']['id'];
$prescriptionDate = $data['prescription']['date'];
$doctor = $data['prescription']['doctor'];
$patient = $data['prescription']['patient'];
$medications = $data['medications'];
$subtotal = $data['totals']['subtotal'];
$total = $data['totals']['total'];

// Pharmacy Information
$pharmacyName = $data['pharmacy']['name'];
$pharmacyAddress = $data['pharmacy']['address'];
$pharmacyWebsite = $data['pharmacy']['website'];
$pharmacyPhone = $data['pharmacy']['phone'];

// Format the date to dd MMM yyyy
$formattedDate = date('d M Y', strtotime($prescriptionDate));

// Generate PDF using FPDF
require('../fpdf/fpdf.php');
$pdf = new FPDF();
$pdf->AddPage();
$pdf->SetFont('Arial', 'B', 16);

// Get page width and logo width
$pageWidth = $pdf->GetPageWidth();
$logoWidth = 30;  // Adjust the logo width if needed

// Calculate the X position for centering the logo
$xPosition = ($pageWidth - $logoWidth) / 2;

// Add the logo (Centered at the top)
$pdf->Image('ghlogo.jpg', $xPosition, 8, $logoWidth); // X position calculated dynamically

$pdf->Ln(30); // Add some space after the logo

// Pharmacy Header
$pdf->Cell(0, 10, $pharmacyName, 0, 1, 'C');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(0, 8, $pharmacyAddress, 0, 1, 'C');
$pdf->Cell(0, 8, $pharmacyWebsite . ' | ' . $pharmacyPhone, 0, 1, 'C');
$pdf->Ln(10);

// Prescription Info
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(100, 8, $formattedDate, 0, 0, 'L');
$pdf->Cell(0, 8, 'Prescription ID: ' . $prescriptionID, 0, 1, 'R');
$pdf->Ln(5);

// Doctor & Patient Info
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(100, 8, 'Prescribed by', 0, 0, 'L');
$pdf->Cell(0, 8, 'Prescribed to', 0, 1, 'R');
$pdf->SetFont('Arial', '', 12);
$pdf->Cell(100, 8, $doctor['name'], 0, 0, 'L');
$pdf->Cell(0, 8, $patient['name'] . ' / ' . $patient['age'], 0, 1, 'R');
$pdf->Cell(100, 8, $doctor['speciality'], 0, 0, 'L');
$pdf->Cell(0, 8, $patient['address'], 0, 1, 'R');
$pdf->Cell(100, 8, $doctor['address'], 0, 0, 'L');
$pdf->Ln(20);

// Medications Table Header
$pdf->SetFont('Arial', 'B', 12);
// Adjust column widths to fit page width (with margins)
$pdf->Cell(15, 10, 'SN', 1, 0, 'C');
$pdf->Cell(75, 10, 'Medication Name', 1, 0, 'C');
$pdf->Cell(30, 10, 'Quantity', 1, 0, 'C');
$pdf->Cell(30, 10, 'Unit Price', 1, 0, 'C');
$pdf->Cell(30, 10, 'Total', 1, 1, 'C');  // Move to the next line

// Medications Table Content
$pdf->SetFont('Arial', '', 12);
foreach ($medications as $index => $med) {
    // Access the correct keys in the array
    $medicationName = $med['MedicationName'] ?? 'N/A';
    $quantity = $med['Quantity'] ?? 0;
    $unitPrice = number_format((float)($med['UnitPrice'] ?? 0), 2);
    $totalPrice = number_format((float)($med['TotalPrice'] ?? 0), 2);

    // Print the row for each medication
    $pdf->Cell(15, 10, $index + 1, 1, 0, 'C');
    $pdf->Cell(75, 10, $medicationName, 1, 0, 'L');
    $pdf->Cell(30, 10, $quantity, 1, 0, 'C');
    $pdf->Cell(30, 10, '$' . $unitPrice, 1, 0, 'C');
    $pdf->Cell(30, 10, '$' . $totalPrice, 1, 1, 'C');
}

// Totals Section (Right-aligned)
$pdf->Ln(5);
$pdf->SetFont('Arial', 'B', 12);
$pdf->Cell(150, 10, 'Subtotal:', 0, 0, 'R');  // Adjust to leave space for total
$pdf->Cell(30, 10, '$' . number_format((float)$subtotal, 2), 0, 1, 'R');
$pdf->Cell(150, 10, 'Total (incl. tax):', 0, 0, 'R');
$pdf->Cell(30, 10, '$' . number_format((float)$total, 2), 0, 1, 'R');

// Output the PDF
$pdfOutput = $pdf->Output('S'); // 'S' returns the PDF as a string
echo $pdfOutput;
?>
