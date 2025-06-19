import React, { useState } from 'react';
import MatrixInput from '../components/MatrixInput';
import { useNavigate } from 'react-router-dom';
import './MatrixOperations.css';

function MatrixOperations() {
  const [size, setSize] = useState(4);
  const [matrixA, setMatrixA] = useState(Array(4).fill().map(() => Array(4).fill('')));
  const [matrixB, setMatrixB] = useState(Array(4).fill().map(() => Array(4).fill('')));
  const [result, setResult] = useState(null);
  const [operationLabel, setOperationLabel] = useState('');
  const [steps, setSteps] = useState([]);

  const navigate = useNavigate();

  const handleMatrixChangeA = (i, j, value) => {
    const updated = [...matrixA];
    updated[i][j] = value;
    setMatrixA(updated);
  };

  const handleMatrixChangeB = (i, j, value) => {
    const updated = [...matrixB];
    updated[i][j] = value;
    setMatrixB(updated);
  };

  const parseMatrix = (matrix) =>
    matrix.map((row) => row.map((val) => parseFloat(val) || 0));

  const addMatrices = () => {
    const A = parseMatrix(matrixA);
    const B = parseMatrix(matrixB);
    const res = A.map((row, i) => row.map((val, j) => val + B[i][j]));
    const stepDesc = A.map((row, i) =>
      row.map((val, j) => `${val} + ${B[i][j]} = ${val + B[i][j]}`)
    );
    setResult(res);
    setOperationLabel('Hasil Penjumlahan');
    setSteps(stepDesc);
  };

  const subtractMatrices = () => {
    const A = parseMatrix(matrixA);
    const B = parseMatrix(matrixB);
    const res = A.map((row, i) => row.map((val, j) => val - B[i][j]));
    const stepDesc = A.map((row, i) =>
      row.map((val, j) => `${val} - ${B[i][j]} = ${val - B[i][j]}`)
    );
    setResult(res);
    setOperationLabel('Hasil Pengurangan');
    setSteps(stepDesc);
  };

  const multiplyMatrices = () => {
    const A = parseMatrix(matrixA);
    const B = parseMatrix(matrixB);
    const res = Array(size).fill().map(() => Array(size).fill(0));
    const stepDesc = Array(size).fill().map(() => Array(size).fill(''));

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let calcSteps = [];
        for (let k = 0; k < size; k++) {
          calcSteps.push(`${A[i][k]}×${B[k][j]}`);
          res[i][j] += A[i][k] * B[k][j];
        }
        stepDesc[i][j] = `${calcSteps.join(' + ')} = ${res[i][j]}`;
      }
    }

    setResult(res);
    setOperationLabel('Hasil Perkalian');
    setSteps(stepDesc);
  };

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setSize(newSize);
    setMatrixA(Array(newSize).fill().map(() => Array(newSize).fill('')));
    setMatrixB(Array(newSize).fill().map(() => Array(newSize).fill('')));
    setResult(null);
    setSteps([]);
  };

  const generateRandomMatrices = () => {
    const randomMatrix = () =>
      Array(size).fill().map(() => Array(size).fill().map(() => Math.floor(Math.random() * 10)));
    setMatrixA(randomMatrix());
    setMatrixB(randomMatrix());
    setResult(null);
    setSteps([]);
  };

  const refreshMatrices = () => {
    const emptyMatrix = () =>
      Array(size).fill().map(() => Array(size).fill(''));
    setMatrixA(emptyMatrix());
    setMatrixB(emptyMatrix());
    setResult(null);
    setSteps([]);
  };

  return (
    <div className="determinant-container">
      <h1 className="determinant-title">Operasi Matriks</h1>

      <div className="size-selector">
        <label>Ukuran Matriks:</label>
        <select value={size} onChange={handleSizeChange}>
          <option value={4}>4 x 4</option>
          <option value={5}>5 x 5</option>
        </select>
      </div>

      <div className="determinant-widget-wrapper">
        <div className="matrix-wrapper">
          <MatrixInput
            matrix={matrixA}
            onMatrixChange={handleMatrixChangeA}
            editable={true}
            title="Matrix A"
          />
          <MatrixInput
            matrix={matrixB}
            onMatrixChange={handleMatrixChangeB}
            editable={true}
            title="Matrix B"
          />
        </div>

        <div className="operation-buttons">
          <button className="primary-button" onClick={addMatrices}>+</button>
          <button className="primary-button" onClick={subtractMatrices}>-</button>
          <button className="primary-button" onClick={multiplyMatrices}>×</button>
        </div>

        <div className="button-group">
          <button className="primary-button" onClick={generateRandomMatrices}>Isi Acak</button>
          <button className="primary-button" onClick={refreshMatrices}>Refresh</button>
          <button className="primary-button" onClick={() => navigate('/')}>Kembali</button>
        </div>

        {result && (
          <div className="matrix-result">
            <h2>{operationLabel}</h2>
            <table className="matrix-table">
              <tbody>
                {result.map((row, i) => (
                  <tr key={i}>
                    {row.map((val, j) => (
                      <td key={j}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="steps-section">
              <h3>Langkah-langkah perhitungan:</h3>
              <ul>
                {steps.map((row, i) => (
                  <li key={i}>
                    {row.map((text, j) => (
                      <div key={j}>Elemen [{i + 1},{j + 1}]: {text}</div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MatrixOperations;
