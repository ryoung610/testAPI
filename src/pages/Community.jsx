import React from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Card, CardContent, Button } from "@mui/material";



const categories = [
  { name: "Business & IT Services", description: "Discuss tech solutions and business growth strategies." },
  { name: "Relationships & Lifestyle", description: "Talk about personal growth, relationships, and life experiences." },
  { name: "Innovative Tech Projects", description: "Explore and share cutting-edge technology projects." },
  { name: "Creative Arts & Design", description: "Showcase and discuss art, music, and design ideas." }
];

const Community = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <motion.h1 className="text-4xl font-bold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Welcome to the LL&L Projects
      </motion.h1>
      <p className="text-lg text-gray-600 mb-6">
        Engage in interactive discussions, share ideas, and connect with like-minded individuals. Participate!
      </p>
      <Link to="/Product">
        <Button className="mb-6 px-6 py-3 text-lg">👉 Help Us Build the Future – Join the Movement! 👓✨</Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }}>
           <Link to={`/todo/${encodeURIComponent(category.name)}`} className="no-underline">
            <Card className="p-4 shadow-lg rounded-xl">
              <CardContent>
                <h2 className="text-2xl font-semibold mb-2">{category.name}</h2>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Community;
