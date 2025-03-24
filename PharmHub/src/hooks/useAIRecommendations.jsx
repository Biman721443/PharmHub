import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const useAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useCart(); // 🛒 Get cart items

  useEffect(() => {
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/medecine.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const allMedicines = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          let recommendedMeds = [];

          if (cartItems.length > 0) {
            const lastAddedItem = cartItems[cartItems.length - 1];
            recommendedMeds = allMedicines.filter(
              (med) =>
                (med.category === lastAddedItem.category ||
                  med.brand === lastAddedItem.brand) &&
                med.id !== lastAddedItem.id
            );
          }

          if (recommendedMeds.length === 0) {
            recommendedMeds = allMedicines
              .filter((med) => med.discount > 15)
              .slice(0, 4);
          }

          setRecommendations(recommendedMeds.slice(0, 4));
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching AI recommendations:", err);
        setLoading(false);
      });
  }, [cartItems]);

  return { recommendations, loading };
};

export default useAIRecommendations;
