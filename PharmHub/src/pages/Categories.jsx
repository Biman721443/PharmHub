import React from "react";
import medicineImg from "../assets/medicine.png";
import labTestsImg from "../assets/home.jpg";
import doctorConsultImg from "../assets/doctor-consult.png";
import healthcareImg from "../assets/healthcare.png";
import healthBlogsImg from "../assets/health-blogs.png";
import plusImg from "../assets/plus.png";


const categories = [
  { name: "Medicine", discount: "SAVE 24% OFF", link: "/medicine-product", image: medicineImg },
  { name: "Homecare", discount: "UPTO 70% OFF", link: "/homecare-product", image: labTestsImg },
  { name: "Doctor Consult", discount: "", link: "/doctor-consult", image: doctorConsultImg },
  { name: "Skincare", discount: "UPTO 60% OFF", link: "/healthcare-products", image: healthcareImg },
  { name: "Health Blogs", discount: "", link: "/health-blogs", image: healthBlogsImg },
  { name: "PLUS", discount: "SAVE 5% EXTRA", link: "/plus", image: plusImg },
];

const CategoryLinks = () => {
  return (
    <div className="flex justify-center space-x-21 p-4 bg-white mt-10">
      {categories.map((category, index) => (
        <a
          key={index}
          href={category.link}
          className="flex flex-col items-center text-center hover:scale-105 transition-transform"
        >
          <img src={category.image} alt={category.name} className="w-16 h-16" />
          <span className="mt-2 font-medium text-gray-800">{category.name}</span>
          {category.discount && (
            <span className="text-red-500 text-sm font-semibold">{category.discount}</span>
          )}
        </a>
      ))}
    </div>
  );
};

export default CategoryLinks;