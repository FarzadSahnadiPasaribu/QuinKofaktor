import React from 'react';

const OperationWidget = ({ onRandomize, onAdd, onSubtract, onMultiply }) => (
  <div className="d-flex justify-content-center gap-3 flex-wrap">
    <button className="btn btn-outline-success" onClick={onRandomize}>Acak Matriks</button>
    <button className="btn btn-outline-success" onClick={onAdd}>+</button>
    <button className="btn btn-outline-success" onClick={onSubtract}>−</button>
    <button className="btn btn-outline-success" onClick={onMultiply}>×</button>
  </div>
);

export default OperationWidget;
