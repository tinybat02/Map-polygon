import React, { useState, useRef } from 'react';
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON';

export interface Props {
  addGeoJSON: (obj: GeoJSONFeatureCollection) => void;
}

const UploadArea: React.FC<Props> = ({ addGeoJSON }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropFile, setDropFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setDropFile(e.target.files[0]);
  };

  const parseGeoJSON = () => {
    if (!dropFile) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const obj = JSON.parse(reader.result as string);

      addGeoJSON(obj);
    };

    reader.readAsText(dropFile);
  };

  return (
    <>
      <div className="upload-row">
        <input
          ref={inputRef}
          onChange={handleFileUpload}
          type="file"
          style={{ display: 'none' }}
          // multiple={false}
        />
        <button className="btn btn-inverse" onClick={() => inputRef.current?.click()}>
          Upload File
        </button>
      </div>

      {dropFile && (
        <div className="list-row">
          <div style={{ padding: 5 }}>{dropFile.name}</div>

          <button className="btn-none" onClick={parseGeoJSON}>
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default UploadArea;
