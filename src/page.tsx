"use client";

import styles from "@/page.module.css";
import dinouLogo from "@/images/dinou.png";

export default function Page() {
  return (
    <div className={`text-red-500 test1 ${styles.test2}`}>
      <img src={dinouLogo} alt="Dinou Logo" className="w-32" />
      hi world!
    </div>
  );
}
