// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, query, collection, where, getDocs } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDlM780rZobiK0yxtXyatAqk1bv3rzmtN4",
    authDomain: "registro-454ad.firebaseapp.com",
    projectId: "registro-454ad",
    storageBucket: "registro-454ad.firebasestorage.app",
    messagingSenderId: "258742230950",
    appId: "1:258742230950:web:fc9d9d912d18c46062f967",
    measurementId: "G-5VDD134V42"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Verificar boleto
document.getElementById("verificarBoleto").addEventListener("click", async () => {
    const numeroBoleto = parseInt(document.getElementById("numeroBoleto").value, 10);
    const mensaje = document.getElementById("mensaje");

    if (!numeroBoleto || numeroBoleto < 1 || numeroBoleto > 50000) {
        mensaje.textContent = "Por favor, ingresa un número de boleto válido (00001-50000).";
        return;
    }

    const boletoRef = doc(db, "boletos", numeroBoleto.toString());
    const boletoSnapshot = await getDoc(boletoRef);

    if (boletoSnapshot.exists()) {
        mensaje.textContent = `El boleto ${numeroBoleto} ya está registrado.`;
        mensaje.style.color = "red";
    } else {
        mensaje.textContent = `El boleto ${numeroBoleto} está disponible.`;
        mensaje.style.color = "green";
    }
});

// Registrar boleto
document.getElementById("ticketForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidoPaterno = document.getElementById("apellidoPaterno").value.trim();
    const apellidoMaterno = document.getElementById("apellidoMaterno").value.trim();
    const numeroBoleto = parseInt(document.getElementById("numeroBoleto").value, 10);
    const mensaje = document.getElementById("mensaje");

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !numeroBoleto) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        return;
    }

    const boletoRef = doc(db, "boletos", numeroBoleto.toString());
    const boletoSnapshot = await getDoc(boletoRef);

    if (boletoSnapshot.exists()) {
        mensaje.textContent = `El boleto ${numeroBoleto} ya está registrado.`;
        mensaje.style.color = "red";
    } else {
        await setDoc(boletoRef, {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            numeroBoleto
        });
        mensaje.textContent = `El boleto ${numeroBoleto} ha sido registrado con éxito.`;
        mensaje.style.color = "green";
    }
});
