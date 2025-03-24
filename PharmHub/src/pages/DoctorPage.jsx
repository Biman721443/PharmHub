import React, { useState } from "react";
import { FaUserMd, FaCheckCircle } from "react-icons/fa";

const doctors = [
  { id: 1, name: "Dr. Aditi Sharma", specialty: "Cardiologist", experience: "10 Years", fee: "₹500" },
  { id: 2, name: "Dr. Raj Malhotra", specialty: "Dermatologist", experience: "8 Years", fee: "₹400" },
  { id: 3, name: "Dr. Neha Kapoor", specialty: "Neurologist", experience: "12 Years", fee: "₹600" },
  { id: 4, name: "Dr. Rohan Das", specialty: "Orthopedic", experience: "9 Years", fee: "₹450" },
  { id: 5, name: "Dr. Simran Kaur", specialty: "Pediatrician", experience: "11 Years", fee: "₹350" },
  { id: 6, name: "Dr. Arjun Mehta", specialty: "Psychiatrist", experience: "7 Years", fee: "₹500" },
  { id: 7, name: "Dr. Priya Sinha", specialty: "ENT Specialist", experience: "10 Years", fee: "₹400" },
  { id: 8, name: "Dr. Vikram Rao", specialty: "Oncologist", experience: "13 Years", fee: "₹700" },
  { id: 9, name: "Dr. Anjali Verma", specialty: "Gynecologist", experience: "9 Years", fee: "₹450" },
  { id: 10, name: "Dr. Sameer Joshi", specialty: "Endocrinologist", experience: "8 Years", fee: "₹550" },
  { id: 11, name: "Dr. Tanya Choudhury", specialty: "Dentist", experience: "6 Years", fee: "₹300" },
  { id: 12, name: "Dr. Karan Patel", specialty: "Radiologist", experience: "10 Years", fee: "₹600" },
  { id: 13, name: "Dr. Sunita Bansal", specialty: "Nephrologist", experience: "14 Years", fee: "₹750" },
  { id: 14, name: "Dr. Rohit Shetty", specialty: "Gastroenterologist", experience: "11 Years", fee: "₹500" },
  { id: 15, name: "Dr. Meera Nair", specialty: "Pulmonologist", experience: "9 Years", fee: "₹400" }
];

const DoctorConsult = () => {
  const [confirmation, setConfirmation] = useState(null);

  const bookAppointment = (doctorName) => {
    setConfirmation(`Appointment booked with ${doctorName}. Our team will contact you shortly!`);
    setTimeout(() => setConfirmation(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">👩‍⚕️ Consult a Doctor</h2>
      {confirmation && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border-l-4 border-green-600 rounded-lg shadow-md flex items-center">
          <FaCheckCircle className="mr-2 text-green-600" /> {confirmation}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-5 rounded-full shadow-md mb-3">
                <FaUserMd className="text-6xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
              <p className="text-blue-500 font-medium">{doctor.specialty}</p>
              <p className="text-gray-500 text-sm">{doctor.experience}</p>
              <p className="text-green-600 font-bold text-lg mt-2">{doctor.fee}</p>
              <button
                onClick={() => bookAppointment(doctor.name)}
                className="mt-4 bg-blue-600 text-white py-2 px-5 rounded-full hover:bg-blue-500 transition shadow-md"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorConsult;