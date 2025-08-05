// DbService.ts
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // ensure this path is correct

export const createNewBucketItem = async (newItem: {
  title: string;
  due: string;
  description: string;
  priority: boolean;
}) => {
  try {
    const docRef = await addDoc(collection(db, "bucketItems"), {
      ...newItem,
      completed: false,
      createdAt: new Date()
    });
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
};

