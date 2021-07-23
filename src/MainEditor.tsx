import React, { useState } from 'react';
//@ts-ignore
import { FormField, PanelOptionsGroup } from '@grafana/ui';
import { PanelEditorProps } from '@grafana/data';
import { MapOptions } from './types';
import { jsFileDownloader } from 'js-client-file-downloader';
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON';
import UploadArea from './components/UploadArea';
import Exists from './img/Exists.svg';
import None from './img/None.svg';

export const MainEditor: React.FC<PanelEditorProps<MapOptions>> = ({ options, onOptionsChange }) => {
  const [inputs, setInputs] = useState(options);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onOptionsChange(inputs);
  };

  const resetDraw = () => {
    onOptionsChange({ ...options, geoJSON: null });
  };

  const onDownload = () => {
    if (options.geoJSON) {
      jsFileDownloader.makeJSON(options.geoJSON, 'polygon');
    }
  };

  const addGeoJSON = (obj: GeoJSONFeatureCollection) => {
    setInputs({ ...inputs, geoJSON: obj });
    onOptionsChange({ ...options, geoJSON: obj });
  };

  return (
    <PanelOptionsGroup>
      <div className="editor-row">
        <div className="section gf-form-group">
          <h5 className="section-heading">Map Settings</h5>
          <FormField
            label="Center Latitude"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="center_lat"
            value={inputs.center_lat}
            onChange={handleChange}
          />
          <FormField
            label="Center Longitude"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="center_lon"
            value={inputs.center_lon}
            onChange={handleChange}
          />
          <FormField
            label="Additional Tile"
            labelWidth={10}
            inputWidth={80}
            type="text"
            name="tile_url"
            value={inputs.tile_url}
            onChange={handleChange}
          />
          <FormField
            label="Initial Zoom"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="zoom_level"
            value={inputs.zoom_level}
            onChange={handleChange}
          />
          <FormField
            label="Max Zoom"
            labelWidth={10}
            inputWidth={40}
            type="number"
            name="max_zoom"
            value={inputs.max_zoom}
            onChange={handleChange}
          />
        </div>
        <div className="section gf-form-group">
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 15 }}>
            <h5 className="section-heading" style={{ marginBottom: 0 }}>
              Polygon
            </h5>
            {options.geoJSON ? <img src={Exists} /> : <img src={None} />}
          </div>
          <section style={{ marginTop: 15 }}>
            <button className="btn btn-inverse" onClick={resetDraw}>
              Clear Feature
            </button>
          </section>
        </div>
        <div className="section gf-form-group">
          <h5 className="section-heading" style={{ marginBottom: 0 }}>
            Polygon
          </h5>

          <section style={{ marginTop: 15 }}>
            <button className="btn btn-inverse" onClick={onDownload}>
              Download JSON
            </button>
          </section>
        </div>
        <div className="section gf-form-group">
          <h5 className="section-heading" style={{ marginBottom: 0 }}>
            Upload GeoJSON
          </h5>
          <section style={{ marginTop: 15 }}>
            <UploadArea addGeoJSON={addGeoJSON} />
          </section>
        </div>
      </div>
      <button className="btn btn-inverse" onClick={handleSubmit}>
        Submit
      </button>
    </PanelOptionsGroup>
  );
};
