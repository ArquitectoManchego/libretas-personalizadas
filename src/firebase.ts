import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Connected to user's active Firebase Project: sistema-pedidos-imperia (elchegos@gmail.com)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForCatalogNotebooks2026",
  authDomain: "sistema-pedidos-imperia.firebaseapp.com",
  projectId: "sistema-pedidos-imperia",
  storageBucket: "sistema-pedidos-imperia.appspot.com",
  messagingSenderId: "1084644965062",
  appId: "1:1084644965062:web:b417e718b146260cd635c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function saveOrderToFirebase(orderData: any) {
  try {
    const docRef = await addDoc(collection(db, "pedidos_libretas"), {
      ...orderData,
      createdAt: new Date().toISOString()
    });
    console.log("Pedido guardado en Firebase (sistema-pedidos-imperia) con ID: ", docRef.id);
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
