document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.getElementById("calculate-bmi");
    const resetBtn = document.getElementById("reset-form");
    const bmiForm = document.getElementById("bmi-form");
    const resultDiv = document.getElementById("result-bmi");

    bmiForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const weightInput = document.getElementById("input-berat-badan");
        const heightInput = document.getElementById("input-tinggi-badan");
        const genderInput = document.getElementById("gender");
        const ageInput = document.getElementById("input-usia");

        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value) / 100; // Convert cm to meters
        const gender = genderInput.value;
        const age = parseInt(ageInput.value);

        // Reset previous classes
        resultDiv.className = "bmi-result"; // Remove any existing status classes

        if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0 || isNaN(age) || age <= 0 || gender === "") {
            resultDiv.innerHTML = `<p style="font-weight: bold;">Pastikan semua kolom terisi dengan angka yang valid dan jenis kelamin dipilih!</p>`;
            resultDiv.classList.add("error"); // Add error class
            return;
        }

        const bmi = (weight / (height * height)).toFixed(1);
        let status = "";
        let advice = "";
        let statusClass = ""; // To add specific class for styling

        if (bmi < 18.5) {
            status = "Kekurangan Berat Badan";
            advice = "Anda memiliki berat badan kurang. Pertimbangkan untuk meningkatkan asupan kalori sehat dan berkonsultasi dengan ahli gizi untuk panduan yang tepat.";
            statusClass = "underweight";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            status = "Normal (Ideal)";
            advice = "Selamat! Berat badan Anda ideal. Pertahankan pola hidup sehat dengan gizi seimbang dan olahraga teratur.";
            statusClass = "normal";
        } else if (bmi >= 25 && bmi <= 29.9) {
            status = "Kelebihan Berat Badan";
            advice = "Anda memiliki kelebihan berat badan. Pertimbangkan untuk mengatur pola makan dan meningkatkan aktivitas fisik secara bertahap.";
            statusClass = "overweight";
        } else {
            status = "Kegemukan (Obesitas)";
            advice = "Anda mengalami obesitas. Sangat disarankan untuk berkonsultasi dengan profesional kesehatan untuk rencana penurunan berat badan yang aman dan efektif.";
            statusClass = "obese";
        }

        // Gender and Age specific advice (simplified for brevity, can be expanded)
        let specificAdvice = "";
        if (gender === "laki-laki") {
            specificAdvice = "Pria seringkali memiliki komposisi otot yang lebih tinggi, jadi pastikan asupan protein cukup.";
        } else if (gender === "perempuan") {
            specificAdvice = "Wanita perlu memperhatikan asupan nutrisi penting seperti zat besi dan kalsium.";
        }
        
        if (age < 18) {
            specificAdvice += " Untuk usia muda, interpretasi BMI harus hati-hati dan idealnya dikonsultasikan dengan dokter anak.";
        } else if (age > 60) {
            specificAdvice += " Pada usia lanjut, fokus pada menjaga massa otot dan nutrisi yang seimbang sangat penting.";
        }
        if (specificAdvice) {
            advice += " " + specificAdvice;
        }


        resultDiv.innerHTML = `
            <p>BMI Anda: <strong>${bmi}</strong></p>
            <p>Status: <span class="status-text">${status}</span></p>
            <p class="advice-text">Saran: ${advice}</p>
        `;
        resultDiv.classList.add(statusClass); // Add the dynamic class for styling

        // Auto-scroll to result
        resultDiv.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    resetBtn.addEventListener("click", () => {
        bmiForm.reset(); // Resets all form fields
        resultDiv.className = "bmi-result"; // Remove any status classes
        resultDiv.innerHTML = `<p class="initial-message">Masukkan data Anda untuk melihat hasil BMI di sini.</p>`;
    });
});