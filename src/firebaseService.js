import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "Data";  // use a constant for reusability

export const addData = async (product) => {
  await addDoc(collection(db, COLLECTION_NAME), product);
};

export const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  console.log(products);
  return products;
};

// Optional: add update and delete functions for completeness

export const updateData = async (id, updatedData) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updatedData);
};

export const deleteData = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
