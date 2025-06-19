import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import { useNavigate } from 'react-router-dom';
import './DeterminantCalculator.css';

function DeterminantCalculator() {
  const [matrix, setMatrix] = useState(
    Array(5).fill().map(() => Array(5).fill(''))
  );
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]); // langkah-langkah perhitungan

  const navigate = useNavigate();

  const handleMatrixChange = (i, j, value) => {
    const updatedMatrix = [...matrix];
    updatedMatrix[i][j] = value;
    setMatrix(updatedMatrix);
  };

  const generateRandomMatrix = () => {
    const randomMatrix = matrix.map(row =>
      row.map(() => Math.floor(Math.random() * 10))
    );
    setMatrix(randomMatrix);
    setResult(null);
    setSteps([]);
  };

  const refreshMatrix = () => {
    const clearedMatrix = matrix.map(row => row.map(() => ''));
    setMatrix(clearedMatrix);
    setResult(null);
    setSteps([]);
  };

  const calculateDeterminant = () => {
    const toNumberMatrix = matrix.map(row => row.map(val => Number(val)));
    const newSteps = [];
    let stepIndex = 1;

    const determinant = (m, level = 0) => {
      const n = m.length;
      if (n === 1) return m[0][0];
      if (n === 2)
        return m[0][0] * m[1][1] - m[0][1] * m[1][0];

      let det = 0;
      for (let col = 0; col < n; col++) {
        const subMatrix = m.slice(1).map(row =>
          row.filter((_, j) => j !== col)
        );
        const sign = (col % 2 === 0 ? 1 : -1);
        const cofactor = sign * m[0][col];
        const subDet = determinant(subMatrix, level + 1);
        const term = cofactor * subDet;
        det += term;

        if (level === 0) {
          newSteps.push(
            `Langkah ${stepIndex++}:`,
            `Ambil elemen baris ke-1 kolom ke-${col + 1}: ${m[0][col]}`,
            `Hilangkan baris ke-1 dan kolom ke-${col + 1}, lalu hitung determinan minor: ${subDet}`,
            `Cofactor = ${m[0][col]} × (-1)⁽¹⁺${col + 1}⁾ = ${cofactor}`,
            `Perkalian cofactor × minor: ${cofactor} × ${subDet} = ${term}`,
            `Jumlah sementara determinan: ${det}`,
            '----------------------------------'
          );
        }
      }
      return det;
    };

    const resultValue = determinant(toNumberMatrix);
    setResult(resultValue);
    setSteps(newSteps);
  };

  return (
    <div className="determinant-container">
      <h1 className="determinant-title">Determinan Kofaktor</h1>
      <div className="determinant-widget-wrapper">
        <MatrixInput
          matrix={matrix}
          onMatrixChange={handleMatrixChange}
          editable={true}
        />
        <div className="button-group">
          <button className="primary-button" onClick={calculateDeterminant}>
            Hitung Determinan
          </button>
          <button className="primary-button" onClick={generateRandomMatrix}>
            Isi Acak
          </button>
          <button className="primary-button" onClick={refreshMatrix}>
            Refresh
          </button>
          <button className="primary-button" onClick={() => navigate('/')}>
            Kembali
          </button>
        </div>

        {result !== null && (
          <div className="result-box">
            <p>Hasil determinan:</p>
            <div className="result-value">{result}</div>
          </div>
        )}

        {steps.length > 0 && (
          <div className="steps-box">
            <h3 className="steps-title">Langkah-langkah Perhitungan:</h3>
            <div className="steps-text">
              {steps.map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeterminantCalculator;
