Wolfram Language standard library provides for than 200 supported file formats

```mathematica
Export[filename_String, data_]
```

or explicitly set the format

```mathematica
Export[filename_String, data_, format_String, opts___]
```

## List of supported formats

<details>

- 3DS
- AC
- ACO
- AIFF
- ArrowDataset
- ArrowIPC
- ASE
- AU
- AVI
- Base64
- Binary
- Bit
- BLEND
- BMP
- BREP
- BSON
- Byte
- BYU
- BZIP2
- C
- CDF
- CDXML
- Character16
- Character32
- Character8
- CIF
- CML
- Complex128
- Complex256
- Complex64
- CSV
- Cube
- CUR
- DAE
- DICOM
- DIF
- DIMACS
- DOT
- DTA
- DXF
- EPS
- ExpressionJSON
- ExpressionML
- FASTA
- FASTQ
- FBX
- FCS
- FITS
- FLAC
- FLV
- FMU
- GeoJSON
- GIF
- GLTF
- Graph6
- Graphlet
- GraphML
- GXL
- GZIP
- HarwellBoeing
- HDF
- HDF5
- HEIF
- HIN
- HTML
- HTMLFragment
- HTTPRequest
- HTTPResponse
- ICNS
- ICO
- IFC
- IGES
- Ini
- Integer128
- Integer16
- Integer24
- Integer32
- Integer64
- Integer8
- ISO
- JavaProperties
- JavaScriptExpression
- JPEG
- JPEG2000
- JSON
- JSONLD
- JVX
- KML
- LEDA
- List
- LWO
- LXO
- MAT
- MathML
- Matroska
- Maya
- MCTT
- MGF
- MIDI
- MMCIF
- MMJSON
- MO
- MOL
- MOL2
- MP3
- MP4
- MS3D
- MTX
- MX
- MXNet
- NASACDF
- NB
- NetCDF
- NEXUS
- NOFF
- NQuads
- NTriples
- OBJ
- OFF
- Ogg
- ONNX
- OpenEXR
- ORC
- OWLFunctional
- Pajek
- Parquet
- PBM
- PCX
- PDB
- PDF
- PGM
- PHPIni
- PLY
- PNG
- PNM
- POR
- POV
- PPM
- PXR
- PythonExpression
- QuickTime
- RawBitmap
- RawJSON
- RDFXML
- Real128
- Real32
- Real64
- RIB
- RLE
- RTF
- SAS7BDAT
- SAV
- SCT
- SDF
- SMA
- SMILES
- SND
- SPARQLQuery
- SPARQLResultsJSON
- SPARQLResultsXML
- SPARQLUpdate
- Sparse6
- STEP
- STL
- String
- SurferGrid
- SVG
- Table
- TAR
- TerminatedString
- TeX
- TeXFragment
- Text
- TGA
- TGF
- TIFF
- TriG
- TSV
- Turtle
- UBJSON
- UnsignedInteger128
- UnsignedInteger16
- UnsignedInteger24
- UnsignedInteger32
- UnsignedInteger64
- UnsignedInteger8
- USD
- UUE
- VideoFrames
- VRML
- VTK
- WAV
- Wave64
- WDX
- WebP
- WL
- WLNet
- WMLF
- WXF
- X3D
- XBM
- XGL
- XHTML
- XHTMLMathML
- XLS
- XLSX
- XML
- XPORT
- XYZ
- ZIP
- ZPR
- ZSTD

</details>

Most of them will also work for string, i.e.

```mathematica
ExportString[expr_, format_String]
```


### PDF exporter
There is a special format in WLJS system - `"PDF"`, which uses Chromium engine to render __any valid expression__ even if it includes HTML elements, WebGL canvas or Javascript. 

:::warning
This requires WLJS Notebook desktop app. It will not work with Docker installation
:::

For example

```mathematica
Export["filename.pdf", Plot[x, {x,0,1}]]
```

#### Options
You can provide extra options

```mathematica
Export[filename_String, data_, "PDF", opts___]
```

#### `"Crop"`
Trims the whitespace. By the default is `True`

#### `"ImageUpscaling"`
By the default is `1`

#### `"ExposureTime"`
The waiting time in seconds for all possible scripts to finish before capturing the expression displayed. By the default is `1`.