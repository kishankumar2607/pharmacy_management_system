
# Pharmacy-SQL-FPDF  

**Project for DSGN8311-24F-Sec2 - Advanced Database Design**  

This project is a web application built using **Node.js**, **Express**, and **EJS**, with integrated database design principles and receipt generation functionality using the **FPDF** library. The system is designed to manage pharmacy operations efficiently by generating professional receipts in PDF format.

## Features  
- **Database Integration:** Advanced database design principles applied to manage pharmacy records.  
- **Dynamic Receipt Generation:** Uses FPDF to create professional-grade pharmacy receipts.  
- **Web Application Framework:** Built with Node.js and Express for server-side operations.  
- **Dynamic Frontend Rendering:** Uses EJS for rendering dynamic content.  

---

## Getting Started  

To set up and run the project on your local system, follow these steps:  

### Prerequisites  
1. **XAMPP**: Ensure XAMPP is installed and required services (Apache and MySQL) are running.  
2. **PHP Local Server**: PHP must be installed to run the built-in server.  
3. **Node.js**: Install Node.js to manage dependencies and run the web server.  
4. **FPDF Library**: Download the **FPDF library** from [fpdf.org](http://www.fpdf.org/).  

---

### Installation Steps  

1. **Start Required Services:**  
   Open **XAMPP** and ensure Apache and MySQL services are running.  

2. **Set Up the FPDF Library:**  
   a. Download the FPDF library from [fpdf.org](http://www.fpdf.org/).  
   b. Ensure the FPDF library is located in the default `include_path`.  
   c. Alternatively, modify the `php.ini` file to include the path to the FPDF library by adding the following line:  
      ```
      include_path = ".:/path/to/fpdf/library"
      ```  

3. **Run PHP Local Server:**  
   a. Navigate to the project root directory in your terminal.  
   b. Start the PHP local server by executing the following command:  
      ```bash
      php -S localhost:8000
      ```  

4. **Install Dependencies:**  
   In the project root directory, install the required Node.js dependencies by running:  
   ```bash
   npm install
   ```  

5. **Start the Web Server:**  
   Launch the Node.js web server using:  
   ```bash
   npm start
   ```  


---

## Acknowledgments  
This project is part of the coursework for **DSGN8311-24F-Sec2 - Advanced Database Design**.

---  
