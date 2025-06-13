import React, { useState } from 'react';

const generateMatrix = (size) => {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 10))
  );
};

const getMinor = (matrix, row, col) => {
  return matrix
    .filter((_, r) => r !== row)
    .map((r) => r.filter((_, c) => c !== col));
};

const determinant = (matrix) => {
  const size = matrix.length;
  if (size === 1) return matrix[0][0];
  if (size === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  let det = 0;
  for (let col = 0; col < size; col++) {
    const minor = getMinor(matrix, 0, col);
    det += (col % 2 === 0 ? 1 : -1) * matrix[0][col] * determinant(minor);
  }
  return det;
};

const DeterminantWidget = () => {
  const [matrix, setMatrix] = useState(generateMatrix(5));
  const [result, setResult] = useState(null);

  const handleRandomize = () => {
    setMatrix(generateMatrix(5));
    setResult(null);
  };

  const handleCalculate = () => {
    const det = determinant(matrix);
    setResult(det);
  };

  const renderMatrix = () => (
    <table className="table table-bordered text-center text-light">
      <tbody>
        {matrix.map((row, i) => (
          <tr key={i}>{row.map((val, j) => <td key={j}>{val}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <button className="btn btn-outline-success me-2" onClick={handleRandomize}>Acak Matriks</button>
      <button className="btn btn-outline-success" onClick={handleCalculate}>Hitung Determinan</button>

      <h5 className="mt-4">Matrix 5x5</h5>
      {renderMatrix()}

      {result !== null && (
        <>
          <h5>Determinan</h5>
          <div className="alert alert-success">{result}</div>
        </>
      )}
    </div>
  );
};

export default DeterminantWidget;