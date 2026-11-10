export default function ProductVariantSelector({ product, color, size, onColorChange, onSizeChange, sizeError }) {
  return (
    <div className="variants">
      {product.colors.length > 0 && (
        <fieldset className="variants__group">
          <legend className="variants__label">Color — <span>{color}</span></legend>
          <div className="variants__swatches">
            {product.colors.map((option) => (
              <button
                key={option.name}
                type="button"
                className={`swatch ${color === option.name ? 'swatch--active' : ''}`}
                style={{ '--swatch-color': option.hex }}
                onClick={() => onColorChange(option.name)}
                aria-label={`Select color ${option.name}`}
                aria-pressed={color === option.name}
                title={option.name}
              />
            ))}
          </div>
        </fieldset>
      )}
      {product.sizes.length > 0 && (
        <fieldset className={`variants__group ${sizeError ? 'variants__group--error' : ''}`}>
          <legend className="variants__label">Size {size && <span>— {size}</span>}</legend>
          <div className="variants__sizes">
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                className={`size-option ${size === option ? 'size-option--active' : ''}`}
                onClick={() => onSizeChange(option)}
                aria-pressed={size === option}
              >
                {option}
              </button>
            ))}
          </div>
          {sizeError && <p className="variants__error" role="alert">{sizeError}</p>}
        </fieldset>
      )}
    </div>
  );
}