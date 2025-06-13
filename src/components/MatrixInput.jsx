import React from 'react';

const MatrixInput = ({ matrix, onMatrixChange, editable, title }) => {
  return (
    <div className="matrix-section">
      {title && <h2>{title}</h2>}
      <table className="matrix-table">
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              {row.map((val, j) => (
                <td key={j}>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => onMatrixChange(i, j, e.target.value)}
                    className="matrix-cell"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixInput;
