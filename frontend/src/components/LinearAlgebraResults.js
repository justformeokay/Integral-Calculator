import React, { useState } from 'react';
import './LinearAlgebraResults.css';
import { MdExpandMore, MdExpandLess, MdContentCopy } from 'react-icons/md';

function LinearAlgebraResults({ data }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatMatrix = (matrix) => {
    if (!matrix || !Array.isArray(matrix)) return 'N/A';
    return matrix.map(row =>
      `[${row.map(val => typeof val === 'number' ? val.toFixed(4) : val).join(', ')}]`
    ).join('\n');
  };

  const formatNumber = (num) => {
    if (typeof num !== 'number') return num;
    return Math.abs(num) < 1e-10 ? '0' : num.toFixed(6);
  };

  const ResultSection = ({ title, children, sectionKey }) => (
    <div className="result-section">
      <div
        className="section-header"
        onClick={() => toggleSection(sectionKey)}
      >
        <span className="section-title">{title}</span>
        {expandedSections[sectionKey] ? <MdExpandLess /> : <MdExpandMore />}
      </div>
      {expandedSections[sectionKey] && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );

  const MatrixDisplay = ({ matrix, title, copyable = false }) => (
    <div className="matrix-display">
      <h4>{title}</h4>
      <pre className="matrix-data">
        {formatMatrix(matrix)}
      </pre>
      {copyable && (
        <button
          className="copy-btn"
          onClick={() => copyToClipboard(formatMatrix(matrix))}
        >
          <MdContentCopy /> Copy
        </button>
      )}
    </div>
  );

  // If data doesn't have success flag, show error
  if (!data.success) {
    return (
      <div className="results-container error-container">
        <h2>Error</h2>
        <p>{data.detail || 'An error occurred'}</p>
      </div>
    );
  }

  return (
    <div className="results-container linear-algebra-results">
      <div className="results-header">
        <h2>Linear Algebra Results</h2>
        <p>Operation: <strong>{data.operation}</strong></p>
      </div>

      {/* DETERMINANT */}
      {data.operation === 'determinant' && (
        <>
          <ResultSection title="Determinant Value" sectionKey="determinant">
            <div className="result-value">
              <span className="label">Determinant:</span>
              <span className="value">{formatNumber(data.determinant)}</span>
            </div>
            {data.symbolic_determinant && (
              <div className="result-value">
                <span className="label">Symbolic:</span>
                <span className="value">{data.symbolic_determinant}</span>
              </div>
            )}
            <div className="result-value">
              <span className="label">Matrix Size:</span>
              <span className="value">{data.matrix_size[0]} × {data.matrix_size[1]}</span>
            </div>
            <div className={`result-value ${data.is_singular ? 'singular' : 'regular'}`}>
              <span className="label">Status:</span>
              <span className="value">
                {data.is_singular ? 'Singular (non-invertible)' : 'Non-singular (invertible)'}
              </span>
            </div>
          </ResultSection>

          {data.matrix_visualization && (
            <ResultSection title="Matrix Visualization" sectionKey="matrix_viz">
              <img src={data.matrix_visualization} alt="Matrix Heatmap" className="result-image" />
            </ResultSection>
          )}
        </>
      )}

      {/* INVERSE */}
      {data.operation === 'inverse' && (
        <>
          <ResultSection title="Matrix Inverse" sectionKey="inverse">
            <MatrixDisplay matrix={data.inverse} title="A^(-1)" copyable />
            <div className="result-value">
              <span className="label">Determinant:</span>
              <span className="value">{formatNumber(data.determinant)}</span>
            </div>
            <div className={`result-value ${data.verification_passed ? 'success' : 'error'}`}>
              <span className="label">Verification:</span>
              <span className="value">
                {data.verification_passed ? '✓ Passed (A·A⁻¹ = I)' : '✗ Failed'}
              </span>
            </div>
            <div className="result-value">
              <span className="label">Condition Number:</span>
              <span className="value">{formatNumber(data.condition_number)}</span>
            </div>
          </ResultSection>

          {data.original_matrix_viz && (
            <ResultSection title="Visualizations" sectionKey="inverse_viz">
              <div className="side-by-side">
                <img src={data.original_matrix_viz} alt="Original Matrix" className="result-image" />
                <img src={data.inverse_matrix_viz} alt="Inverse Matrix" className="result-image" />
              </div>
            </ResultSection>
          )}
        </>
      )}

      {/* EIGENVALUES */}
      {data.operation === 'eigenvalues' && (
        <>
          <ResultSection title="Eigenvalues" sectionKey="eigenvalues">
            <div className="eigenvalue-list">
              {data.eigen_pairs.map((pair, idx) => (
                <div key={idx} className="eigenvalue-item">
                  <div className="eigen-value">
                    <span className="label">λ{idx + 1}:</span>
                    <span className="value">
                      {pair.eigenvalue.imag !== 0
                        ? `${formatNumber(pair.eigenvalue.real)} + ${formatNumber(pair.eigenvalue.imag)}i`
                        : formatNumber(pair.eigenvalue.real)}
                    </span>
                  </div>
                  <div className="eigen-vector">
                    <span className="label">Eigenvector:</span>
                    <pre className="vector-data">
                      [{pair.eigenvector.map(v => formatNumber(v)).join(', ')}]
                    </pre>
                  </div>
                </div>
              ))}
            </div>
            <div className="result-value">
              <span className="label">Trace:</span>
              <span className="value">{formatNumber(data.trace)}</span>
            </div>
            <div className="result-value">
              <span className="label">Diagonalizable:</span>
              <span className="value">{data.is_diagonalizable ? 'Yes' : 'No'}</span>
            </div>
          </ResultSection>

          {data.matrix_visualization && (
            <ResultSection title="Matrix Heatmap" sectionKey="eigen_matrix">
              <img src={data.matrix_visualization} alt="Matrix Heatmap" className="result-image" />
            </ResultSection>
          )}

          {data.eigenvectors_visualization && (
            <ResultSection title="2D Eigenvectors" sectionKey="eigen_2d">
              <img src={data.eigenvectors_visualization} alt="Eigenvectors 2D" className="result-image" />
            </ResultSection>
          )}

          {data.eigenvectors_visualization_3d && (
            <ResultSection title="3D Eigenvectors" sectionKey="eigen_3d">
              <div dangerouslySetInnerHTML={{ __html: data.eigenvectors_visualization_3d }} />
            </ResultSection>
          )}
        </>
      )}

      {/* DECOMPOSITION */}
      {data.operation === 'decomposition' && (
        <>
          <ResultSection title="Decomposition Method" sectionKey="decomp_method">
            <div className="result-value">
              <span className="label">Method:</span>
              <span className="value">{data.method.toUpperCase()}</span>
            </div>
            <p className="description">{data.description}</p>
          </ResultSection>

          {data.method.toLowerCase() === 'lu' && (
            <>
              <ResultSection title="LU Decomposition" sectionKey="lu_decomp">
                <MatrixDisplay matrix={data.P} title="P (Permutation Matrix)" />
                <MatrixDisplay matrix={data.L} title="L (Lower Triangular)" />
                <MatrixDisplay matrix={data.U} title="U (Upper Triangular)" />
              </ResultSection>
            </>
          )}

          {data.method.toLowerCase() === 'qr' && (
            <>
              <ResultSection title="QR Decomposition" sectionKey="qr_decomp">
                <MatrixDisplay matrix={data.Q} title="Q (Orthogonal Matrix)" />
                <MatrixDisplay matrix={data.R} title="R (Upper Triangular)" />
              </ResultSection>
            </>
          )}

          {data.method.toLowerCase() === 'svd' && (
            <>
              <ResultSection title="SVD Components" sectionKey="svd_decomp">
                <MatrixDisplay matrix={data.U} title="U (Left Singular Vectors)" />
                <div className="singular-values">
                  <h4>Singular Values (Σ):</h4>
                  <div className="values-list">
                    {data.singular_values.map((val, idx) => (
                      <span key={idx} className="singular-value">
                        σ{idx + 1} = {formatNumber(val)}
                      </span>
                    ))}
                  </div>
                </div>
                <MatrixDisplay matrix={data.Vt} title="V^T (Right Singular Vectors)" />
                <div className="result-value">
                  <span className="label">Condition Number:</span>
                  <span className="value">{formatNumber(data.condition_number)}</span>
                </div>
                <div className="result-value">
                  <span className="label">Matrix Rank:</span>
                  <span className="value">{data.rank}</span>
                </div>
              </ResultSection>

              {data.svd_visualization && (
                <ResultSection title="SVD Visualization" sectionKey="svd_viz">
                  <img src={data.svd_visualization} alt="SVD Visualization" className="result-image" />
                </ResultSection>
              )}
            </>
          )}

          {data.method.toLowerCase() === 'cholesky' && (
            <>
              <ResultSection title="Cholesky Decomposition" sectionKey="cholesky_decomp">
                <MatrixDisplay matrix={data.L} title="L (Lower Triangular)" />
                <p className="info">A = L·L^T</p>
              </ResultSection>
            </>
          )}
        </>
      )}

      {/* SOLVE LINEAR SYSTEM */}
      {data.operation === 'solve_system' && (
        <>
          <ResultSection title="Linear System Solution" sectionKey="solve">
            <div className="system-info">
              <h4>System: Ax = b</h4>
              <div className="result-value">
                <span className="label">Solution x:</span>
              </div>
              <pre className="vector-data">
                [{data.solution.map(v => formatNumber(v)).join(', ')}]
              </pre>
            </div>
            <div className={`result-value ${data.verification_passed ? 'success' : 'error'}`}>
              <span className="label">Verification:</span>
              <span className="value">
                {data.verification_passed ? '✓ Passed' : '✗ Failed'}
              </span>
            </div>
            <div className="result-value">
              <span className="label">Residual:</span>
              <span className="value">{formatNumber(data.residual)}</span>
            </div>
            {data.determinant !== null && (
              <div className="result-value">
                <span className="label">Determinant of A:</span>
                <span className="value">{formatNumber(data.determinant)}</span>
              </div>
            )}
            <div className="result-value">
              <span className="label">Condition Number:</span>
              <span className="value">{formatNumber(data.condition_number)}</span>
            </div>
          </ResultSection>
        </>
      )}

      {/* MATRIX OPERATIONS */}
      {['add', 'subtract', 'multiply', 'transpose', 'scalar_multiply', 'power'].includes(data.operation) && (
        <>
          <ResultSection title="Operation Details" sectionKey="operation_details">
            <div className="result-value">
              <span className="label">Operation:</span>
              <span className="value">{data.operation.toUpperCase()}</span>
            </div>
            <div className="result-value">
              <span className="label">Matrix A Shape:</span>
              <span className="value">{data.matrix_a_shape[0]} × {data.matrix_a_shape[1]}</span>
            </div>
            {data.matrix_b_shape && (
              <div className="result-value">
                <span className="label">Matrix B Shape:</span>
                <span className="value">{data.matrix_b_shape[0]} × {data.matrix_b_shape[1]}</span>
              </div>
            )}
            {data.scalar !== undefined && (
              <div className="result-value">
                <span className="label">Scalar:</span>
                <span className="value">{formatNumber(data.scalar)}</span>
              </div>
            )}
            {data.power !== undefined && (
              <div className="result-value">
                <span className="label">Power:</span>
                <span className="value">{data.power}</span>
              </div>
            )}
            <div className="result-value">
              <span className="label">Result Shape:</span>
              <span className="value">{data.result_shape[0]} × {data.result_shape[1]}</span>
            </div>
          </ResultSection>

          <ResultSection title="Result Matrix" sectionKey="result_matrix">
            <MatrixDisplay matrix={data.result} title="Result" copyable />
          </ResultSection>
        </>
      )}

      {/* RANK */}
      {data.operation === 'rank' && (
        <>
          <ResultSection title="Matrix Rank" sectionKey="rank">
            <div className="result-value">
              <span className="label">Rank:</span>
              <span className="value">{data.rank}</span>
            </div>
            <div className="result-value">
              <span className="label">Matrix Shape:</span>
              <span className="value">{data.matrix_shape[0]} × {data.matrix_shape[1]}</span>
            </div>
            <div className={`result-value ${data.is_full_rank ? 'success' : 'regular'}`}>
              <span className="label">Full Rank:</span>
              <span className="value">{data.is_full_rank ? 'Yes' : 'No'}</span>
            </div>
          </ResultSection>
        </>
      )}
    </div>
  );
}

export default LinearAlgebraResults;
