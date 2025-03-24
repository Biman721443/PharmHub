import React, { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";

const categories = [
  "Nutrition", "Mental Health", "Fitness", "Heart Health", "Diabetes", "Skin Care",
  "Weight Loss", "Cancer Awareness", "Sleep Health", "Immunity Boosting", "Women's Health",
  "Men's Health", "Digestive Health", "Bone & Joint Health", "Healthy Aging"
];

const blogs = [
  { id: 1, title: "10 Superfoods for a Healthy Life", category: "Nutrition", content: "Superfoods like berries, nuts, and green veggies help boost immunity and energy levels. They provide essential vitamins and minerals needed for overall well-being." },
  { id: 2, title: "Managing Anxiety and Stress", category: "Mental Health", content: "Practicing mindfulness and deep breathing can help reduce daily stress. Developing healthy coping mechanisms is essential for mental stability." },
  { id: 3, title: "Effective Home Workouts", category: "Fitness", content: "Bodyweight exercises like push-ups and squats are great for staying fit at home. Incorporating daily movement is key to maintaining fitness levels." },
  { id: 4, title: "How to Keep Your Heart Healthy", category: "Heart Health", content: "Regular exercise and a balanced diet contribute to heart health. Avoiding processed foods and maintaining a healthy weight can prevent heart disease." },
  { id: 5, title: "Diabetes Management Tips", category: "Diabetes", content: "Monitor blood sugar levels and maintain a healthy diet to manage diabetes effectively. Eating whole foods and staying active can help control blood sugar fluctuations." },
  { id: 6, title: "Best Skincare Routine for Glowing Skin", category: "Skin Care", content: "Hydration and proper skincare products can give you flawless skin. Using sunscreen daily helps prevent premature aging." },
  { id: 7, title: "Weight Loss Myths Busted", category: "Weight Loss", content: "Starving yourself isn’t the key to weight loss; a balanced diet is. Consistency and sustainable habits are essential for long-term results." },
  { id: 8, title: "Early Signs of Cancer to Watch", category: "Cancer Awareness", content: "Regular check-ups can help detect cancer in its early stages. Early detection significantly improves treatment outcomes." },
  { id: 9, title: "Tips for Better Sleep", category: "Sleep Health", content: "Avoid screens before bedtime and create a relaxing sleep environment. A consistent bedtime routine improves sleep quality." },
  { id: 10, title: "How to Boost Immunity Naturally", category: "Immunity Boosting", content: "Eating fruits rich in Vitamin C and exercising can enhance your immunity. Managing stress and getting adequate sleep are also vital for immune health." },
  { id: 11, title: "Health Tips for Women", category: "Women's Health", content: "Regular screenings and a balanced diet are key for women's health. Managing hormonal balance plays a significant role in overall well-being." },
  { id: 12, title: "Men's Health and Wellness Guide", category: "Men's Health", content: "Staying active and managing stress are crucial for men's health. Regular check-ups and a nutritious diet can help prevent chronic diseases." },
  { id: 13, title: "Improve Your Digestion Naturally", category: "Digestive Health", content: "Probiotics and fiber-rich foods support good gut health. Drinking plenty of water aids digestion and prevents bloating." },
  { id: 14, title: "Tips for Stronger Bones and Joints", category: "Bone & Joint Health", content: "Calcium and Vitamin D play a key role in bone strength. Regular weight-bearing exercises help maintain bone density." },
  { id: 15, title: "Healthy Aging Tips", category: "Healthy Aging", content: "Regular exercise and mental stimulation help with aging gracefully. Maintaining social connections and a nutritious diet contribute to longevity." }
];

const HealthBlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filteredBlogs = selectedCategory === "All" ? blogs : blogs.filter(blog => blog.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">🩺 Health Blogs</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button onClick={() => setSelectedCategory("All")} className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500">All</button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <FaRegNewspaper className="text-6xl text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-blue-500 font-medium">{blog.category}</p>
              <p className="text-gray-500 text-sm truncate w-64">{blog.content}</p>
              <button
                onClick={() => setSelectedBlog(blog)}
                className="mt-4 bg-green-600 text-white py-2 px-5 rounded-full hover:bg-blue-500 transition shadow-md"
              >
                Read More
              </button>
            </div>
            {selectedBlog && selectedBlog.id === blog.id && (
              <div className="mt-4 p-4 bg-gray-200 rounded-lg shadow-inner">
                <h3 className="text-xl font-bold text-gray-800">{selectedBlog.title}</h3>
                <p className="text-gray-600 mt-2">{selectedBlog.content}</p>
                <button onClick={() => setSelectedBlog(null)} className="mt-3 bg-red-600 text-white py-1 px-4 rounded hover:bg-red-500">Close</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthBlogs;
