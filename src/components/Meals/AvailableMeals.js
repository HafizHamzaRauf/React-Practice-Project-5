import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-complete-guide-9e243-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();
      const arr = [];
      for (let item in data) {
        const obj = {
          id: item,
          name: data[item].name,
          description: data[item].description,
          price: data[item].price,
        };
        arr.push(obj);
      }
      setMeals(arr);
      setIsLoading(false);
    };
    fetchData().catch((err) => {
      setError(true);
    });
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  if (error) {
    return (
      <section className={classes.loading}>
        <p>Something went wrong...</p>
      </section>
    );
  }
  if (!isLoading) {
    return (
      <section className={classes.meals}>
        <Card>
          <ul>{mealsList}</ul>
        </Card>
      </section>
    );
  } else {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }
};

export default AvailableMeals;
