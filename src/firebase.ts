import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Default configuration (users can easily replace with their own firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForCatalogNotebooks2026",
  authDomain: "libretas-personalizadas.firebaseapp.com",
  projectId: "libretas-personalizadas",
  storageBucket: "libretas-personalizadas.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveOrderToFirebase(orderData: any) {
  try {
    const docRef = await addDoc(collection(db, "pedidos"), {
      ...orderData,
      createdAt: new Date().toISOString()
    });
    console.log("Pedido guardado en Firebase con ID: ", docRef.id);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.warn("Firebase fallback (usando localStorage):", e);
    const localOrders = JSON.parse(localStorage.getItem('libretas_pedidos') || '[]');
    const newOrder = { ...orderData, id: 'LOCAL-' + Date.now(), createdAt: new Date().toISOString() };
    localOrders.push(newOrder);
    localStorage.setItem('libretas_pedidos', JSON.stringify(localOrders));
    return { success: true, id: newOrder.id };
  }
}
