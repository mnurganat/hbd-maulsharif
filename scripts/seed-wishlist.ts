// Run with: npx tsx scripts/seed-wishlist.ts
// This seeds the Firestore 'wishlist' collection with items from config/event.ts
// Re-run anytime you update WISHLIST_ITEMS in config/event.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { WISHLIST_ITEMS } from "../config/event";

const firebaseConfig = {
  apiKey: "AIzaSyAoViWrtVm45ZNU0Wj04Qe33Vk7wVc_-Kc",
  authDomain: "maulsharif-landing.firebaseapp.com",
  projectId: "maulsharif-landing",
  storageBucket: "maulsharif-landing.firebasestorage.app",
  messagingSenderId: "116884173405",
  appId: "1:116884173405:web:94d8536e524de9685593b4",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log(`Seeding ${WISHLIST_ITEMS.length} wishlist items...`);

  for (const item of WISHLIST_ITEMS) {
    await setDoc(doc(db, "hbd_wishlist", item.id), {
      title: item.title,
      description: item.description,
      link: item.link,
      claimed: false,
      claimedAt: null,
    });
    console.log(`  ✓ ${item.title}`);
  }

  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
