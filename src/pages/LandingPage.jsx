import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-widget">
        <h1 className="landing-title">QuinKofaktor</h1>
        <p className="landing-description">
          Aplikasi interaktif untuk melakukan operasi matriks dan menghitung determinan matriks ordo 4x4 atau 5x5 menggunakan metode kofaktor.
        </p>

        <div className="landing-buttons">
          <button onClick={() => navigate('/operasi')}>Operasi Matriks</button>
          <button onClick={() => navigate('/determinan')}>Hitung Determinan</button>
        </div>

        <div className="landing-explanation">
          <h2>Operasi Matriks</h2>
          <p>
            Operasi matriks meliputi penjumlahan, pengurangan, dan perkalian antara dua matriks A dan B.
            Untuk operasi tersebut, kedua matriks harus memiliki ukuran yang sama (untuk penjumlahan dan pengurangan),
            atau jumlah kolom di matriks A harus sama dengan jumlah baris di matriks B (untuk perkalian).
          </p>

          <h2>Determinan dengan Metode Kofaktor</h2>
          <p>
            Metode kofaktor digunakan untuk menghitung determinan dari matriks berordo besar (seperti 4x4 atau 5x5).
            Caranya adalah dengan mengambil elemen-elemen dari baris pertama dan mengalikannya dengan determinan minor dari submatriks yang terbentuk setelah menghapus baris dan kolom elemen tersebut.
            Tanda positif dan negatif bergantian sesuai dengan posisi elemen (pola papan catur).
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
