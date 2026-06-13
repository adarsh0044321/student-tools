import React, { useState } from 'react';

type UnitCategory = 'length' | 'weight' | 'data' | 'temp';

export const UnitConverter: React.FC = () => {
  const [category, setCategory] = useState<UnitCategory>('length');
  const [value, setValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');

  const getUnits = (cat: UnitCategory) => {
    switch (cat) {
      case 'length':
        return [
          { name: 'Meters (m)', value: 'm' },
          { name: 'Kilometers (km)', value: 'km' },
          { name: 'Centimeters (cm)', value: 'cm' },
          { name: 'Inches (in)', value: 'in' },
          { name: 'Feet (ft)', value: 'ft' }
        ];
      case 'weight':
        return [
          { name: 'Kilograms (kg)', value: 'kg' },
          { name: 'Grams (g)', value: 'g' },
          { name: 'Pounds (lb)', value: 'lb' },
          { name: 'Ounces (oz)', value: 'oz' }
        ];
      case 'data':
        return [
          { name: 'Bytes (B)', value: 'b' },
          { name: 'Kilobytes (KB)', value: 'kb' },
          { name: 'Megabytes (MB)', value: 'mb' },
          { name: 'Gigabytes (GB)', value: 'gb' }
        ];
      case 'temp':
        return [
          { name: 'Celsius (°C)', value: 'c' },
          { name: 'Fahrenheit (°F)', value: 'f' },
          { name: 'Kelvin (K)', value: 'k' }
        ];
    }
  };

  const handleCategoryChange = (cat: UnitCategory) => {
    setCategory(cat);
    const units = getUnits(cat);
    setFromUnit(units[0].value);
    setToUnit(units[1].value);
  };

  const convert = () => {
    if (category === 'temp') {
      let tempInC = value;
      if (fromUnit === 'f') tempInC = (value - 32) * 5/9;
      if (fromUnit === 'k') tempInC = value - 273.15;

      let result = tempInC;
      if (toUnit === 'f') result = (tempInC * 9/5) + 32;
      if (toUnit === 'k') result = tempInC + 273.15;
      return result;
    }

    // Convert length (base: meter)
    if (category === 'length') {
      const lengthInMeter: Record<string, number> = {
        m: 1,
        km: 1000,
        cm: 0.01,
        in: 0.0254,
        ft: 0.3048
      };
      const valInMeters = value * lengthInMeter[fromUnit];
      return valInMeters / lengthInMeter[toUnit];
    }

    // Convert weight (base: kg)
    if (category === 'weight') {
      const weightInKg: Record<string, number> = {
        kg: 1,
        g: 0.001,
        lb: 0.453592,
        oz: 0.0283495
      };
      const valInKg = value * weightInKg[fromUnit];
      return valInKg / weightInKg[toUnit];
    }

    // Convert data (base: byte)
    if (category === 'data') {
      const dataInByte: Record<string, number> = {
        b: 1,
        kb: 1024,
        mb: 1024 * 1024,
        gb: 1024 * 1024 * 1024
      };
      const valInBytes = value * dataInByte[fromUnit];
      return valInBytes / dataInByte[toUnit];
    }

    return value;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
      {/* Category selector */}
      <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--light-bg)', padding: '0.3rem', borderRadius: '8px' }}>
        {(['length', 'weight', 'data', 'temp'] as UnitCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            style={{
              flex: 1,
              padding: '0.5rem 0.25rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: category === cat ? 'var(--white)' : 'transparent',
              color: category === cat ? '#e52d27' : 'var(--text-muted)',
              textTransform: 'uppercase'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Input value */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>Enter Value</label>
        <input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)} 
          className="option-input"
        />
      </div>

      {/* Select selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>From</label>
          <select 
            value={fromUnit} 
            onChange={(e) => setFromUnit(e.target.value)} 
            className="option-input"
          >
            {getUnits(category).map(u => (
              <option key={u.value} value={u.value}>{u.name}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: 700 }}>To</label>
          <select 
            value={toUnit} 
            onChange={(e) => setToUnit(e.target.value)} 
            className="option-input"
          >
            {getUnits(category).map(u => (
              <option key={u.value} value={u.value}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result Display */}
      <div style={{
        marginTop: '1.25rem',
        padding: '1.5rem',
        borderRadius: '12px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--light-bg)',
        textAlign: 'center'
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)' }}>Converted Value</span>
        <h3 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#e52d27', margin: '0.5rem 0' }}>
          {convert().toLocaleString(undefined, { maximumFractionDigits: 5 })}
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {value} {fromUnit.toUpperCase()} = {convert().toFixed(4)} {toUnit.toUpperCase()}
        </p>
      </div>
    </div>
  );
};
